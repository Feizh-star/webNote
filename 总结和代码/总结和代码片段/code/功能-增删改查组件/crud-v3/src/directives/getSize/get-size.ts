interface IGetSizeBinding {
  value: {
    sizeReactive: {
      [p: string]: object
    }
    key: string
  }
}
const getSizeMap = new WeakMap<
  HTMLElement,
  {
    observer: ResizeObserver
  }
>()

export default {
  mounted(el: HTMLElement, binding: IGetSizeBinding) {
    const container = el
    const sizeReactive = binding.value?.sizeReactive
    const key = binding.value?.key
    if (!isReactive(sizeReactive) || !key)
      throw new Error('v-get-size指令需要一个对象，包含一个reactive和一个key')

    const computedStyle = el.getBoundingClientRect()
    let oldWidth: string = computedStyle.width + ''
    let oldHeight: string = computedStyle.height + ''
    sizeReactive[key] = {
      width: parseFloat(oldWidth),
      height: parseFloat(oldHeight),
    }

    // 创建一个 ResizeObserver 实例
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { target, contentRect } = entry
        if (target !== container) continue
        const { width, height } = contentRect
        // 在这里执行宽高变化后的操作
        const newWidthString = width.toString()
        const newHeightString = height.toString()
        const sizeChange = oldWidth !== newWidthString || oldHeight !== newHeightString
        if (sizeChange) {
          sizeReactive[key] = {
            width: width,
            height: height,
          }
        }
        oldHeight = newHeightString
        oldWidth = newWidthString
      }
    })
    // 监听指定的 <div> 元素
    resizeObserver.observe(container)
    getSizeMap.set(el, { observer: resizeObserver })
  },
  unmounted(el: HTMLElement) {
    const observer = getSizeMap.get(el)?.observer
    if (!observer) return
    observer.unobserve(el)
  },
}
