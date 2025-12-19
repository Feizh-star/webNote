const asyncTime = function () {
  return Math.floor(Math.random() * 2000 + 1000)
}
const yield2 = function (): Promise<string> {
  return new Promise(resolve => {
    const delay = asyncTime()
    setTimeout(() => {
      resolve('yield1-' + delay)
    }, delay)
  })
}
const yield3 = function (): Promise<string> {
  return new Promise((resolve, reject) => {
    const delay = asyncTime()
    setTimeout(() => {
      resolve('yield2-' + delay)
    }, delay)
  })
}
// Generator<T, TResult, TNext>:
// 状态{done?: boolean; value: T} | {done: boolean; value: TResult}.next(...args: [] | [TNext])
const step = function (
  status: IteratorResult<any, any>,
  iterator: Generator<any, any, any>,
  resolve: (value: any) => void,
  reject: (value: any) => void,
) {
  if (status.done) {
    resolve(status.value)
  } else {
    const isPromise = status.value instanceof Promise 
    const p = isPromise ? status.value : Promise.resolve()
    p.then(res => {
      step(iterator.next(isPromise ? res : status.value), iterator, resolve, reject)
    }).catch(error => {
      iterator.throw(error)
      reject(error)
    })
  }
}
const executor = function (...args: any[]) {
  const argumentList = args.slice(0, args.length - 1)
  const generator = args[args.length - 1] as (...args: any[]) => Generator<any, any, any>
  return new Promise((resolve, reject) => {
    const iterator = generator.apply(this, argumentList)
    step(iterator.next(), iterator, resolve, reject)
  })
}

// 相当于async声明
function *asyncFunc(this: unknown, a: number, b: number, c: number): Generator<any, any, any> {
  try {
    console.log('generator', this, a, b, c)
    const y1: string = yield 300
    console.log('next-1', y1)
    const y2: string = yield yield2()
    console.log('next-2', y2)
    const y3: string = yield yield3()
    console.log('next-3', y3)
    return Number(y3.split('-')[1]) > 1500 ? 'slow' : 'fast'
  } catch (error) {
    console.dir(error)
  }
}

// 相当于调用async函数
executor.call(window, 1, 2, 3, asyncFunc).then(res => {
  console.log(res)
}).catch(error => {
  console.dir(error)
})

export {}
