import Draggable from './draggable'
import type { Ref } from 'vue'

interface IElDialogDraggableArgs {
  dialogVisible: Ref<boolean>
  elRef: Ref<HTMLElement> | HTMLElement
  draggable: Ref<boolean>
  target?: string
  drag?: string
  disabledBack?: boolean
  closeBack?: boolean
}

export function useElDialogDraggable({
  dialogVisible,
  elRef,
  draggable,
  target,
  drag,
  disabledBack,
  closeBack,
}: IElDialogDraggableArgs) {
  target = target || '.el-dialog'
  drag = drag || '.el-dialog__header'
  disabledBack = !!disabledBack
  closeBack = !!closeBack
  let flag = false
  watch(dialogVisible, (newVal) => {
    if (newVal) {
      nextTick(() => {
        if (flag) return
        const rootEl = isRef(elRef) ? elRef.value : elRef
        if (!rootEl) return
        Draggable.mounted(rootEl, {
          value: {
            target: target,
            drag: drag,
            draggable: draggable.value,
            visible: dialogVisible.value,
            disabledBack,
            closeBack,
          },
        })
        flag = true
      })
    }
  })
  watch([() => draggable.value, () => dialogVisible.value], ([newDraggable, newVisible]) => {
    const rootEl = isRef(elRef) ? elRef.value : elRef
    if (!rootEl) return
    Draggable.updated(rootEl, {
      value: { target: target, drag: drag, draggable: newDraggable, visible: newVisible || false },
    })
  })
  onBeforeUnmount(() => {
    const rootEl = isRef(elRef) ? elRef.value : elRef
    if (!rootEl) return
    Draggable.beforeUnmount(rootEl)
  })
}
