import { debounce } from '@/utils/tools'
const elScaleSizeKey = Symbol('elScaleSizeKey')
const setSize = Symbol('setSize')
const reverseKey = new Map([
  ['width', 'height'],
  ['height', 'width'],
])
const elInfoMap = new WeakMap()

type sizeKey = 'width' | 'height'
interface IBinding {
  value: {
    computingSizeKey: sizeKey
    scale: number
  }
  [p: string]: any
}

function setWidth(el: HTMLElement) {
  const elInfo = elInfoMap.get(el)
  if (!elInfo) return
  const elScaleSizeProps = elInfo[elScaleSizeKey] as IBinding['value']
  const computingSizeKey = elScaleSizeProps.computingSizeKey
  const knownSizeKey = reverseKey.get(computingSizeKey) as sizeKey
  const scale = elScaleSizeProps.scale
  const knownSize = getComputedStyle(el)[knownSizeKey]
  const computedSize = (parseFloat(knownSize) || 0) * scale + 'px'
  el.style[computingSizeKey] = computedSize
}

export default {
  created(el: HTMLElement, binding: IBinding) {
    const bindingValue = binding.value
    const elInfo = {
      [elScaleSizeKey]: { ...bindingValue },
      [setSize]: debounce(function () {
        setWidth(el)
      }, 300),
    }
    elInfoMap.set(el, elInfo)
  },
  mounted(el: HTMLElement) {
    const elInfo = elInfoMap.get(el)
    if (!elInfo) return
    window.addEventListener('resize', elInfo[setSize])
    setWidth(el)
  },
  unmounted(el: HTMLElement) {
    const elInfo = elInfoMap.get(el)
    if (!elInfo) return
    window.removeEventListener('resize', elInfo[setSize])
  },
}
