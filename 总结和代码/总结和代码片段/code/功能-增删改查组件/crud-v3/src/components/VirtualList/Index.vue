<script setup lang="ts">
export interface Props {
  list: any[]
  estimatedSize: number
  height?: string
  bufferScale?: number
}
export interface IListItem {
  index: number
  item: any
}
const props = withDefaults(defineProps<Props>(), {
  height: '100%',
  bufferScale: 1,
})

// computed status
const allList = computed<IListItem[]>(() => props.list.map((item, index) => ({ index, item })))
const visibleCount = computed<number>(() => Math.ceil(viewareaHeight.value / props.estimatedSize))
const aboveCount = computed<number>(() =>
  Math.min(startIndex.value, visibleCount.value * props.bufferScale)
)
const belowCount = computed<number>(() =>
  Math.min(allList.value.length - endIndex.value, visibleCount.value * props.bufferScale)
)
// 实际渲染的列表
const renderList = computed<IListItem[]>(() => {
  const start = startIndex.value - aboveCount.value
  const end = endIndex.value + belowCount.value
  return allList.value.slice(start, end)
})

// ref
const scrollContainer = ref<HTMLElement | null>(null) // 滚动容器，用于获取可视区域高度
const base = ref<HTMLElement | null>(null) // 滚动基座
const content = ref<HTMLElement | null>(null) // 内容容器
const itemRefs = ref<HTMLElement[]>([])

// status
const viewareaHeight = ref<number>(0) // 可视区域高度
const startIndex = ref<number>(0) // 可视区域起始索引————准
const endIndex = ref<number>(0) // 可视区域结束索引————不准
let positions: Array<{
  readonly index: number
  top: number
  bottom: number
  height: number
}> = []

onMounted(() => {
  initPositions()
  viewareaHeight.value = (scrollContainer.value as HTMLElement).clientHeight
  startIndex.value = 0
  endIndex.value = startIndex.value + visibleCount.value
})
watch(
  () => props.list,
  () => {
    initPositions()
    if (scrollContainer.value) scrollContainer.value.scrollTop = 0
    startIndex.value = 0
    endIndex.value = startIndex.value + visibleCount.value
  }
)
onUpdated(() => {
  nextTick(() => {
    if (!itemRefs.value.length) return
    updatePositions()
    updateBaseHeight()
    updateTransPosition()
  })
})
/**
 * 更新缓存的高度，位置信息
 */
function updatePositions(): void {
  const els = itemRefs.value
  els.forEach((el: HTMLElement) => {
    const index = parseInt(el.dataset.index as string)
    const dataInPositions = positions[index]
    const oldHeight = dataInPositions.height
    const height = el.offsetHeight
    const deltaHeight = height - oldHeight
    if (deltaHeight) {
      dataInPositions.height = height
      dataInPositions.bottom += deltaHeight
      for (let i = index + 1; i < positions.length; i++) {
        positions[i].top = positions[i - 1].bottom
        positions[i].bottom += deltaHeight
      }
    }
  })
}
/**
 * 更新滚动内容底座的高度
 */
function updateBaseHeight(): void {
  const lastPositionItem = positions[positions.length - 1]
  const baseEl = base.value
  if (baseEl) baseEl.style.height = lastPositionItem.bottom + 'px'
}
/**
 * 更新实际渲染内容的偏移量
 */
function updateTransPosition(): void {
  const topIndex = startIndex.value - aboveCount.value
  const firstTop = positions[topIndex]?.top || 0
  const contentEl = content.value
  if (contentEl) contentEl.style.transform = `translateY(${firstTop}px)`
}
/**
 * 根据估计的item尺寸初始化每一项的高度和位置信息
 */
function initPositions(): void {
  positions = []
  allList.value.forEach((item) => {
    positions.push({
      index: item.index,
      top: item.index * props.estimatedSize,
      bottom: (item.index + 1) * props.estimatedSize,
      height: props.estimatedSize,
    })
  })
}
/**
 * 二分法查找,寻找比目标值大的最小值
 */
function binarySearch(list: any[], value: number): number {
  let left: number = 0
  let right: number = list.length
  while (left < right) {
    const midIndex: number = (left + right) >> 1
    const midVlaue: number = list[midIndex].bottom
    if (midVlaue <= value) {
      left = midIndex + 1
    } else {
      right = midIndex
    }
  }
  return left
}
/**
 * 滚动事件
 */
function scrollHandler(event: Event): void {
  const scrollTop = (event.target as HTMLElement)?.scrollTop
  // 更新startIndex
  startIndex.value = binarySearch(positions, scrollTop)
  // 更新endIndex
  endIndex.value = startIndex.value + visibleCount.value
}
</script>

<template>
  <div class="virtualized-list" :style="{ height }" ref="scrollContainer" @scroll="scrollHandler">
    <div class="virtualized-base" ref="base"></div>
    <div class="virtualized-content" ref="content">
      <div
        class="virtualized-item"
        v-for="item in renderList"
        :key="item.index"
        ref="itemRefs"
        :data-index="item.index"
      >
        <slot name="item" :item="item.item"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.virtualized-list {
  overflow: auto;
  position: relative;
  .virtualized-base {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .virtualized-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    will-change: transform;
    .virtualized-item {
      border-bottom: 1px solid #999;
    }
  }
}
</style>
