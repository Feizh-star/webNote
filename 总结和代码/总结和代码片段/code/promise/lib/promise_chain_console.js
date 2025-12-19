class MyPromise {
  callbacks = [];
  state = "pending"; //增加状态
  value = null; //保存结果
  constructor(fn) {
    // test start
    this.pid = `promise-${MyPromise.pIndex++}`;
    console.log(`[${this.pid}]: constructor`);
    // test end

    fn(this._resolve.bind(this));
  }
  then(onFulfilled) {
    // test start
    console.log(`[${this.pid}]: then`);
    // test end

    return new MyPromise((resolve) => {
      this._handle({
        onFulfilled: onFulfilled || null,
        resolve: resolve,
      });
    });
  }
  _handle(callback) {
    // test start
    console.log(`[${this.pid}]: _handle`);
    // test end

    if (this.state === "pending") {
      this.callbacks.push(callback);
      return;
    }
    //如果then中没有传递任何东西
    if (!callback.onFulfilled) {
      callback.resolve(this.value);
      return;
    }
    var ret = callback.onFulfilled(this.value);
    callback.resolve(ret);
  }
  _resolve(value) {
    // test start
    console.log(`[${this.pid}]: _resolve`);
    // test end

    if (value && (typeof value === "object" || typeof value === "function")) {
      var then = value.then;
      if (typeof then === "function") {
        then.call(value, this._resolve.bind(this));
        return;
      }
    }
    this.state = "fulfilled"; //改变状态
    this.value = value; //保存结果
    this.callbacks.forEach((callback) => this._handle(callback));
  }

  // test start
  static pIndex = 1;
  pid = "";
  // test end
}
