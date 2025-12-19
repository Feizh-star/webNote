<template>
  <div ref="screenShotRef" class="screen-shot" @mousemove="mousemove" @mouseup="resetMouseEvent">
    <el-button type="primary" icon="el-icon-crop" circle @click="startShot" />
    <div v-show="shot" ref="maskRef" class="mask" />
    <div v-show="shot" ref="windowRef" class="window" @mousedown.prevent="mousedown">
      <!-- 添加prevent修饰符以解决偶尔出现的鼠标变成禁止拖拽图标的bug -->
      <div
        v-for="(item, index) in new Array(8)"
        class="circle"
        :key="index"
        @mousedown.prevent="mousedown($event, true, index)"
      />
      <Toolbar
        ref="toolbarRef"
        :position="toolbarPosition"
        :windowRef="$refs.windowRef"
        @mousedown.stop
        @changeShot="shot = $event"
      />
    </div>
  </div>
</template>

<script>
import Toolbar from './Toolbar/index.vue'

export default {
  name: 'ScreenShot',
  components: {
    Toolbar,
  },
  props: {
    // 按钮绝对定位位置
    position: {
      type: Object,
      default: () => ({
        top: '100px',
        right: '100px',
      }),
    },
    // 按钮的z-index（注意：如果超过2000，需要在引入此组件的页面的根元素上添加position: relative; z-index: 0;样式，否则按钮的高度将超过某些全局组件）
    buttonZIndex: {
      type: Number,
      default: 2000,
    },
    // 遮罩层的z-index
    maskZIndex: {
      type: Number,
      default: 999,
    },
    // 初始视窗width
    windowWidth: {
      type: Number,
      default: 600,
    },
    // 初始视窗height
    windowHeight: {
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      shot: false, // 截图中
      mousePosition: '', // 鼠标位置
      mouseCircle: false, // 鼠标在圆圈上按下
      mouseCircleIndex: -1, // 圆圈的index，左上角是0，瞬时针递增
      toolbarPosition: '', // 工具栏位置
    }
  },
  mounted() {
    this.setPotionAndIndex()
  },
  methods: {
    // 设置按钮的定位、按钮的层级、遮罩层的层级、视窗的层级
    setPotionAndIndex() {
      if (this.$refs.screenShotRef) {
        Object.keys(this.position).forEach((key) => {
          this.$refs.screenShotRef.style[key] = this.position[key]
        })
        this.$refs.screenShotRef.style.zIndex = this.buttonZIndex
      }
      if (this.$refs.maskRef) {
        this.$refs.maskRef.style.zIndex = this.maskZIndex
      }
      if (this.$refs.windowRef) {
        this.$refs.windowRef.style.zIndex = this.maskZIndex + 1
      }
    },
    // 开启截图
    startShot() {
      this.shot = true
      this.initWindow()
      this.setMaskBorderWidth()
      if (this.$refs.toolbarRef) {
        document.documentElement.addEventListener('keyup', this.$refs.toolbarRef.escListener)
        this.$refs.toolbarRef.tooltipDisabled = false
      }
    },
    // 初始化视窗初始位置、工具栏位置
    initWindow() {
      this.$nextTick(() => {
        if (this.$refs.windowRef) {
          const viewWidth = document.documentElement.offsetWidth
          const viewHeight = document.documentElement.offsetHeight
          this.$refs.windowRef.style.width =
            viewWidth > this.windowWidth + 200 ? this.windowWidth + 'px' : viewWidth / 2 + 'px'
          this.$refs.windowRef.style.height =
            viewHeight > this.windowHeight + 200 ? this.windowHeight + 'px' : viewHeight / 2 + 'px'
          this.$refs.windowRef.style.top =
            (viewHeight - this.$refs.windowRef.offsetHeight) / 2 + 'px'
          this.$refs.windowRef.style.left =
            (viewWidth - this.$refs.windowRef.offsetWidth) / 2 + 'px'
        }
        this.toolbarPosition = ''
      })
    },
    // 根据视窗的位置改变遮罩层的边框宽度
    setMaskBorderWidth() {
      this.$nextTick(() => {
        const windowRect = this.$refs?.windowRef.getBoundingClientRect()
        this.$refs.maskRef &&
          (this.$refs.maskRef.style.borderWidth = `${windowRect.top}px calc(100vw - ${windowRect.right}px) calc(100vh - ${windowRect.bottom}px) ${windowRect.left}px`)
      })
    },
    // 鼠标按下
    mousedown(event, mouseCircle, mouseCircleIndex) {
      this.mousePosition = {
        x: event.clientX,
        y: event.clientY,
      }
      mouseCircle !== undefined && (this.mouseCircle = mouseCircle)
      mouseCircleIndex !== undefined && (this.mouseCircleIndex = mouseCircleIndex)
    },
    // 鼠标移动
    mousemove(event) {
      if (this.mousePosition) {
        if (this.mouseCircle && this.mouseCircleIndex > -1) {
          this.resizeWindow(event)
        } else {
          this.moveWindow(event)
        }
      }
    },
    // 调整视窗尺寸
    resizeWindow(event) {
      const { x, y, increaseWidth, increaseHeight, reduceWidth, reduceHeight } =
        this.getDirectionAndSize(event)
      switch (this.mouseCircleIndex) {
        case 0:
          this.changeWindow(x, y, reduceWidth, reduceHeight)
          break
        case 1:
          this.changeWindow(undefined, y, undefined, reduceHeight)
          break
        case 2:
          this.changeWindow(undefined, y, increaseWidth, reduceHeight)
          break
        case 3:
          this.changeWindow(undefined, undefined, increaseWidth)
          break
        case 4:
          this.changeWindow(undefined, undefined, increaseWidth, increaseHeight)
          break
        case 5:
          this.changeWindow(undefined, undefined, undefined, increaseHeight)
          break
        case 6:
          this.changeWindow(x, undefined, reduceWidth, increaseHeight)
          break
        case 7:
          this.changeWindow(x, undefined, reduceWidth)
          break
        default:
          break
      }
    },
    // 移动视窗
    moveWindow(event) {
      const { x, y } = this.getDirectionAndSize(event)
      this.changeWindow(x, y)
    },
    // 获取位移数据和尺寸数据
    getDirectionAndSize(event) {
      const currentMousePosition = {
        x: event.clientX,
        y: event.clientY,
      }
      let x =
        currentMousePosition.x -
        this.mousePosition.x +
        Number.parseInt(this.$refs.windowRef.style.left)
      x < 0 && (x = 0)
      if (x + this.$refs.windowRef.offsetWidth > document.documentElement.offsetWidth) {
        x = document.documentElement.offsetWidth - this.$refs.windowRef.offsetWidth
      }
      let y =
        currentMousePosition.y -
        this.mousePosition.y +
        Number.parseInt(this.$refs.windowRef.style.top)
      y < 0 && (y = 0)
      if (y + this.$refs.windowRef.offsetHeight > document.documentElement.offsetHeight) {
        y = document.documentElement.offsetHeight - this.$refs.windowRef.offsetHeight
      }
      let increaseWidth =
        currentMousePosition.x - this.mousePosition.x + this.$refs.windowRef.clientWidth
      increaseWidth < 0 && (increaseWidth = 0)
      let increaseHeight =
        currentMousePosition.y - this.mousePosition.y + this.$refs.windowRef.clientHeight
      increaseHeight < 0 && (increaseHeight = 0)
      let reduceWidth =
        this.mousePosition.x - currentMousePosition.x + this.$refs.windowRef.clientWidth
      reduceWidth < 0 && (reduceWidth = 0)
      let reduceHeight =
        this.mousePosition.y - currentMousePosition.y + this.$refs.windowRef.clientHeight
      reduceHeight < 0 && (reduceHeight = 0)
      this.mousePosition = currentMousePosition
      return {
        x,
        y,
        increaseWidth,
        increaseHeight,
        reduceWidth,
        reduceHeight,
      }
    },
    // 改变window的位移、尺寸
    changeWindow(x, y, width, height) {
      if (this.$refs.windowRef) {
        x !== undefined && (this.$refs.windowRef.style.left = x + 'px')
        y !== undefined && (this.$refs.windowRef.style.top = y + 'px')
        width !== undefined && (this.$refs.windowRef.style.width = width + 'px')
        height !== undefined && (this.$refs.windowRef.style.height = height + 'px')
      }
      this.setMaskBorderWidth()
      this.setToolbarPosition()
    },
    // 设置工具栏位置
    setToolbarPosition() {
      this.$nextTick(() => {
        const toolbarHeight = this.$refs.toolbarRef?.$el.offsetHeight || 0
        const { top = 0, bottom = 0 } = this.$refs.windowRef?.getBoundingClientRect() || ''
        const yBottom = document.documentElement.offsetHeight - bottom - toolbarHeight - 10
        const yTop = top - toolbarHeight - 10
        if (yBottom <= 0 && yTop <= 0) {
          this.toolbarPosition = 'inside'
        } else if (yBottom <= 0) {
          this.toolbarPosition = 'top'
        } else {
          this.toolbarPosition = ''
        }
      })
    },
    // 重置鼠标事件
    resetMouseEvent() {
      this.mousePosition = ''
      this.mouseCircle = false
      this.mouseCircleIndex = -1
    },
  },
}
</script>

<style lang="less" scoped>
.screen-shot {
  position: absolute;
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.2);
  }
  .window {
    position: fixed;
    cursor: move;
    > .circle {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #409eff;
      border-radius: 50%;
      border: 1px solid #fff;
    }
    > .circle:nth-child(1) {
      left: 0;
      top: 0;
      transform: translate(-50%, -50%);
      cursor: nwse-resize;
    }
    > .circle:nth-child(2) {
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%);
      cursor: ns-resize;
    }
    > .circle:nth-child(3) {
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
      cursor: nesw-resize;
    }
    > .circle:nth-child(4) {
      right: 0;
      top: 50%;
      transform: translate(50%, -50%);
      cursor: ew-resize;
    }
    > .circle:nth-child(5) {
      right: 0;
      bottom: 0;
      transform: translate(50%, 50%);
      cursor: nwse-resize;
    }
    > .circle:nth-child(6) {
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50%);
      cursor: ns-resize;
    }
    > .circle:nth-child(7) {
      left: 0;
      bottom: 0;
      transform: translate(-50%, 50%);
      cursor: nesw-resize;
    }
    > .circle:nth-child(8) {
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: ew-resize;
    }
  }
}
</style>
