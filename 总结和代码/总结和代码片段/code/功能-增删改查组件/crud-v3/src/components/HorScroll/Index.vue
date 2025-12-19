<script lang="ts">
const EaseInOutQuad = function (t: number, b: number, c: number, d: number) {
  t /= d / 2
  if (t < 1) {
    return (c / 2) * t * t + b
  }
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

const requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    // @ts-ignore
    window.webkitRequestAnimationFrame ||
    // @ts-ignore
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

function move(el: HTMLElement, key: string, amount: number) {
  el.style.transform = `${key}(${-amount}px)`
}

function position(el: HTMLElement, key: string) {
  const transform = el.style.transform
  const reg = new RegExp(`(?<=${key}\\()-?\\d+(?=(px)?\\))`)
  const disMatch = transform.match(reg)
  const dis = (disMatch && parseFloat(disMatch[0])) || 0
  return dis
}

function scrollTo({
  el,
  to,
  duration,
  scrollKey,
  callback,
}: {
  el: HTMLElement
  to: number
  duration: number
  scrollKey: string
  callback: (to: number) => void
}) {
  if (!el) return null
  to = to || 0
  scrollKey = scrollKey || 'translateX'
  duration = typeof duration === 'undefined' ? 500 : duration
  const start = -position(el, scrollKey)
  const change = to - start
  const increment = 20
  let currentTime = 0
  const animateScroll = function () {
    currentTime += increment
    if (currentTime < duration) {
      let val: number = EaseInOutQuad(currentTime, start, change, duration)
      // debugger
      move(el, scrollKey, val)
      requestAnimFrame(animateScroll)
    } else {
      move(el, scrollKey, to)
      if (callback && typeof callback === 'function') {
        callback(to)
      }
    }
  }
  animateScroll()
}
function debounce(fn: (...arg: any[]) => void, delay: number) {
  let timer: any = null
  return function (this: unknown, ...args: any[]) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.call(this, ...args)
    }, delay)
  }
}
</script>

<script setup lang="ts">
export interface Props {
  width?: string
  height?: string
  duration?: number
  interval?: number
  itemSelector?: string
  align?: string
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '32px',
  duration: 200,
  interval: 300,
  itemSelector: '.scroll-items > .scroll-item',
  align: 'left',
})
const emits = defineEmits<{
  (e: 'arrived-edge', direction: 0 | 1): void
}>()

const actived = ref(false)
const isMoving = ref(false)
const thisData = shallowReactive<{
  itemWidths: number[]
  scrollIndex: number
  times?: number
  readyToScroll: boolean
  timer?: number
}>({
  itemWidths: [],
  scrollIndex: 0,
  times: undefined,
  readyToScroll: false,
  timer: undefined,
})

// 初始化和resize
let resizeHandler = debounce(init, 150)
function init() {
  actived.value = isScroll()
  getScrollWidthArr()
}
onMounted(() => {
  init()
  window.addEventListener('resize', resizeHandler)
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
})

const scroll = ref()
function isScroll() {
  const scrollDiv = scroll.value
  if (!scrollDiv?.scrollWidth) return false
  const scrollWidth = scrollDiv.scrollWidth
  const clientWidth = scrollDiv.clientWidth
  return scrollWidth > clientWidth
}
function getScrollWidthArr() {
  const scrollDiv = scroll.value
  if (!scrollDiv?.scrollWidth) return null
  const list = scrollDiv.querySelectorAll(props.itemSelector)
  const itemWidths = Array.prototype.map.call(list, (item) => item.offsetWidth) as number[]
  thisData.itemWidths = [0]
  for (let i = 1; i < itemWidths.length; i++) {
    let lastWidth = thisData.itemWidths[i - 1]
    thisData.itemWidths.push(lastWidth + itemWidths[i - 1])
  }
  if (actived.value) {
    thisData.scrollIndex = 0
  }
  if (scrollItems.value) {
    scrollItems.value.style.transform = 'translateX(0)'
  }
}
function clickHandler(type: 0 | 1) {
  // this.scrollHandler(type)
}

const scrollItems = ref()
/**
 * 处理滚动，左0，右1
 */
function scrollHandler(type: 0 | 1) {
  const scrollDiv = scroll.value
  const scrollItemsDiv = scrollItems.value
  if (!scrollDiv?.scrollWidth || isMoving.value) return null
  const currentScrollLeft = -position(scrollItemsDiv, 'translateX')
  const maxScrollDis = scrollItemsDiv.offsetWidth - scrollDiv.clientWidth
  if (type) {
    if (currentScrollLeft >= 0 && currentScrollLeft < maxScrollDis) {
      thisData.scrollIndex++
      const nextScrollLeft = thisData.itemWidths[thisData.scrollIndex]
      isMoving.value = true
      scrollTo({
        el: scrollItemsDiv,
        to: nextScrollLeft <= maxScrollDis ? nextScrollLeft : maxScrollDis,
        duration: props.duration,
        scrollKey: 'translateX',
        callback: (scrollLeft) => {
          isMoving.value = false
          if (Math.abs(scrollLeft - maxScrollDis) < 1) {
            emits('arrived-edge', 1)
          }
        },
      })
    }
  } else {
    if (currentScrollLeft > 0 && currentScrollLeft <= maxScrollDis) {
      thisData.scrollIndex--
      isMoving.value = true
      scrollTo({
        el: scrollItemsDiv,
        to: thisData.itemWidths[thisData.scrollIndex],
        duration: props.duration,
        scrollKey: 'translateX',
        callback: (scrollLeft) => {
          isMoving.value = false
          if (Math.abs(scrollLeft - 0) < 1) {
            emits('arrived-edge', 0)
          }
        },
      })
    }
  }
}
/**
 * 长按
 */
function longPress(type: 0 | 1, mouseType: 'up' | 'down') {
  if (mouseType === 'down') {
    thisData.readyToScroll = true
    setTimeout(() => {
      if (!thisData.readyToScroll) {
        scrollHandler(type)
        thisData.times = -1
        return null
      }
      clearInterval(thisData.timer)
      thisData.times = 0
      thisData.timer = setInterval(() => {
        ;(thisData.times as number)++
        scrollHandler(type)
      }, props.interval) as any as number
    }, 180)
  }
  if (mouseType === 'up') {
    thisData.readyToScroll = false
    clearInterval(thisData.timer)
    if (thisData.times === 0) scrollHandler(type)
  }
}
</script>

<template>
  <div class="horizontal-scroll-bar" :style="{ width: width, height: height }">
    <button
      class="btn"
      v-show="actived"
      :style="{ height: height }"
      @click="clickHandler(0)"
      @mousedown="longPress(0, 'down')"
      @mouseup="longPress(0, 'up')"
    >
      <slot name="larrow">
        <span style="color: #ffffff">&lt;</span>
      </slot>
    </button>
    <div
      class="legend-row"
      :class="{ 'is-scroll': actived }"
      ref="scroll"
      :style="{ height: height, 'line-height': height, 'justify-content': align }"
    >
      <div class="scroll-items" ref="scrollItems">
        <slot></slot>
      </div>
    </div>
    <button
      class="btn"
      v-show="actived"
      :style="{ height: height }"
      @click="clickHandler(1)"
      @mousedown="longPress(1, 'down')"
      @mouseup="longPress(1, 'up')"
    >
      <slot name="rarrow">
        <span style="color: #ffffff">&gt;</span>
      </slot>
    </button>
  </div>
</template>

<style lang="less" scoped>
.horizontal-scroll-bar {
  @btn-width: 40px;
  overflow: hidden;
  .btn {
    width: @btn-width;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    color: #333333;
    vertical-align: top;
    cursor: pointer;
    font-size: 18px;
    &:nth-child(1) {
      float: left;
    }
    &:nth-child(2) {
      float: right;
    }
  }
  .legend-row {
    width: 100%;
    float: left;
    display: flex;
    justify-content: left;
    overflow: hidden;
    // overflow-x: scroll;
    // margin-bottom: -17px;
    &.is-scroll {
      width: calc(100% - @btn-width * 2);
    }
    .scroll-items {
      display: flex;
      flex-wrap: nowrap;
      :deep(.scroll-item) {
        white-space: nowrap;
      }
    }
  }
}
</style>
