<script setup lang="ts">
import VirtualList from '@/components/VirtualList/Index.vue'
import { useElDialogDraggable } from '@/directives/draggable/el-dialog-drag'
// @ts-ignore
import vDraggable from '@/directives/draggable/draggable'
// @ts-ignore
import vGetSize from '@/directives/getSize/get-size'

const length = ref(1000)
const list = ref<any[]>([])
const vList = ref(false)
watch(
  length,
  (newVal) => {
    const newList = []
    while (newList.length < newVal) {
      newList.push({
        id: newList.length,
        height: Math.floor(Math.random() * 71 + 30),
      })
    }
    list.value = newList
  },
  { immediate: true }
)

// v-draggable="{ target: '.el-dialog', drag: '.el-dialog__header', draggable: true }"
const dialogVisible = ref(false)
const testMenu = ref()
const draggable = ref(true)
useElDialogDraggable({
  dialogVisible,
  elRef: testMenu,
  draggable,
})

const boxVisible = ref(false)
const boxDraggable = ref(true)

// 测试获取宽高指令
const sizeReactive = reactive({
  boxSize: {
    width: 0,
    height: 0,
  },
})
const boxHalfWidth = computed(() => sizeReactive.boxSize.width / 2 + 'px')
const boxHalfHeight = computed(() => sizeReactive.boxSize.height / 2 + 'px')
</script>

<template>
  <div class="test-menu" ref="testMenu">
    <header class="form-btn">
      <el-input-number v-model="length" :min="1" :max="1000000" label="长度"></el-input-number>
      &emsp;
      <el-switch v-model="vList"></el-switch>
      &emsp;
      <el-button @click="dialogVisible = true">弹出</el-button>
      <el-button @click="boxVisible = true">弹出box</el-button>
    </header>
    <section class="virtual-main" v-if="vList">
      <VirtualList :list="list" :estimatedSize="30">
        <template #item="{ item }">
          <div class="virtual-listitem" :style="{ 'line-height': item.height + 'px' }">
            {{ item.id }}: {{ item.height }}px
          </div>
        </template>
      </VirtualList>
    </section>
    <section class="virtual-main" v-else>
      <div
        class="virtual-listitem"
        :style="{ 'line-height': item.height + 'px' }"
        v-for="item in list"
        :key="item.id"
      >
        {{ item.id }}: {{ item.height }}px
      </div>
    </section>
    <el-dialog title="提示" v-model="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <el-switch v-model="draggable"></el-switch>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <div
      class="dialog-target"
      v-show="boxVisible"
      v-draggable="{
        target: '.dialog-target',
        drag: '.dialog-header',
        draggable: boxDraggable,
        visible: boxVisible,
        closeBack: true,
      }"
      v-get-size="{
        sizeReactive: sizeReactive,
        key: 'boxSize',
      }"
    >
      <div class="dialog-header">
        <span>标题</span>
        <span @click="boxVisible = false" style="cursor: pointer">x</span>
      </div>
      <div class="dialog-body">
        <span>这是一段新的信息</span>
        <el-switch v-model="boxDraggable"></el-switch>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.test-menu {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .virtual-main {
    flex: 1;
    min-height: 0;
    overflow: auto;
    .virtual-listitem {
      // height: 40px;
      text-align: center;
    }
    > .virtual-listitem {
      border-bottom: 1px solid #999999;
    }
  }
}
.dialog-target {
  width: 40%;
  height: 300px;
  position: fixed;
  top: calc(50% - v-bind(boxHalfHeight));
  left: calc(50% - v-bind(boxHalfWidth));
  background-color: #fff;
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
  .dialog-header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
}
</style>
