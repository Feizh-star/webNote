## Axios基本使用

* 有很多使用方式不常用，更多使用可以参考[中文文档](http://www.axios-js.com/zh-cn/docs/)

### 1. 直接使用axios()

* axios(config).then(resolve)

* axios(url[, config]).then(resolve)

* config

  * url
  * method
  * baseURL
  * transformRequest / transformResponse
  * params
  * data
  * headers
  
  ```javascript
  {
     // `url` 是用于请求的服务器 URL
    url: '/user',
  
    // `method` 是创建请求时使用的方法
    method: 'get', // default
  
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: 'https://some-domain.com/api/',
  
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data, headers) {
      // 对 data 进行任意转换处理
      return data;
    }],
  
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
      // 对 data 进行任意转换处理
      return data;
    }],
  
    // `headers` 是即将被发送的自定义请求头
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  
    // `params` 是即将与请求一起发送的 URL 参数
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
    params: {
      ID: 12345
    },
  
     // `paramsSerializer` 是一个负责 `params` 序列化的函数
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    paramsSerializer: function(params) {
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
  
    // `data` 是作为请求主体被发送的数据
    // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    // 在没有设置 `transformRequest` 时，必须是以下类型之一：
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - 浏览器专属：FormData, File, Blob
    // - Node 专属： Stream
    data: {
      firstName: 'Fred'
    },
  
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: 1000,
  
     // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false, // default
  
    // `adapter` 允许自定义处理请求，以使测试更轻松
    // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
    adapter: function (config) {
      /* ... */
    },
  
   // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
    // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
    auth: {
      username: 'janedoe',
      password: 's00pers3cret'
    },
  
     // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default
  
    // `responseEncoding` indicates encoding to use for decoding responses
    // Note: Ignored for `responseType` of 'stream' or client-side requests
    responseEncoding: 'utf8', // default
  
     // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
    xsrfCookieName: 'XSRF-TOKEN', // default
  
    // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    xsrfHeaderName: 'X-XSRF-TOKEN', // default
  
     // `onUploadProgress` 允许为上传处理进度事件
    onUploadProgress: function (progressEvent) {
      // Do whatever you want with the native progress event
    },
  
    // `onDownloadProgress` 允许为下载处理进度事件
    onDownloadProgress: function (progressEvent) {
      // 对原生进度事件的处理
    },
  
     // `maxContentLength` 定义允许的响应内容的最大尺寸
    maxContentLength: 2000,
  
    // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },
  
    // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
    // 如果设置为0，将不会 follow 任何重定向
    maxRedirects: 5, // default
  
    // `socketPath` defines a UNIX Socket to be used in node.js.
    // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
    // Only either `socketPath` or `proxy` can be specified.
    // If both are specified, `socketPath` is used.
    socketPath: null, // default
  
    // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
    // `keepAlive` 默认没有启用
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
  
    // 'proxy' 定义代理服务器的主机名称和端口
    // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
    // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
    proxy: {
      host: '127.0.0.1',
      port: 9000,
      auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
      }
    },
  
    // `cancelToken` 指定用于取消请求的 cancel token
    // （查看后面的 Cancellation 这节了解更多）
    cancelToken: new CancelToken(function (cancel) {
    })
  }
  ```

### 2. get请求

* axios.get(url[, config])

#### 1.1 不带参数

```javascript
axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
  console.log(res)
})
```

#### 1.2 带参数

* 带查询参数的get请求(?id=1 或者 restful接口，都用params)

```javascript
axios.get('https://jsonplaceholder.typicode.com/todos', {
  params: {
    id: 1
  }
}).then(res => {
  console.log(res)
})
```

### 3. post请求

* ##### axios.post(url[, data[, config]])

* 第二个参数用于以键值对的形式传递 post数据,这里第二个参数是config.data,并不是config本身

```javascript
axios.post('https://jsonplaceholder.typicode.com/todos', {
  title: this.inputVal,
  completed: this.checkbox
}).then(res => {
  console.log(res)
})
```

### 4. 并发请求

* axios可以同时发出多个请求，并在请求成功的回调中 分别处理response
* axios.all([ ])：需传入axios请求返回的promise实例列表
* axios.spread()：返回一个函数作为resolve，接收一个函数作为参数
  * 推测：spread()的参数在resolve中调用，把多个http请求的响应 分别分发给指定的 形参`(resOne, resTwo)`

```javascript
function getOne() {
  return axios.get('https://jsonplaceholder.typicode.com/todos/1')
}
function getTwo() {
  return axios.get('https://jsonplaceholder.typicode.com/todos/2')
}
axios.all([getOne(), getTwo()])
  .then(axios.spread(function (resOne, resTwo) {
    console.log(resOne);
    console.log(resTwo)
  }))
```

### 5. 请求拦截

* 设置请求拦截，可以在 http请求发出前，执行拦截器（函数），做一些操作（例如修改config，或操作DOM之类的）
* 拦截器可以取消

```javascript
// 设置请求拦截器
const myInterceptor = axios.interceptors.request.use(config => {
  console.log('我是请求拦截器，此时请求还未发出');
  config.data.title = '哈哈，请求数据被改了';	// 修改请求中的title
  return config;  // config会作为新的配置对象，并在实际请求中使用
}, err => {
  console.log('请求拦截器的错误处理')
  return Promise.reject(err)
});
// 发起post请求，这个请求即会被拦截
axios.post('https://jsonplaceholder.typicode.com/todos', {
  title: this.inputVal,
  completed: this.checkbox
}).then(res => {
  console.log(res)
})
// 取消请求拦截器
axios.interceptors.request.eject(myInterceptor)
```

### 6. 响应拦截

* 响应拦截允许我们在 拿到响应数据 response时，在执行resolve之前，对response对象进行更改（或其他操作）
* 拦截器可以取消

```javascript
// 设置响应拦截器
const myInterceptor = axios.interceptors.response.use(res => {
  console.log('我是响应拦截器，此时响应数据还未处理');
  res.data.title = '哈哈，响应数据被改了';
  return res;
}, err => {
  console.log('响应拦截器的错误处理')
  console.log(err)
  return Promise.reject(err)
});
// 发起post请求
axios.post('https://jsonplaceholder.typicode.com/todos', {
  title: this.inputVal,
  completed: this.checkbox
}).then(res => {
  // 执行此函数之前会先执行拦截器
  console.log(res)
})
// 取消响应拦截器
axios.interceptors.response.eject(myInterceptor)
```




