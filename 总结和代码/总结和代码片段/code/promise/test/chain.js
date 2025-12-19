
// 核心链式调用测试
const pUserId = new MyPromise(resolve => {
  setTimeout(() => {
    resolve('getUserId异步请求耗时1秒');
  }, 500)
})
const pUserName = new MyPromise(resolve => {
  setTimeout(() => {
    resolve('getUserName异步请求耗时2秒');
  }, 1000)
})

pUserId.then(id => {
  console.log(id)
  return pUserName
}).then(name => {
  console.log(name)
})

// [promise-1]: constructor
// [promise-2]: constructor
// [promise-1]: then
// [promise-3]: constructor
// [promise-1]: _handle
// [promise-3]: then
// [promise-4]: constructor
// [promise-3]: _handle
// [promise-1]: _resolve
// [promise-1]: _handle
// getUserId异步请求耗时1秒
// [promise-3]: _resolve
// [promise-2]: then
// [promise-5]: constructor
// [promise-2]: _handle
// [promise-2]: _resolve
// [promise-2]: _handle
// [promise-3]: _resolve
// [promise-3]: _handle
// getUserName异步请求耗时2秒
// [promise-4]: _resolve
// [promise-5]: _resolve