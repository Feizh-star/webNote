const asyncTime = function () {
  return Math.floor(Math.random() * 2000 + 1000)
}
const yield2 = function () {
  return new Promise((resolve, reject) => {
    const delay = asyncTime()
    setTimeout(() => {
      if (delay > 2000) {
        reject(new Error('yield2 delay > 2000'))
      } else {
        resolve('yield1-' + delay)
      }
    }, delay)
  })
}
const yield3 = function () {
  return new Promise(resolve => {
    const delay = asyncTime()
    setTimeout(() => {
      resolve('yield2-' + delay)
    }, delay)
  })
}

const executor = function (...args) {
  const argumentList = args.slice(0, -1)
  const generator = args[args.length - 1]

  return new Promise((resolve, reject) => {
    const iterator = generator.apply(this, argumentList)

    const step = (method, arg) => {
      let result

      try {
        result = iterator[method](arg)
      } catch (error) {
        reject(error)
        return
      }

      const { value, done } = result

      if (done) {
        resolve(value)
        return
      }

      Promise.resolve(value)
        .then(
          val => step('next', val),
          err => step('throw', err)
        )
    }

    step('next')
  })
}

// 相当于async声明
// 1.当前try catch写法：捕获了任何错误，后面的就不执行了
// 2.如果只在yield2()加上try catch，那么yield2()发生错误后，yield3()会继续执行
function *asyncFunc(a, b, c) {
  try {
    console.log('generator', this, a, b, c)
    const y1 = yield 300
    console.log('next-1', y1)
    const y2 = yield yield2()
    console.log('next-2', y2)
    const y3 = yield yield3()
    console.log('next-3', y3)
    return Number(y3.split('-')[1]) > 1500 ? 'slow' : 'fast'
  } catch (error) {
    console.error(error)
    return 'done with await(yield) error'
  }
}
// 相当于调用async函数
executor.call(window, 1, 2, 3, asyncFunc)
  .then(res => {
    console.log('async then：', res)
  }).catch(error => {
    // 由于asyncFunc中捕获了错误，所以这里永远不会执行，如果asyncFunc中没有捕获错误，错误就会传播到这里
    console.error(error)
  })

console.log('sync')