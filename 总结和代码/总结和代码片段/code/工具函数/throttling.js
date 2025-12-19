// 节流
export function throttling(fn, wait, immediate) {
  let timer = null
  return function (...args) {
    if (timer) return
    if (immediate) fn.apply(this, args)
    timer = setTimeout(() => {
      if (!immediate) fn.apply(this, args)
      clearTimeout(timer)
      timer = null
    }, wait)
  }
}