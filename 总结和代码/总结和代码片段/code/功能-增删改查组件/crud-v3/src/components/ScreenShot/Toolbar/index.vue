<template>
  <div class="toolbar" :class="[position]">
    <el-tooltip
      v-for="(item, index) in options"
      :key="index"
      :content="item.tooltip"
      placement="top"
      :disabled="tooltipDisabled"
    >
      <el-button
        :type="item.type"
        :icon="item.icon"
        circle
        size="small"
        @click="endShot(item.operate)"
      ></el-button>
    </el-tooltip>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'
import dayjs from 'dayjs'
import { ElLoading, ElMessage } from 'element-plus'

// 解决截图失败问题，原文地址http://zhihu.geoscene.cn/article/4141
HTMLCanvasElement.prototype.getContext = (function (origFn) {
  return function (type, attributes) {
    if (type === 'webgl') {
      attributes = Object.assign({}, attributes, {
        preserveDrawingBuffer: true,
      })
    }
    return origFn.call(this, type, attributes)
  }
})(HTMLCanvasElement.prototype.getContext)

export default {
  name: 'Toolbar',
  props: {
    // 工具栏位置
    position: {
      type: String,
      default: '',
    },
    // window引用
    windowRef: {
      type: HTMLDivElement,
    },
  },
  data() {
    return {
      options: [
        {
          type: 'warning',
          icon: 'el-icon-close',
          operate: '',
          tooltip: '退出截屏',
        },
        {
          type: 'primary',
          icon: 'el-icon-download',
          operate: 'save',
          tooltip: '保存到文件',
        },
        {
          type: 'success',
          icon: 'el-icon-document-copy',
          operate: 'copy',
          tooltip: '复制到剪切板',
        },
      ],
      tooltipDisabled: false,
    }
  },
  methods: {
    // 按esc退出截屏
    escListener(event) {
      if (event.keyCode === 27) {
        this.endShot()
      }
    },
    // 结束截屏
    endShot(operate) {
      document.documentElement.removeEventListener('keyup', this.escListener)
      this.tooltipDisabled = true
      const { x = 0, y = 0, width = 0, height = 0 } = this.windowRef?.getBoundingClientRect() || ''
      this.$emit('changeShot', false)
      if (operate) {
        const loading = ElLoading.service({
          text: '截屏中，请勿离开窗口……',
        })
        this.$nextTick(async () => {
          try {
            const blob = await this.getBlob(x, y, width, height)
            if (operate === 'copy') {
              await window.navigator.clipboard.write([
                new window.ClipboardItem({
                  [blob.type]: blob,
                }),
              ])
              ElMessage({
                message: '复制到剪切板成功！',
                type: 'success',
              })
            } else if (operate === 'save') {
              saveAs(blob, `screenshot_${dayjs().format('YYYY-MM-DD')}.png`)
              ElMessage({
                message: '保存到文件成功！',
                type: 'success',
              })
            }
          } catch (error) {
            console.error(error)
            ElMessage({
              message:
                error.message === 'Document is not focused.'
                  ? '截屏时，请勿离开窗口！'
                  : '操作失败！',
              type: 'warning',
            })
          } finally {
            loading.close()
          }
        })
      }
    },
    // 获取截图blob数据
    getBlob(x, y, width, height) {
      return new Promise((resolve, reject) => {
        html2canvas(document.body)
          .then((canvas) => {
            const ctx = canvas.getContext('2d')
            const canvasData = ctx.getImageData(x, y, width, height)
            canvas.width = width
            canvas.height = height
            ctx.putImageData(canvasData, 0, 0)
            canvas.toBlob((blob) => {
              resolve(blob)
            })
          })
          .catch((error) => {
            console.error(error)
            reject()
          })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.toolbar {
  background-color: #fff;
  border-radius: 4px;
  padding: 4px;
  position: absolute;
  width: max-content; // 防止窗口过窄时工具栏也跟着变窄
  right: 0;
  bottom: -10px;
  transform: translateY(100%);
}
.toolbar.top {
  bottom: unset;
  top: -10px;
  transform: translateY(-100%);
}
.toolbar.inside {
  right: 10px;
  bottom: 10px;
  transform: unset;
}
</style>
