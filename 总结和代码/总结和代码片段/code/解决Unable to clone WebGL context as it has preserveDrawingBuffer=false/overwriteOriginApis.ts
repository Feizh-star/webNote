// 解决Unable to clone WebGL context as it has preserveDrawingBuffer=false
HTMLCanvasElement.prototype.getContext = (function (origFn: Function) {
  return function (this: unknown, type: string, attributes: object) {
    if (type === 'webgl') {
      attributes = Object.assign({}, attributes, {
        preserveDrawingBuffer: true
      })
    }
    return origFn.call(this, type, attributes)
  }
})(HTMLCanvasElement.prototype.getContext)
