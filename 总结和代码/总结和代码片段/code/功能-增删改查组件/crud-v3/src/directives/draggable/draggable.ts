interface IDraggableInfo {
  targetEl: HTMLElement
  dragEl: HTMLElement
  onDraggable: () => void
  offDraggable: () => void
  transform: {
    offsetX: number
    offsetY: number
  }
  originStyle: {
    cursor: string
  }
  closeBack: boolean
  disabledBack: boolean
}
interface IBinding {
  value?: {
    target?: string
    drag?: string
    draggable?: boolean
    visible?: boolean
    disabledBack?: boolean
    closeBack?: boolean
  }
  oldValue?: {
    visible?: boolean
  }
}

const draggableMap = new WeakMap<HTMLElement, IDraggableInfo>()

function initDraggable(el: HTMLElement, draggable: boolean) {
  const draggableInfo = draggableMap.get(el)
  if (!draggableInfo) return
  if (draggable) {
    draggableInfo.dragEl && (draggableInfo.dragEl.style.cursor = 'move')
    draggableInfo.onDraggable()
  } else {
    draggableInfo.dragEl && (draggableInfo.dragEl.style.cursor = draggableInfo.originStyle.cursor)
    draggableInfo.offDraggable()
  }
}

export default {
  mounted(el: HTMLElement, binding?: IBinding) {
    const targetSelector = binding?.value?.target || ''
    const dragSelector = binding?.value?.drag || ''
    const draggable = !!binding?.value?.draggable
    const targetEl = (el.querySelector(targetSelector) || el) as HTMLElement
    const dragEl = el.querySelector(dragSelector) as HTMLElement
    if (!targetEl || !dragEl) {
      console.warn('target element or drag element does not exist.')
      return
    }
    const onMousedown = (e: MouseEvent) => {
      const draggableInfo = draggableMap.get(el)
      if (!draggableInfo) return
      const downX = e.clientX
      const downY = e.clientY
      const { offsetX, offsetY } = draggableInfo.transform
      const targetRect = targetEl.getBoundingClientRect()
      const targetLeft = targetRect.left
      const targetTop = targetRect.top
      const targetWidth = targetRect.width
      const targetHeight = targetRect.height
      const clientWidth = document.documentElement.clientWidth
      const clientHeight = document.documentElement.clientHeight
      const minLeft = -targetLeft + offsetX
      const minTop = -targetTop + offsetY
      const maxLeft = clientWidth - targetLeft - targetWidth + offsetX
      const maxTop = clientHeight - targetTop - targetHeight + offsetY
      const onMousemove = (e2: MouseEvent) => {
        const moveX = Math.min(Math.max(offsetX + e2.clientX - downX, minLeft), maxLeft)
        const moveY = Math.min(Math.max(offsetY + e2.clientY - downY, minTop), maxTop)
        draggableInfo.transform = { offsetX: moveX, offsetY: moveY }
        targetEl.style.transform = `translate(${moveX}px, ${moveY}px)`
      }
      const onMouseup = () => {
        document.removeEventListener('mousemove', onMousemove)
        document.removeEventListener('mouseup', onMouseup)
        targetEl.style.userSelect = 'unset'
      }
      document.addEventListener('mousemove', onMousemove)
      document.addEventListener('mouseup', onMouseup)
      targetEl.style.userSelect = 'none'
    }
    const onDraggable = () => {
      if (dragEl && targetEl) {
        dragEl.addEventListener('mousedown', onMousedown)
      }
    }
    const offDraggable = () => {
      if (dragEl && targetEl) {
        const draggableInfo = draggableMap.get(el)
        if (!draggableInfo) return
        dragEl.removeEventListener('mousedown', onMousedown)
        if (draggableInfo.disabledBack) {
          draggableInfo.transform = { offsetX: 0, offsetY: 0 }
          setTimeout(() => (targetEl.style.transform = `translate(0px, 0px)`), 500)
        }
      }
    }
    draggableMap.set(el, {
      targetEl,
      dragEl,
      onDraggable,
      offDraggable,
      transform: { offsetX: 0, offsetY: 0 },
      closeBack: !!binding?.value?.closeBack,
      disabledBack: !!binding?.value?.disabledBack,
      originStyle: {
        cursor: (dragEl && getComputedStyle(dragEl).cursor) || 'default',
      },
    })
    initDraggable(el, draggable)
  },
  updated(el: HTMLElement, binding?: IBinding) {
    const draggableInfo = draggableMap.get(el)
    if (!draggableInfo) return
    if (binding?.value?.visible === false && draggableInfo.closeBack) {
      // 判断时必须保证visible是boolean
      draggableInfo.transform = { offsetX: 0, offsetY: 0 }
      setTimeout(() => (draggableInfo.targetEl.style.transform = `translate(0px, 0px)`), 500)
    }
    initDraggable(el, !!binding?.value?.draggable)
  },
  beforeUnmount(el: HTMLElement) {
    const draggableInfo = draggableMap.get(el)
    if (!draggableInfo) return
    draggableInfo.offDraggable()
    draggableMap.delete(el)
  },
}
