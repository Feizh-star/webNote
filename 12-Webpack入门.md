# Webpack入门1.0

## 一、Webpack基本了解

### 1. nrm的使用

* nrm是一个npm镜像地址管理工具，可以方便地管理npm下载包  时的镜像地址
* 常用命令：
  * 安装：npm i nrm -g
  * 查看：nrm ls，当前使用的镜像前面会被 * 标识
  * 切换镜像：nrm use 镜像名称
* 注意：nrm镜像中的cnpm，只是一个镜像地址，还有一个包也叫cnpm，二者毫无关联

### 2. 为什么使用Webpack

1. 在网页中会引用哪些常见的静态资源？

   + JS
     * .js  .jsx  .coffee  .ts（TypeScript  类 C# 语言）

   + CSS
     * .css  .less   .sass  .scss

   + Images
     * .jpg   .png   .gif   .bmp   .svg

   + 字体文件（Fonts）
     * .svg   .ttf   .eot   .woff   .woff2

   + 模板文件
     * .ejs   .jade  .vue【这是在webpack中定义组件的方式，推荐这么用】

2. 网页中引入的静态资源多了以后有什么问题？？？
   1. 网页加载速度慢， 因为 我们要发起很多的二次请求；
   2. 要处理错综复杂的依赖关系
3. 如何解决上述两个问题
   1. 合并、压缩、精灵图、图片的Base64编码
   2. 可以使用之前学过的requireJS、也可以使用webpack可以解决各个包之间的复杂依赖关系；

4. 什么是webpack?
  
* webpack 是前端的一个项目构建工具，它是基于 Node.js 开发出来的一个前端工具；
  
5. 如何完美实现上述的2种解决方案
   1. 使用Gulp， 是基于 task 任务的；（灵活，适合小型项目）
   2. 使用Webpack， 是基于整个项目进行构建的；
      * 借助于webpack这个前端自动化构建工具，可以完美实现资源的合并、打包、压缩、混淆等诸多功能。
      * 根据官网的图片介绍webpack打包的过程
      * [webpack官网](http://webpack.github.io/)
6. webpack的作用
   * webpack 能够处理 JS 文件的互相依赖关系；
     * 重复导入的模块/库，只会被打包1次，例如两个js文件中都导入了vue，最终结果vue只会被导入1次
   * webpack 能够处理JS的兼容问题，把 高级的、浏览器不是别的语法，转为 低级的，浏览器能正常识别的语法

### 3. webpack的两种安装方式

1. 运行`npm i webpack -g`全局安装webpack，这样就能在全局使用webpack的命令，==不推荐==

   ```
   # 安装webpack V4+版本时，需要额外安装webpack-cli 
   npm install webpack webpack-cli -g
   ```

2. 在项目根目录中运行`npm i webpack -D`安装到项目依赖中，==推荐==，因为很多插件要依赖项目中的webpack而非全局安装的webpack

   * v4.0+版本的webpack需要手动安装webpack-cli，`npm i webpack-cli -D`

#### 3.1 关于版本

* 截止目前，webpack的最新版本为5.9.0，但==并非越新越好==
* 踩了一串坑，含泪总结：
  1. webpack-dev-server依赖本地（项目）中的webpack@4.0.0
  2. webpack-dev-server依赖本地（项目）中的webpack-cli@3.3.12，最新版的webpack-cli（v4.0+）中没有`webpack-cli/bin/config-yargs`，构建时会报错

### 4. webpack的基本使用

* 项目目录
  * dist：项目构建目标目录，一般webpack的output出口就设置在这里
  * src：前端开发目录
    * css
    * js
    * images
    * index.html
    * main.js
  * node_modules：包目录（npm安装包时自动生成）
  * ...

1. webpack的使用前提
   * 一个页面（index.html）只有一个script标签，引入main.js（入口文件）
   * 其他js文件（模块）都在main.js中导入（import）
   * webpack会将main.js及其依赖整合到一个目标文件中

#### 4.1 webpack的默认配置

* 使用webpack之前要先进行基本的配置，至少要有  入口  和  出口
* webpack.config.js是webpack的配置文件，里面可以写任何node.js代码
* webpack的配置参数写在一个对象中，将这个对象导出即可
* webpack.config.js要自行创建，放在项目的根目录下

```javascript
// webpack.config.js
const path = require('path');

let config = {
	entry: path.join(__dirname, './src/main.js'),
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	}
};

module.exports = config;
```

#### 4.2 执行构建

* 由于webpack安装在本地项目中，webpack并不是一个全局命令，所以要在package.json中设置脚本

  1. 首先需要在package.json中添加test指令对应的执行脚本

     ```
     ----------------------------------------------
     	"scripts":{ 
      		"wp": "webpack" // 原理就是通过shell脚本在node_modules/.bin⽬录下创建⼀个软链接
     	},
     ----------------------------------------------
     ```

  2. 然后再（在命令行）执行如下脚本

     ```
     npm run wp
     ```

### 5. webpack的配置

#### 5.1 入口配置

* 配置对象
  * entry：字符串，设置入口文件，绝对路径，可用path模块拼接

#### 5.2 出口配置

* 配置对象
  * output：对象，设置构建的出口文件
    * path：出口目录，绝对路径，即打包好的文件放到哪个目录中去
    * filename：打包好的文件的文件名

### 6. webpack配置总结

* 此配置为基本webpack配置，包括
  * vue
  * less
  * ES6、ES7语法支持
* 将下述配置文件的内容copy到  已经npm init -y的项目中  相应的位置，然后cnpm i安装所有依赖即可
  * 这三个文件都在项目根目录下

#### 6.1 package.json文件

1. "main": "webpack.config.js"

2. "scripts"

   ```json
   "wp": "webpack",
   "server": "webpack-dev-server"
   ```

3. "devDependencies"：开发环境依赖

   ```json
   "devDependencies": {
     "@babel/core": "^7.12.9",
     "@babel/plugin-proposal-class-properties": "^7.12.1",
     "@babel/plugin-transform-runtime": "^7.12.1",
     "@babel/preset-env": "^7.12.7",
     "@babel/runtime": "^7.12.5",
     "babel-loader": "^8.2.2",
     "css-loader": "^5.0.1",
     "file-loader": "^6.2.0",
     "html-webpack-plugin": "^4.5.0",
     "less": "^3.5.0",
     "less-loader": "^7.1.0",
     "style-loader": "^2.0.0",
     "url-loader": "^4.1.1",
     "vue-loader": "^15.9.5",
     "vue-template-compiler": "^2.6.12",
     "webpack": "^4.0.0",
     "webpack-cli": "^3.3.12",
     "webpack-dev-server": "^3.11.0"
   }
   ```

4. "dependencies"：生产环境依赖，可按需补充

   ```json
   "dependencies": {
     "bootstrap": "^3.4.1",
     "vue": "^2.6.12",
     "vue-router": "^3.4.9"
   }
   ```

#### 6.2 webpack.config.js文件

```js
const path = require('path')
// 配置webpack-dev-server热更新：步骤1
const webpack = require('webpack')
// 配置html-webpack-plugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 导入vue-loader/lib/plugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')

let config = {
  mode: 'development',
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  // 配置webpack-dev-server(热更新)：步骤2
  devServer: {
    open: true,
    port: 3000,
    hot: true
  },
  // 插件
  plugins: [
    // 配置webpack-dev-server(热更新)：步骤3
    new webpack.HotModuleReplacementPlugin(),
    // 配置html-webpack-plugin插件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    // 配置vue-loader插件
    new VueLoaderPlugin()
  ],
  // loader配置
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.(jpg|jpeg|png|bmp|gif)$/, use: 'url-loader?limit=1000&name=[name]-[hash:8].[ext]' },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  }
}

module.exports = config
```

#### 6.3 .babelrc文件

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties"]
}
```

## 二、webpack插件

* 凡是插件，都要在webpack.config.js配置文件中require，然后在plugins数组中创建实例
  * webpack-dev-server的配置方式1算是例外
* 插件只是为了让我们开发时更加高效
  * 使用webpack-dev-server进行打包时，会开启一个静态资源服务器
  * 打包结果（js出口文件、图片、html等）资源都会在内存中（且在服务器的根目录），这是为了使频繁打包更高效
  * 当我们开发完毕，只需要手动执行一次webpack打包操作，就可以把这些打包好的资源放入output指定的目录中

### 1. webpack-dev-server

* webpack-dev-server可以实现（保存修改时）实时打包构建，免去了频繁输入webpack命令的麻烦

#### 1.1 安装

* webpack-dev-server必须依赖==本地==的==一定版本==的webpack和webpack-cli

  * 当前以下三个版本配合，实测可用

  ```
  "devDependencies": {
    "webpack": "^4.0.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
  }
  ```

* 同本地安装的webpack一样，webpack-dev-server构建命令也需要在package.json的scripts节点中设置执行脚本

  * 然后通过`npm run server`执行构建，构建完成后，webpack-dev-server不会退出，而是等待下一次保存操作时自动构建

  ```
  ----------------------------------------------
  	"scripts":{ 
   		"wp": "webpack", // 原理就是通过shell脚本在node_modules/.bin⽬录下创建⼀个软链接
   		"server": "webpack-dev-server"
  	},
  ----------------------------------------------
  ```

##### (1) ==命令无法使用==

* 有时会遇到错误：'webpack-dev-server' 不是内部或外部命令...
* 这一般是由于卸载包、安装中途取消导致包损坏（即使安装和卸载操作不关webpack-dev-server的事）
* 解决方法：把node_modules目录整个删除，重新cnpm i，安装所有依赖

##### (2) 打包报错的处理

* 打包时报错：
  1. 先仔细看看错误信息
  2. 可从以下方向考虑
     * 包损坏，删掉node_modules，重新安装`cnpm i`
     * loader或plugin 的版本不兼容，按照本文档记录的版本安装重试

#### 1.2 特性

1. webpack-dev-server 帮我们打包生成的 bundle.js 文件，并没有存放到 实际的 物理磁盘上；而是，直接托管到了 电脑的内存中，所以，我们在 项目根目录中，根本找不到 这个打包好的 bundle.js;

2. webpack-dev-server帮我们构建完毕后，会开启一个静态资源服务器，http://localhost:8080/，可以通过浏览器访问，打开后就是我们项目的根目录

3. 内存中的bundle.js可以通过http://localhost:8080/bundle.js访问

4. 使用webpack-dev-server构建的（内存中的）bundle.js

   * 在index.html中的script标签的src中使用`http://localhost:8080/bundle.js`

     * 这种方式：可以使用http协议访问，也可以使用file协议访问

     ```html
     <script type="text/javascript" src="http://localhost:8080/bundle.js"></script>
     ```

   * 在index.html中的script标签的src中使用`/bundle.js`

     * 注意：这种方式，只能通过http协议访问，即在浏览器中输入`http://localhost:8080`来访问

     ```html
     <script type="text/javascript" src="/bundle.js"></script>
     ```

5. index.html若已在浏览器中打开，则webpack-dev-server重新构建后，浏览器也会立即刷新

   * 入口文件及其依赖的文件更新（保存）时，都会触发重新构建

#### 1.3 配置

##### (1) 配置方式1

* 通过在webpack-dev-server命令中添加参数，可以对webpack-dev-server进行配置
  * --open：构建完成后自动打开浏览器
  * --port：设置webpack-dev-server启动的服务器的端口
  * --contentBase：这是打开浏览器时，默认路径，一般设为src，就会自动打开index.html
  * --hot：启动热模块替换 HMR
    1. 热更新不会在内存中重新构建目标bundle.js，而是只针对入口的变化对bundle.js打补丁，这样webpack-dev-server自动构建时的效率就大大提升
    2. 针对css样式的构建，可以在构建完毕后，实现页面无刷新（展现新的样式）
  * `"server": "webpack-dev-server --open --port 3000 --contentBase src --hot"`

##### (2) 配置方式2

* 在webpack.config.js中配置

* 配置对象

  * entry，output，...

  * devServer：对象，其属性是webpack-dev-server的配置

    * compress: 布尔值，启用gzip压缩，提升开发服务器打包和页面刷新效率

    * open：布尔值，设置为true，则webpack-dev-server构建完成后自动打开浏览器（及项目）

    * port：数值，自定义端口

    * contentBase：字符串，相对路径，自动打开项目时 的路径，一般设置为前端页面所在的路径src

    * hot：布尔值：设置为true，启用热更新
    
      * css的style-loader默认支持热模块替换，不用额外配置
      
      * js默认不支持热模块替换，可以通过监听模块变化来实现（入口js本身不可被监听）
      
        ```js
        // 入口js文件
        // 如果开启了HMR，则module对象上会有一个hot属性
        if (module.hot) {
          // 监听指定的js文件，如果它发生变化，则执行回调函数
          module.hot.accept('./js/a.js', () => {
            say()
          })
          // 监听更多js文件
        }
        ```
      
      * html文件只有1个，没必要进行热模块替换。且使用了HMR之后，html文件的变化不会再引起devServer热更新（解决办法，在webpack.config.js中的entry中增加1个入口文件 即html文件）
      
      > *要启用热更新，只设置hot为true还不够，还要*——==作废==
      >
      > 2. 在webpack配置文件中，导入webpack模块
      >
      >    ```
      >    const webpack = require('webpack');
      >    ```
      >
      > 3. 在webpack配置对象中  的plugins属性中，创建一个新的热更新模块对象
      >
      >    ```
      >    new webpack.HotModuleReplacementPlugin()
      >    ```

### 2. html-webpack-plugin

* webpack-dev-server会把webpack构建的js文件放入内存中，提高重复构建的效率
* html-webpack-plugin可以把html页面也放入内存中，并自动把打包好的js文件追加到html页面中去
* html-webpack-plugin相当于webpack-dev-server的扩展

#### 2.1 安装

* 直接`cnpm i html-webpack-plugin -D`即可，版本v4.5.0可用

* 使用：凡是插件，都要在webpack.config.js配置文件中require，然后在plugins数组中创建实例

  1. 在webpack.config.js中导入包

     ```javascript
     const htmlWebpackPlugin = require('html-webpack-plugin');
     ```

  2. 在plugins数组中创建实例，`new htmlWebpackPlugin()`

     * 配置对象
       * template：以绝对路径指定  要在内存中生成的html页面  的模板html页面
       * filename：在内存中生成的html页面的文件名。
         * ==无论模板html文件的文件名是什么，这里的目标文件名要使用index.html==
         * ==这样webpack-dev-server的服务器首页  就是html-webpack-plugin在内存中生成的html页面==，即使没有配置webpack-dev-server的--contentBase

  3. 将index.html中script标签注释掉，因为`html-webpack-plugin`插件会自动把bundle.js注入到index.html页面中

  4. 完成以上配置，使用webpack-dev-server开启的服务器（通过http协议）  打开的页面就是内存中的index.html（无论自动还是手动）

#### 2.2 特点

* `html-webpack-plugin`插件会自动把bundle.js注入到index.html页面中，免去了自己添加script标签还要考虑bundle.js路径的麻烦
* webpack-dev-server开启的服务器（通过http协议）  打开的页面就是内存中的index.html
* ==使用了html-webpack-plugin可以在  它所跟踪的模板HTML文件  更新保存后触发webpack-dev-server的构建==

#### 2.3 问题

1. ERROR in The “path“ argument must be of type string. Received undefined
   * 原因`html-webpack-plugin`下载成了`webpack-html-plugin`
   * 后者是远古时期的包名，自然会有问题

### 3.  dev-server跨域问题

* 开发环境下，我们项目的http请求会有跨域问题
* 原因：
  * 使用dev-server会创建一个本地服务器（http://localhost:port），用于在开发环境下运行项目，方便我们预览项目效果
  * 而后端给我们的接口（的协议、域名、端口） 必然不可能与dev-server为我们创建的服务器 完全相同
  * 这就造成了：
    * 我们前端代码的 源（服务器）是webpack-dev-server配置的本地服务器（http://localhost:port）
    * 而我们请求数据（ajax、vue-resource、axios）的url是另一个源，浏览器的同源策略会阻止我们的http请求

#### 3.1 原理

* webpack 内置了 `http-proxy-middleware` 可以解决 请求的 URL 代理的问题
* 原理：
  * 假设devServer服务器的 域名是 `http://localhost:3000`，后台接口服务器的域名是 `http://www.interface.io`
  * 通过配置devServer，在devServer服务器上设置了代理
  * 浏览器页面（前端项目）发起http请求（url为`/api/getinfo`），==浏览器同源策略==下，是向`http://localhost:3000/api/getinfo`（即devServer服务器）请求数据
  * devServer服务器会根据代理的目标（target域名），使用`http://www.interface.io/api/getinfo`向真正的后台服务器请求数据，拿到响应数据后，再把数据交给发起请求的客户端（==服务器向服务器请求数据，没有同源策略==）
* 把项目放到生产环境：
  * 由于我们的http请求直接使用了形如`/api/getinfo`的url，“/”就代表了当前的源（协议://域名:端口），浏览器会把url中的 “/” 替换为当前的 源 ，这样就可以直接访问到我们项目部署上线后的后台数据了

#### 3.2 自行配置webpack解决跨域（不通过vue-cli）

1. 假设后端给我们的接口统一以 api 开头，即形如`http://www.interface.io/api/getinfo`

2. 那么，我们前端的所有http请求的url都写 `/api/xxx/yyy`

3. 在webpack.config.js中 的配置对象 的devServer节点中添加如下配置：

   * proxy：代理配置，对象，每一个属性都是一条代理规则
     * 键：字符串，http请求中的url的统一开头，例如`'/api'`，就是所有/api路径下的请求都会被代理
     * 值：对象
       * target：真正的后台接口的域名（非80端口要带端口号）
       * secure: false, // 接受 运行在 https 上的服务
       * changeOrigin: true，进行代理

   ```javascript
   module.exports = {
     // 其他配置...
     devServer: {
       // 其他配置...
       proxy: {
         // 请求到 '/api' 下 的请求都会被代理到 target：http://localhost:3010 中
         '/api': { 
             target: 'http://localhost:3010',
             secure: false, // 接受 运行在 https 上的服务
             changeOrigin: true,
         }
       }
     },
     // 其他配置...
   }
   ```

4. 应对后端接口的起始路径不同的情况（有的接口/api开头，有的接口/abc开头）

   * 直接把proxy配置对象的键 设置为 `'/'`

   * 或者（前端）人为的把所有url前面加上`/api`，再使用`pathRewrite`，代理时把`/api`替换成`/`

     * 缺点：项目上线前要把所有的/api删除。可以使用axios的全局配置，把根路径配置为/api，项目上线时再去掉

     ```javascript
     proxy: {
       // 请求到 '/api' 下 的请求都会被代理到 target：http://localhost:3010 中
       '/api': { 
           target: 'http://localhost:3010',
           secure: false, // 接受 运行在 https 上的服务
           changeOrigin: true,
           pathRewrite: {
             '^/api': '/'   //重写接口，代理时把 人为加上的/api替换为/
           }
       }
     }
     ```

#### 3.3 使用vue-cli

* 在项目根目录下的vue.config.js（需自行创建）文件，找到dev节点，添加以下内容

  ```javascript
  proxyTable: {
    '/api': {
      target: 'http://www.abc.com/api/',  //目标接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/api': ''   //重写接口
      }
    }
  }
  ```

  

## 三、loader

* webpack本身只支持对项目所依赖的js文件进行打包，要使之支持其他类型的依赖，如css、less、scss、背景图片、css字体等类型的文件，就要使用loader——加载器来对这些文件进行处理

* webpack 处理第三方文件类型的过程

  1. 发现这个 要处理的文件不是JS文件，然后就去 配置文件中，查找有没有对应的第三方 loader 规则
  2. 如果能找到对应的规则， 就会调用 对应的 loader 处理 这种文件类型；
  3. 在调用loader 的时候，是==从后往前==调用的；
  4. 当最后的一个 loader 调用完毕，会把 处理的结果，直接交给 webpack 进行 打包合并，最终输出到  bundle.js 中去

* 配置loader

  * webpack.config.js中的配置对象

    * module：对象，存放第三方loader规则

      * rules：数组，存放第三方loader规则

        * test：正则表达式，过滤需要使用该规则的文件，例如`/\.css$/`处理css文件

        * use：字符串/数组，当前规则所使用的loader集合，若只有一个loader，就是字符串

          * 所有loader都可以在其规则的use属性中进行配置，形式就是查询字符串，例如

            ```javascript
            { test: /\.(jpg|png|gif|jpeg|bmp)$/, use: 'url-loader?limit=5656'}
            ```

  * 示例

    ```javascript
    // 配置loader
    module: {
    	rules: [
    		{test: /\.css$/, use: ['style-loader', 'css-loader']}
    	]
    }
    ```

  * loader配置完成后，即可在入口文件及其依赖中导入响应的文件

    ```javascript
    import './css/main.css';
    ```

### 1. 处理css文件

* ==注意==：由于css-loader和style-loader的处理过程（详见下方），会导致js代码运行后，样式才会被插入到style标签中，会出现闪屏现象（结构和数据已经渲染，但样式还没加载）

#### 1.1 安装loader

* 处理css文件需要两个loader
  * style-loader@2.0.0：创建style标签，将js中的样式资源插入进行，添加到head中生效 
  * css-loader@5.0.1：将css文件变成commonjs模块加载js中，里面内容是样式字符串 
* 可以一次性安装
  
* `cnpm i style-loader css-loader -D`
  
* 配置：在webpack.config.js的配置对象中的module属性的rules数组中加入以下规则即可

  ```javascript
  {test: /\.css$/, use: ['style-loader', 'css-loader']}
  ```

#### 1.2 CSS模块化

* CSS模块化，是通过webpack的css-loader实现的、
* 同样适用于less和scss，只需修改css-loader的配置即可
* 一般我们并不把对css-loader设置模块化，而是对less或scss设置模块化
  * 因为，我们开发时可能会使用第三方组件库，他们的样式文件一般是打包好的css，如果对css启用模块化，就会导致第三方库的样式失效
  * 只要我们自己的样式使用less或scss，即可保证我们自己的css是模块化的

##### (1) 基本使用

1. 在webpack配置中，对css-loader添加配置如下参数，开启css模块化

   ```
   {
     test: /\.css$/,
     use: [
       'style-loader',
       { 
         loader: 'css-loader',
         options: {
           modules: {
             localIdentName: '[name]__[local]--[hash:base64:5]'
           }
         }
       }
     ]
   }
   ```

   * modules：开启css模块化编译，使用import导入css文件会得到一个js对象（要接收一下）
     * 不需要自定义名称时，可以把modules直接设置为true
   * localIdentName：自定义局部样式的类名，==若不使用，则使用一串长hash值==
     * name：css文件的文件名（不带后缀名）
     * local：css文件中原本的类名
     * hash：取指定位数的hash值

2. 在需要的js或jsx文件中导入

   `import localStyle from 'path/style.css'`

   * localStyle是一个js对象，由css-loader在编译过程中提供
   * 此对象的属性：就是相应的css源文件中的类名（hash之前的类名）
   * 此对象的属性值：一段经过编码的长字符串，作为原类名的替代（保证其唯一性）

3. 在jsx中使用`<div className={localStyle.原类名}></div>`即可

   * ==在编译后的css文件 和 使用类名的地方，都使用了经过处理的具有唯一性的类名，这就是css模块化（作用域）的本质==

##### (2) 模块中的全局样式

* `:global(.className)`：把其内部的css类样式作为全局样式（就是不对类名进行处理，使其保留原样）

  * :global 选择器：可把选择器作为全局样式

  ```
  :global(.title) {	/* 此title编译后还是title，只要导入，全局生效 */
  	color: green;
  }
  .title {	/* 此title编译后会被处理，完全变成另一个名字，与上面的title毫无关系 */
  	color: red;
  }
  ```

* 对于局部的类名 / 选择器，也可使用`:local(.className)` 或 `:local .className p`

  * 复合选择器的中的类名，编译后会自动与其他使用同类名的类名保持一致
  * 一般省略local即可

* 使用css-loader模块化的类名，最好使用驼峰命名，因为它会被暴露到js文件中作为对象的属性

### 2. 处理less文件

#### 2.1 安装loader

* 处理less文件需要3个loader

  * style-loader@2.0.0
  * css-loader@5.0.1
  * less-loader@7.1.0：依赖本地的less包
    * less@3.5.0：不需要加入rules中

* 安装

  * `cnpm i less less-loader -D`

* 配置：在webpack.config.js的配置对象中的module属性的rules数组中加入以下规则即可

  ```javascript
  {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']}
  ```

### 3. 处理scss文件

#### 3.1 安装loader

* 处理scss文件需要3个loader

  * style-loader@2.0.0
  * css-loader@5.0.1
  * sass-loader@10.1.0：依赖本地的三个包：
    * node-sass@5.0.0：不需要加入rules中
    * sass@1.29.0：不需要加入rules中
    * fibers@5.0.0：不需要加入rules中

* 安装

  * `cnpm i sass-loader node-sass sass fibers -D`

* 配置：在webpack.config.js的配置对象中的module属性的rules数组中加入以下规则即可

  ```javascript
  {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']}
  ```

### 4. 处理url(图片)

* css中的url(path)属性也是webpack不支持的，需要使用url-loader来处理

#### 4.1 安装loader

* 处理url()需要1个loader

  * url-loader@4.1.1：依赖本地的1个包
    * file-loader@6.2.0：不需要加入rules中

* 安装

  * `cnpm i url-loader file-loader -D`

* 基本配置：在webpack.config.js的配置对象中的module属性的rules数组中加入以下规则即可

  ```javascript
  { test: /\.(jpg|png|gif|jpeg|bmp)$/, use: 'url-loader'}
  ```

#### 4.2 配置(旧)

1. 禁止loader将图片转为base64编码：使用url-loader处理图片类型的依赖时，默认会把图片转为base64编码

   * 在参数中配置：`'url-loader?limit=一个较小的数字'`即可禁止loader将图片转为base64编码
     * 图片的字节大小  小于  limit的值时，仍然会使用base64编码
       * limit的作用就是设置一个  阈值，当图片小于这个阈值时，使用base64编码，否则不用base64编码
     * 禁用base64之后，图片资源被重命名，名称为一个hash值（这样的话，只要图片内容不是完全一样，即使文件名相同，经过webpack处理后也会有不同的文件名）
     * 处理后的图片文件放在  webpack-dev-server插件生成的服务器的根目录，图片在内存中

2. 使用`原名称-hash.ext`

   * 在参数中配置：`'url-loader?limit=20&name=[name]-[hash:8].[ext]'`
     * [name]：占位符，在此处使用图片的原名称
     * [hash:8]：占位符，在此处使用图片hash的前8位（总共32位），防止同名图片
       * 因为最终打包完成后的图片放在同一个目录，所以即使两张同名图片的原路径不同也会在打包完成后起冲突，所以hash很有必要
     * [ext]：占位符，在此处使用图片的原扩展名（后缀）
     * 最终生成的图片名称为：鲁迅-f395f746.png（假设原图为  鲁迅.png）

3. 总结：只有当图片的字节数小于10，才会进行base64编码处理，否则使用name指定的命名规则

   ```javascript
   { test: /\.jpg$/, use: 'url-loader?limit=10&name=[name]-[hash:8].[ext]' }
   ```

#### 4.3 配置(新)

```javascript
module.exports = {
  // ...
  // loader
  module: {
    rules: [
      {
        // 处理图片文件
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          // 小于此限制的图片将被base64编码
          limit: 10 * 1024,
          name: '[name]-[hash:8].[ext]',
          // 关闭esModule，使用commonjs Module，以兼容html-loader
          esModule: false,
          // 把所有图片文件都放在一个build/imgs文件夹中
          outputPath: 'imgs'
        }
      },
      {
        // 处理html中的img标签中的图片路径，把HTML中的图片资源作为webpack打包的依赖(交给url-loader)进行处理
        // 所以html文件中的图片打包后 会遵循url-loader的配置（编码阈值、name、目录）
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  }
}
```

### 5. 处理url(字体)

* 以使用bootstrap3字体为例

#### 5.1 使用bootstrap3字体

1. 处理url()需要1个loader

   * url-loader@4.1.1：依赖本地的1个包
     * file-loader@6.2.0：不需要加入rules中

2. 安装bootstrap@3.4.1，`cnpm i bootstrap@3.4.1 -S`，bootstrap4中的字体库是一个单独的包，用法见官方文档

   * 在main.js（入口文件中导入bootstrap.css）

     * 通过路径的形式导入node_modules中的包的文件，直接以包名称开头即可

     ```javascript
     // 导入bootstrap样式，url-loader就是为了处理这里面的字体路径
     import 'bootstrap/dist/css/bootstrap.css';
     ```

   * 在页面中使用bootstrap字体（class从官网字体图标页面复制即可）

     ```html
     <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
     ```

3. 基本配置：在webpack.config.js的配置对象中的module属性的rules数组中加入以下规则即可

   ```javascript
   { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }
   ```

#### 5.2 使用bootstrap4字体

* 针对非webpack项目，需要把下载好的bootstrap-icons库中的资源文件复制到项目的lib中，以相对路径引用
* 针对使用webpack（包括vue-cli）的项目，npm安装，导入即可

1. 安装：`cnpm i bootstrap-icons -S`

2. 在main.js中导入bootstrap-icons的css样式文件
  
   * `import 'bootstrap-icons/font/bootstrap-icons.css'`
   
3. 在需要的地方放置bootstrap4官网提供的标签即可
  
   * `<i class="bi-alarm"></i>`
   
4. 要重置字体的样式，在控制台找到字体样式，伪元素选择器before，把它整体复制到项目中，保留需要的，注意权重

   * 对齐问题很麻烦，有些图标使用svg标签，直接就解决了对齐问题

   * 有些使用svg 和 i 都需要再调整

     * 这种就直接使用 i

     * 调整 i 里面的伪元素 before的 `vertical-align` 和 `line-height`

       ```
       [class^="bi-"]::before, [class*=" bi-"]::before {
         font-weight: 600!important;
         line-height: 18px;
       }
       ```

#### 5.3 使用阿里图标库

##### 1）vue-cli

1. 打开阿里矢量图标库，选择想要的图标，加入购物车，下载代码

2. 把解压后得到的文件中的 5个字体文件 放入项目的font目录下（vue-cli项目的public/font下）

3. 把iconfont.css（定义字体的css文件）放到项目的css目录下（vue-cli项目的public/css下）

4. 在index.html中引入iconfont.css文件（注意路径，使用相对路径）

5. 修改iconfont.css文件中字体定义代码中的路径，改为iconfont.css 到字体文件的相对路径

6. 使用图标吧：xxx是iconfont.css文件中相应字体的类名，字体放在before伪元素中

   ```
   <span class="iconfont icon-xxx"></span>
   ```

7. 更多使用详情可参考下载的代码中的示例

##### 2）只有webpack

###### 2-1 main.js导入css

1. 记得装包'url-loader'  'file-loader'
2. 为字体文件添加loader规则
   * 注意：url-loader的配置是共享的，其他规则对url-loader的limit进行了限制（例如处理图片），那么对字体也会生效
   * name：字段中指定一个路径，打包好的字体文件就会放入指定的路径下，且使用字体文件的 css文件也会自动修改为 带新路径
   * outputPath：指定打包完成后的文件路径，可以把一类文件统一放在一个目录下

```javascript
{
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  loader: 'url-loader', // 或'file-loader'
  options: {
      name: 'font/[name]-[hash:8].[ext]',
  }
}
// 或
{ // 可用于打包其他资源（包括字体），即所有不需要webpack做任何处理的资源
  exclude: /\.(css|less|html|js)$/, // 或test: /\.(eot|svg|ttf|woff|woff2)$/
  loader: 'file-loader',
  options: {
      name: 'font/[name]-[hash:8].[ext]',
      // 指定打包完成后的文件路径，可以把一类文件统一放在一个目录下
      outputPath: 'font'
  }
}
```

3. 在main.js中导入使用了字体的css文件

### 6. ES6高级语法的处理

* webpack默认只能处理一部分ES6及以上的语法新特性，但有一些它处理不了（例如class的静态属性），就要借助babel（第三方loader）来处理了

  ```javascript
  class Dog {
    constructor(name, age) {
      this.name = name
      this.age = age
    }
    wangwang() {
      console.log(this.name + '汪汪')
    }
    static info = '狗'	// 这一句webpack就处理不了，需要babel
  }
  
  let mydog = new Dog('小花', 2);
  mydog.wangwang();
  console.log(mydog.age)
  console.log(Dog.info)
  ```

* 第三方loader将高级语法转换为低级语法后，再交给webpack打包

* 此笔记源于[babel-loader](https://www.cnblogs.com/QianDingwei/p/10800795.html)

#### 6.1 安装 包 babel@8

* 所有babel v8的包，都在在node-modules目录下有个叫“@babel”的目录下保存

* 使用babel v8需要的包如下：
  
  * ==注意==：以@开头的包，使用npm安装的时候，需要用单引号'@babel/core@7'把包名包裹起来,
  
  ```
  "@babel/core": "^7.12.9",
  "@babel/plugin-proposal-class-properties": "^7.12.1",
  "@babel/plugin-transform-runtime": "^7.12.1",
  "@babel/preset-env": "^7.12.7",
  "@babel/runtime": "^7.12.5",
  "babel-loader": "^8.2.2",
  ```
  
* 安装命令：

  * `cnpm i '@babel/core@7' -D`
    
    * 作用：babel核心包,babel-loader的核心依赖
    
  * `cnpm i '@babel/plugin-proposal-class-properties@7' -D`
    
    * 作用：用来解析类的属性的。
    
  * `cnpm i '@babel/plugin-transform-runtime@7' -D`
  
  * `cnpm i '@babel/runtime@7' -D`
    
    * 上面2个的作用：babel 编译时只转换语法，几乎可以编译所有时新的 JavaScript 语法，但并不会转化BOM（浏览器）里面不兼容的API。比如 Promise,Set,Symbol,Array.from,async 等等的一些API。这2个包就是来搞定这些api的。
    
  * `cnpm i '@babel/preset-env@7' -D`
    
    * 作用：ES语法分析包
    
  * `cnpm i babel-loader@8 -D`
    
    * 作用：加载器
    
    ```
    cnpm i '@babel/core@7' '@babel/plugin-proposal-class-properties@7' '@babel/plugin-transform-runtime@7' '@babel/runtime@7' '@babel/preset-env@7' babel-loader@8 -D 
    ```


#### 6.2 配置webpack.config.js

* 打开 webpack 的配置文件，在 module 节点下的 rules 数组中，添加一个 新的 匹配规则：

  * exclude：是不包含的意思，即排除node_modules目录中的js文件

  ```javascript
  { test:/.js$/, use: 'babel-loader', exclude:/node_modules/ }
  ```

* 排除node_modules的原因：

  1. ==慢==，如果 不排除 node_modules， 则Babel 会把 node_modules 中所有的 第三方 JS 文件，都打包编译，这样，会非常消耗CPU，同时，打包速度非常慢；
  2. 即使Babel 把 所有 node_modules 中的JS转换完毕了，但是，项目也无法正常运行！

#### 6.3 配置.babelrc

1. 在项目的 根目录中，新建一个 叫做 .babelrc 的Babel 配置文件
   * 这个配置文件，属于JSON格式
   * 所以，在写 .babelrc 配置的时候，必须符合JSON语法规范： 不能写注释，字符串必须用双引号

2. 在 .babelrc 写如下的配置： 

   * preset——预设（的语法），即babel转换所使用的高级语法
   * plugins——插件，即babel转换要使用的插件

   ```json
   {
     "presets": ["@babel/preset-env"],
     "plugins": ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties"]
   }
   ```

#### 6.4 移除严格模式

* 方法1：安装插件`cnpm i babel-plugin-transform-remove-strict-mode -D`

  * 在.babelrc中加入以下内容

  * 新版babel中==不管用==

    ```
    // .babelrc
    {
      "plugins": ["transform-remove-strict-mode"]
    }
    ```

* 方法2：把使用了严格模式不允许的语法的js文件忽略（好用）

  * 在.babelrc中加入以下内容，"ignore"与"plugins"平级

    ```
    // 注意路径，刚开始就是路径搞错了
    "ignore": [
      "./src/lib/js/mui.js",
      "./src/lib/js/mui.min.js"
    ]
    ```

### 7. 处理.vue文件

* webpack不能处理.vue文件的依赖，需要安装loader

#### 7.1 安装loader

1. 处理.vue 文件需要1个loader：

   * vue-loader@15.9.5：内部需要依赖1个包：
     * vue-template-compiler@2.6.12：不必加入loader规则中

2. 安装

   * `cnpm i vue-loader vue-template-compiler -D`

3. 配置：在webpack.config.js的配置对象中的module属性的rules数组中加入以下规则即可

   ```javascript
   {test: /\.vue$/, use: 'vue-loader'}
   ```
   
   * ==vue-loader@15+需要在webpack.config.js中导入插件==，坑啊
   
     ```
     const VueLoaderPlugin = require('vue-loader/lib/plugin');
     var config = {
     	// ...
     	plugins: [
     		// ...
     		new VueLoaderPlugin()
     	]
     }
     ```

## 四、webpack和vue结合

### 1. vue.runtime.common.js

* 在npm下载的vue包，默认的入口文件是：'dist/vue.runtime.common.js'
* vue.runtime.common.js：runtime-only方式构建的vue，功能不全

#### 1.1 选择vue入口文件

* 由于vue.runtime.common.js功能不全，如果想使用完整的vue，需要做一些处理
* 如果使用vue.js，则用法和网页中完全一样

1. 直接修改vue包的package.json文件中的main属性，不推荐

   ```json
   "main": "dist/vue.js"
   ```

2. 导入vue包时，通过路径指定要使用的vue文件

   ```javascript
   import Vue from 'vue/dist/vue.js'
   ```

3. 在webpack.config.js中配置  指定的包  导入时的路径

   ```javascript
   var config = {
   	entry: path,
   	output: {},
   	// ...
   	resolve: {
   		alias: {
   			// vue$指定导入包的名称以vue结尾，针对这样的包，就去'vue/dist/vue.js'寻找
   			"vue$": 'vue/dist/vue.js'
   		}
   	}
   }
   ```

#### 1.2 runtime-only方式使用vue组件

* runtime-only方式的vue（vue.runtime.common.js）没有提供使用components方式创建组件
* runtime-only方式推荐使用  .vue文件来定义组件的模板，通过render方式创建组件

webpack中使用runtime-only方式创建vue组件：

1. 安装vue的包：`cnpm i vue -S`

2. 安装并配置处理  .vue文件的[loader](###7. 处理.vue文件)

   * 注意vue-loader@15+版本需要配置插件，否则会报错

3. 使用.vue文件定义  vue模板，模板由3部分组成

   * `<template>`：组件的html结构
   * `<script>`：组件的业务代码
   * `<style>`：组件的样式代码

   ```html
   <template>
   </template>
   <script>
   </script>
   <style>
   </style>
   ```

4. 在html页面中放一个容器

   ```html
   <div id="app"></div>
   ```

5. 在main.js中导入  vue模块

6. 在main.js 中导入 .vue模板文件，得到一个模板对象

7. 在main.js 中创建vue实例，使用render方法来渲染组件

   ```javascript
   import Vue from 'vue'
   import temp from './temp.vue'
   var vm = new Vue({
   	el: '#app',
   	data: {},
   	// ...
   	render: ce => ce(temp)
   })
   ```

### 2. .vue文件（组件）

* .vue文件用于定义一个vue组件，作用类似于  vue模板对象
* 相当于把vue组件的定义抽离成了独立的文件，更符合模块化的思想
* .vue文件的内容  由3部分  组成
  * `<template>`：组件的html结构（组件的view层），可以使用vue指令
    * html结构只能有一个根元素
  * `<script>`：组件的业务代码
  * `<style>`：组件的样式代码

#### 2.1 js代码

* 直接通过export default 将组件的配置对象导出
* 配置对象
  * data：必须是一个方法，必须返回一个对象（字面量），返回的对象就是当前组件的  数据（组件的model层）
  * methods：定义组件的方法
  * ...
* 导入此组件时，可以得到一个  经过vue-loader处理过的  组件模板对象，作用类似于使用component方式定义组件时的配置对象

#### 2.2 style代码

* style标签中可以指定样式语言和作用域

  * 若未某元素加了样式，但没有应用，在浏览器检查元素，样式没有出现（连被删除线划去的都没有），一般是作用域的问题，去掉scoped即可，此问题常见于为第三方组件设置样式时

* 指定语言：通过lang属性来设置语言，值可以是css（默认）、less、scss

* 作用域：默认style中的样式的作用域是全局作用域

  * 可以添加scoped属性将其变为局部作用域，这样一个.vue组件中的样式只作用于当前组件，不会影响其他组件
  
* scoped原理：使用了scoped之后，vue会把本组件中的html标签加上一个自定义属性（唯一），而本组件的style样式会被编译为  原选择器[自定义属性]  的交集选择器，这样本组件的选择器就只能在本组件的html结构中生效了
  
  ```html
  <style lang="less" scoped>
  
  </style>
  ```

#### 2.3 使用.vue文件

1. 前提：安装vue包，安装处理.vue文件的loader

2. 导入.vue文件（模块）

   ```javascript
   import myCom from './mycom.vue'
   ```

3. 使用组件

   * 或：使用render方法渲染组件
     * 这种方式会把  父组件的html标签替换为子组件的html结构
   * 或：作为路由的目标组件

#### 2.4 单文件组件嵌套

* 在==runtime-only==方式下，Vue实例（指向#app）的组件不能使用components属性来创建并使用子组件

  ```javascript
  import Vue from 'vue';
  // 导入单文件组件（子组件）
  import login from './login.vue'
  // vue实例
  var vm = new Vue({
    el: '#app',
    data: {},
    // 这样创建组件，vue会报错
    components: {
    	login
    }
  });
  ```

* 但可以在单文件组件中使用components属性来创建并使用子组件

  ```vue
  <template>
    <div>
      <h3>这是temp模板</h3>
      <!-- 使用子组件 -->
      <login></login>
    </div>
  </template>
  
  <script>
  // 1.导入子组件
  import login from './childcom/login.vue'
  import register from './childcom/register.vue'
  
  export default {
    data: function () {
      return {};
    },
    methods: {},
    // 创建子组件
    components: {
      login,
      register
    }
  };
  </script>
  
  <style lang="less" scoped>
  </style>
  ```

### 3. webpack与vue-router（路由）

#### 3.1 安装vue-router

1. `cnpm i vue-router -S` ：vue-router@3.4.9 可用

2. 使用

   ```javascript
   import Vue from 'vue'
   import VueRouter from 'vue-router'
   
   Vue.use(VueRouter)
   ```

#### 3.2 使用vue-router

1. 导入包

   ```javascript
   import Vue from 'vue'
   import VueRouter from 'vue-router'
   
   Vue.use(VueRouter)
   ```

2. 导入路由要使用的组件

   ```javascript
   // 导入路由使用的组件
   import account from './main/account.vue'
   import goods from './main/goods.vue'
   ```

3. 创建路由对象

   ```javascript
   // 创建路由对象
   var router = new VueRouter({
     routes: [
       { path: '/account', component: account },
       { path: '/goods', component: goods }
     ]
   })
   ```

4. 挂载路由模块到指定组件

   ```javascript
   import temp from './temp.vue';
   var vm = new Vue({
     el: '#app',
     render: ce => ce(temp),
     // 挂载路由模块
     router
   });
   ```

5. 设置路由链接  和  路由展示：在路由模块所挂载到的组件（本例就是temp）中使用

   * router-link
   * router-view

#### 3.3 路由嵌套

1. 配置子路由规则：在父路由匹配规则中，添加children属性（数组）

   ```javascript
   routes: [
     {
       path: '/account',
       component: account,
       children: [
         { path: 'login', component: login },
         { path: 'register', component: register }
       ]
     },
     { path: '/goods', component: goods }
   ]
   ```

2. 导入子路由规则指向的目标组件

   * 当然要准备好login.vue和register.vue

   ```javascript
   // 导入子路由使用的组件
   import login from './childcom/login.vue'
   import register from './childcom/register.vue'
   ```

3. 在父路由规则  所指向的  父组件（本例中的account.vue）中放置  router-view、router-link

#### 3.4 抽离router.js

* 将路由功能单独放入一个模块router.js

1. 在main.js中导入router.js

   * 由于main.js中需要手动安装VueRouter，所以也需要导入vue-router

   ```javascript
   // 导入路由包vue-router
   import VueRouter from 'vue-router'
   // 挂载路由构造函数，表明使用VueRouter处理vue组件中的路由
   Vue.use(VueRouter)
   import router from './router.js'
   ```

2. 在router.js中

   1. 导入路由vue-router包
   2. 导入路由规则中所使用的vue组件
   3. 创建路由对象
   4. 导出路由对象

   ```javascript
   // 1.导入vue-router
   import VueRouter from 'vue-router'
   
   // 2.导入路由使用的组件
   import account from './main/account.vue'
   import goods from './main/goods.vue'
   // 导入子路由使用的组件
   import login from './childcom/login.vue'
   import register from './childcom/register.vue'
   
   // 3.创建路由对象
   var router = new VueRouter({
     routes: [
       {
         path: '/account',
         component: account,
         children: [
           { path: 'login', component: login },
           { path: 'register', component: register }
         ]
       },
       { path: '/goods', component: goods }
     ]
   })
   
   // 4.将路由对象导出
   export default router
   ```

### 4. 真机调试

#### 4.1 配置

* 前提：存放后台数据的服务器，中的资源的url地址，统一使用电脑的IP地址，不要使用localhost作为域名

1. 手机和电脑在同一个wifi环境中
2. 在项目的package.json文件中的dev脚本中，添加一个参数：--host 电脑的局域网ip
   * `--host 192.168.0.106`
3. 重新运行 npm run dev
   * 会发现，浏览器中打开的项目页面，主机名变成了本机ip地址
   * 可以使用`http://192.168.0.106:3000`在手机上访问项目了

## 五、webpack发布阶段



### 1、webpack.publish.config.js

1. 在实际开发中，一般会有两套项目方案：

 + 一套是开发期间的项目，包含了测试文件、测试数据、开发工具、测试工具等相关配置，有利于项目的开发和测试，但是这些文件仅用于开发，发布项目时候需要剔除；
 + 另一套是部署期间的项目，剔除了那些客户用不到的测试数据测试工具和文件，比较纯净，减少了项目发布后的体积，有利于安装和部署！

2. 为了满足我们的发布策略，需要新建一个配置文件，命名为`webpack.publish.config.js`，将`webpack.config.js`的配置拷贝过去，剔除一些开发配置项即可：

 + 将`devServer`节点删掉：

 ```
 devServer: {
        hot: true,
        open: true,
        port: 4321
    }
 ```

 + 将`plugins`节点下的热更新插件删掉：

 ```
 new webpack.HotModuleReplacementPlugin()
 ```

* 在`package.json`中的script节点下新增`dev`命令，通过`--config`指定webpack启动时要读取的配置文件：
  * 使用npm run pub进行生产环境打包

```
"pub": "webpack --config webpack.publish.config.js"
```

### 2、把图片资源放入单独的目录

* 修改`url-loader`，将图片放入统一的images文件夹之下：

  ```
  { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=43959&name=images/[name].[ext]' }
  ```

* 或者使用`img-`前缀加上`7位的hash名称`：

  ```
  { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=43959&name=images/img-[hash:7].[ext]' }
  ```

### 3、每次重新构建删除dist目录

1. 运行`cnpm i clean-webpack-plugin --save-dev`
2. 在头部引入这个插件：

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
```

3. 在`plugins`节点下使用这个插件：

```
new CleanWebpackPlugin()
```

### 4、分离第三方js包

1. 把js文件放入单独的文件夹：

```
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'js/bundle.js'
  }
```

2. 使用all，所有的依赖都会打包成单独的文件
   * optimization是配置对象根节点中的一个属性（与entry同级）

```
optimization: {
  splitChunks: {
    chunks: 'all'
  }
}
```

### 5、优化压缩JS（==废除==）

1. 在plugins数组中添加：

```
new webpack.DefinePlugin({ // 设置为产品上线环境，进一步压缩JS代码
    'process.env.NODE_ENV': '"production"'
})
```

2. 安装压缩js插件：`cnpm install uglifyjs-webpack-plugin --save-dev` ==此插件已内置，只要production模式会自动使用==

3. 导入：`const UglifyJsPlugin = require('uglifyjs-webpack-plugin');`

4. 在optimization中添加：

```
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,	// 移除警告
          output: {
            comments: false,	// 不要注释
          }
        }
      })
    ]
  }
```

### 6、优化压缩HTML文件

在`plugins`节点下的`htmlWebpackPlugin`插件中，添加`minify`子节点：

```
minify:{// 压缩HTML代码
    collapseWhitespace:true, // 合并空白字符
    removeComments:true, // 移除注释
    removeAttributeQuotes:true // 移除属性上的引号
}
```

### 7、抽取CSS文件

1. 运行`npm install --save-dev mini-css-extract-plugin`安装抽取CSS文件的插件。
2. 在配置文件中导入插件：

```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
```

3. 修改CSS和Less的loader如下：

   * publicPath：用于调整css文件内部的 路径，

     例如在 [二、把图片资源放入单独的目录]() 中设置url中的图片打包后放在images目录中（images/tupian.jpg），而css文件放在（css/style.css）中，css文件内部通过（images/tupian.jpg）是找不到图片资源的，使用publicPath把图片路径加上（../images/tupian.jpg）就可以找到图片资源了

```
	  {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          'css-loader',
          'less-loader',
        ]
      }
```

4. 在plugins节点下新增插件：

```
	new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    })
```

### 8. 压缩抽取出来的CSS文件

1. 运行`cnpm i optimize-css-assets-webpack-plugin -D`安装插件到开发依赖。
2. 在配置文件头部导入插件：

```
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
```

3. 在plugins节点下新增插件：

```
// 压缩css
new OptimizeCssAssetsWebpackPlugin()
```



# Webpack入门2.0

## 一、基本开发环境配置

### 1. 版本组合

```json
"devDependencies": {
  "@babel/core": "^7.13.1",
  "@babel/preset-env": "^7.13.0",
  "babel-loader": "^8.2.2",
  "core-js": "^3.9.0",
  "css-loader": "^5.0.2",
  "file-loader": "^6.2.0",
  "html-loader": "^1.0.0",
  "html-webpack-plugin": "^4.5.0",
  "less": "^3.5.0",
  "less-loader": "^7.1.0",
  "style-loader": "^2.0.0",
  "url-loader": "^4.1.1",
  "webpack": "^4.0.0",
  "webpack-cli": "^3.3.12",
  "webpack-dev-server": "^3.11.0"
}
```

### 2. webpack.config.js

```javascript
/* 
  开发环境配置：
    1. css
    2. less
    3. 图片（url、html）
    4. 字体
    5. js（babel）
    6. devServer
    7. source-map
*/

const {resolve} = require('path')
// 处理HTML文件的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['./src/js/main.js', './src/index.html'],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // less
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      // 图片
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: '[name]_[hash:8].[ext]',
          outputPath: 'imgs',
          esModule: false
        }
      },
      // html中的图片
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      // 字体
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name]_[hash:8].[ext]',
          outputPath: 'font'
        }
      },
      // js
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {
                  version: 3
                },
                targets: {
                  chrome: '60',
                  firefox: '30',
                  ie: '9',
                  safari: '10',
                  edge: '20'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    contentBase: 'dist',
    port: 3000,
    open: true,
    hot: true,
    compress: true
  },
  devtool: 'eval-source-map'
}
```

### 3. 开发配置打包

#### 3.1 命令

1. webpack：直接读取webpack.config.js进行打包
   * 需要全局安装webpack，否则命令无法运行（项目本地当然也需要webpack）
2. npx webpack-dev-server：执行webpack-dev-server命令，启动开发服务器
   * npx的作用是：在当前路径下寻找相关命令，如果没找到，则临时安装相关的包，然后执行；如果找到了，则运行包

## 二、基本生产环境配置

### 1. css的处理

#### 1.1 css提取

* 提取css文件：使用插件mini-css-extract-plugin@1.3.8

     1 使用MiniCssExtractPlugin.loader代替style-loader

     * 配置publicPath为'../'，原因：
       * css中的url中最后填入的路径是：资源（图片、字体）相对于dist目录的路径，例如'imgs/a.jpg'
       * 如果没有提取css，则css在js文件中，到了浏览器中，这些样式被插入到了html文件中，那么'imgs/a.jpg'就是dist根目录中的imgs，自然不会有错（因为index.html一般就放在根目录）
       * 如果提取了css文单独的文件，并将其放入dist/css目录中，css文件内部资源的url依然是'imgs/a.jpg'，这个路径是相对于dist/css目录的，自然就找不到图片资源了，所以要给'imgs/a.jpg'加上'../'，这样就能找到了

     2 创建插件对象：new MiniCssExtractPlugin({ filename: "css/[name].css" })（所有在main中导入的css会被放入1个css文件中）

* 实例：

```js
/*
  生产环境配置
  css：提取css文件
*/
// 其他配置略...
// 抽取css文件的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  module: {
    rules: [
      // 1.处理css
      {
        test: /\.css$/,
        use: [
          // 把css文件从js文件中抽取出来的loader
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // 使用mini-css-extract-plugin把css文件抽取出来
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ]
}
```

#### 1.2 css兼容性

* 对css进行兼容性处理：使用postcss-loader postcss-preset-env

     1 在css-loader之前，使用postcss-loader，并配置

     2 在package.json中配置 "browserslist" 过滤css兼容性需要支持的浏览器（这个规则是所有postcss的插件共享的）

     3 如果要在开发模式下进行css兼容性处理，需要手动修改node进程的环境变量为开发者模式

* 实例：要深入了解，直接去npm上看文档（别去webpack官网）

```json
// package.json
"browserslist": {
  // 开发环境进行的兼容性处理，需要显式设置 process.env.NODE_ENV = 'development'
  "development": [
    "last 2 version",
    "not dead",
    ">0.2%"
  ],
  // 生产环境配置，默认(不设置process.env.NODE_ENV)就是执行这个配置
  "production": [
    "defaults",
    "Android 4.1",
    "iOS 7.1",
    "Chrome>31",
    "ff>31",
    "ie>=8",
    "last 2 versions",
    ">0.2%"
  ]
}
```

```js
/*
  生产环境配置
  css：对css进行兼容性处理：使用postcss-loader postcss-preset-env
*/
// 其他配置略...
// 抽取css文件的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// process.env.NODE_ENV = 'development'

module.exports = {
  mode: 'production',
  module: {
    rules: [
      // 1.处理css
      {
        test: /\.css$/,
        use: [
          // 把css文件从js文件中抽取出来的loader
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          // 使用postcss对css兼容性进行处理（其实就是把指定的浏览器使用的css样式都加1遍）
          {
            loader: 'postcss-loader',
            // webpack官网的配置都是有问题的（那是postcss-loader@3.0的配置方式，没有postcssOptions）
            // 从postcss-loader@4.0开始多了1层postcssOptions
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // postcss-preset-env options
                    }
                  ],
                ],
              },
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 使用mini-css-extract-plugin把css文件抽取出来
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ]
}
```

#### 1.3 压缩css

1. 运行`cnpm i optimize-css-assets-webpack-plugin -D`安装插件到开发依赖。
2. 在配置文件头部导入插件：

```
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
```

3. 在plugins节点下新增插件：

```
// 压缩css
new OptimizeCssAssetsWebpackPlugin()
```

### 2. js的处理

#### 2.1 js语法检查

* 使用eslint进行语法检查：eslint-loader@4.0.2 eslint@7.20.0

* 语法风格库airbnb：eslint-config-airbnb-base@14.2.1 eslint-plugin-import@2.22.1 eslint@7.20.0

* 对于不想要语法检查的代码（例如console，airbnb会报警告）

  * 使用以下方式即可解决

    ```js
    // eslint-disable-next-line
    console.log(add(1, 3));
    ```

* 实例：

```json
// package.json
// 使用"airbnb-base"作为语法风格
"eslintConfig": {
    "extends": "airbnb-base"
}
```

```js


module.exports = {
  mode: 'production',
  module: {
    rules: [
      // 处理js -> 语法检查 eslint-loader eslint
      // 语法风格库airbnb：eslint-config-airbnb-base eslint-plugin-import
      {
        enforce: 'pre', // 保证语法检查比其他js loader先执行
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      }
    ]
  },
  plugins: [
  ]
}
```

#### 2.2 js兼容性处理

* *这里可以代替 上文 三、loader  6.ES6高级语法的处理*
* 使用babel-loader进行js兼容性处理：babel-loader@8.2.2 @babel/core@7.13.1（基本）
* 编译规则：
  1. 基本js兼容性处理： @babel/preset-env@7.13.0
     问题：只能转换基本语法，如promise高级语法不能转换
  2. 需要做兼容性处理的就做：按需加载  core-js@3.9.0
     * targets支持的浏览器
       - Chrome 26+
       - Firefox 4+
       - Safari 5+
       - Opera 12+
       - Internet Explorer 8+ (sure, IE8 with ES3 limitations; IE7- also should work, but no longer tested)
       - Edge
       - Android Browser 2.3+
       - iOS Safari 5.1+
       - PhantomJS 1.9+
       - NodeJS 0.8+
  3. （了解）全部js兼容性处理--> @babel/polyfill（在main.js中导入 `import '@babel/polyfill'`）
     问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了

* 实例：

```js
module.exports = {
  module: {
    rules: [
      // js兼容性处理
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader', // babel-loader @babel/core
        options: {
          // 预设，指定进行兼容性处理的插件（语法规则）
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载(即按需进行兼容性处理)
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                // 设置要兼容的浏览器及其版本
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
  ]
}
```

#### 2.3 压缩js

* 只需将mode设置为'production'

#### 2.4 压缩html

```js
plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    minify: {
      collapseWhitespace: true, // 移除换行、多余的空格
      removeComments: true, // 移除注释
      removeAttributeQuotes:true // 移除标签的属性值的引号
    }
  })
]
```

### 3. 生产环境基本配置

* 此配置不支持PWA、dll优化

#### 3.1 package.json

```json
{
  "name": "09-wp-practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.13.1",
    "@babel/preset-env": "^7.13.0",
    "@types/babel__core": "^7.1.12",	// workbox-webpack-plugin依赖
    "add-asset-html-webpack-plugin": "^3.2.0",	// dll
    "babel-loader": "^8.2.2",
    "core-js": "^3.9.0",
    "css-loader": "^5.0.2",
    "eslint": "^7.20.0",
    "eslint-config-airbnb-base": "^14.2.1",
    "eslint-loader": "^4.0.2",
    "eslint-plugin-import": "^2.22.1",
    "file-loader": "^6.2.0",
    "html-loader": "^1.0.0",
    "html-webpack-plugin": "^4.5.0",
    "less": "^3.5.0",
    "less-loader": "^7.1.0",
    "mini-css-extract-plugin": "^1.3.8",
    "optimize-css-assets-webpack-plugin": "^5.0.4",
    "postcss-loader": "^4.2.0",
    "postcss-preset-env": "^6.7.0",
    "precss": "^4.0.0",
    "style-loader": "^2.0.0",
    "thread-loader": "^3.0.1",
    "url-loader": "^4.1.1",
    "webpack": "^4.0.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0",
    "workbox-webpack-plugin": "^6.1.1"	// PWA
  },
  "dependencies": {	// 仅用于测试webpack配置
    "express": "^4.17.1",
    "jquery": "^3.5.1",
    "mint-ui": "^2.2.13",
    "vue": "^2.6.12"
  },
  "browserslist": {
    "development": [
      "last 2 version",
      "not dead",
      ">0.2%"
    ],
    "production": [	// 仅用于测试webpack配置，实际根据项目要求
      "defaults",
      "Android 4.1",
      "iOS 7.1",
      "Chrome>31",
      "ff>31",
      "ie>=8",
      "last 2 versions",
      ">0.2%"
    ]
  },
  "eslintConfig": {
    "extends": "airbnb-base",
    "rules": {
      "global-require": false
    }
  }
}
```

#### 3.2 webpack.config.js

* 此配置不支持PWA、dll优化

```js
/* 
  生产环境配置：
    1. css
      提取、兼容、压缩
    2. less
      提取、兼容、压缩
    3. 图片（url、html）
    4. 字体
    5. js（babel）
      语法检查 兼容 压缩
    6. html压缩
    7. source-map
    8. 打包速度优化
      oneOf ok
      babel 缓存 ok
      多进程打包（babel） ok
      externals ok
    9. 性能优化
      客户端缓存（contenthash，服务器开启） ok
      tree shaking（无需额外配置） ok
      第三方js包优化（单独打包） ok
      懒加载（不在这里配置，但需注意eslint） ok
*/
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 分离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js'
  },
  module: {
    rules: [
      // 语法检查
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        oneOf: [
          // css
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              },
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        'postcss-preset-env', /* {} */
                      ]
                    ]
                  }
                }
              }
            ]
          },
          // less
          {
            test: /\.less$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              },
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        'postcss-preset-env'/* {} */
                      ]
                    ]
                  }
                }
              },
              'less-loader'
            ]
          },
          // 图片
          {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[hash:10].[ext]',
              outputPath: 'imgs',
              esModule: false
            }
          },
          // html中的图片
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          // 字体
          {
            test: /\.(eot|ttf|svg|woff|woff2)$/,
            loader: 'url-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'font'
            }
          },
          // js兼容性
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              // 可选优化，多进程打包
              {
                loader: 'thread-loader',
                options: {
                  workers: 2
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        corejs: {
                          version: 3
                        },
                        targets: {
                          chrome: '60',
                          firefox: '60',
                          ie: '9',
                          safari: '10',
                          edge: '20'
                        }
                      }
                    ]
                  ],
                  cacheDirectory: true
                }
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
    // 分离css
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  devtool: 'source-map',
  // 可选优化，忽略指定的包，通过cdn补充（如使用dll，则不用此项）
  // externals: {
  //   vue: 'vue'
  // },
  // 可选优化，分离第三方包（如使用dll，则不用此项）
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
```

## 三、性能优化

性能优化分为：

1. 开发环境性能优化
   * 优化打包构建速度（dev）
     * HMR
   * 优化代码调试（dev）
     * source-map
2. 生产环境性能优化
   * 优化打包构建速度（-S s）
     * oneOf
     * babel缓存
     * 多进程打包（针对babel）
     * externals —— 忽略某些库，不参与打包（使用cdn，此技术与dll选一个即可）
     * dll —— 先对某些库打包输出，之后打包时通知webpack只需将dll输出的库文件引入即可
   * 优化代码运行的性能（-S p）
     * 缓存 —— 客户端缓存，需要服务器开启缓存功能，hash chunkhash contenthash
     * *tree shaking* —— 生产环境 import导入的js文件 自动优化（使用了内置的uglifyjs-webpack-plugin）
     * code split
     * 懒加载 / 预加载
     * pwa

### 1. HMR（dev）

* HMR是hot module replacement（热模块替换）

* 要开启HMR很简单，只需在devServer配置中加上`hot: true`即可

  * css的style-loader默认支持热模块替换，不用额外配置

  * js默认不支持热模块替换，可以通过监听模块变化来实现（入口js本身不可被监听）

    ```js
    // 入口main.js文件
    // 如果开启了HMR，则module对象上会有一个hot属性
    if (module.hot) {
      // 监听指定的js文件，如果它发生变化，则执行回调函数
      module.hot.accept('./js/a.js', () => {
        say()	// 当'./js/a.js'被修改后，会重新调用其中的say方法
      })
      // 监听更多js文件
    }
    ```

  * html文件只有1个，没必要进行热模块替换。且使用了HMR之后，html文件的变化不会再引起devServer热更新（解决办法，在webpack.config.js中的==entry中增加1个入口文件 即html文件==）

### 2. source-map（dev）

* source-map是webpack打包过程中创建的 源代码 --> 构建代码 之间的映射关系，方便在浏览器中调试时，查找错误位置

* 使用：在webpack.config.js的根节点（entry同级）添加devtool节点即可

  * 在浏览器开发者窗口，点击错误信息右侧的文件名，即可进入source窗口查看错误映射

  ```
  {
  	devtool: 'source-map'
  }
  ```

* 取值：`[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`

  * source-map：外部（就是生成独立的bundle.js.map文件）
    * 错误代码准确信息 和 源代码的错误位置
  * inline-source-map：内联（sourceMap信息直接放在了构建代码的下方）
    * 只生成1个内联source-map，会导致构建后的代码体积过大
    * 错误代码准确信息 和 源代码的错误位置
  * hidden-source-map：外部
    * 错误代码错误原因，但是没有错误位置
    * 不能追踪源代码错误，只能提示到构建后代码的错误位置
  * eval-source-map：内联（sourceMap信息放在了构建代码中的每一个eval函数中）
    * 每一个文件都生成对应的source-map,都在eval
    * 错误代码准确信息 和 源代码的错误位置
  * nosources-source-map：外部
    * 错误代码准确信息，但是没有任何源代码信息
  * cheap-source-map：外部
    * 错误代码准确信息 和 源代码的错误位置
    * 只能精确到行（而非精确到语句）
  * cheap-module-source-map：外部
    * 错误代码准确信息 和 源代码的错误位置（会对依赖包中的模块进行source map）
    * 只能精确到行（而非精确到语句）

* 内联 和 外部的区别

  * 内联的 构建后的代码体积更大
  * 内联的 构建速度更快

#### 2.1 开发环境

* 打包速度快
  * eval > inline > cheap > ...
  * eval-cheap-souce-map 最快，但只能精确到行
  * eval-source-map 次之，可以精确到语句
* 调试更加友好
  * source-map 最友好
  * cheap-module-souce-map 其次
  * cheap-souce-map 再次
* 综合以上两点：
  * eval-source-map 速度较快，最友好（vue-cli内置的就是这种）
  * eval-cheap-module-souce-map 速度更快，较友好

#### 2.2 生产环境

* 包体积较小：所以不能使用eval 和 inline
* 源代码要不要隐藏
  * nosources-source-map 全部陷藏（可以看到构建后的代码，但不会提示错误位置）
  * hidden-source-map 只隐藏源代码（不提示源文件），会提示构建后代码错误信息
* 调试要不要更友好
  * source-map
  * cheap-module-souce-map
* 综合以上两点：
  * 要完全隐藏代码信息（较不利于调试）：hidden-source-map
  * 最友好：source-map 不能隐藏源代码
  * 较友好：cheap-module-source-map 不能隐藏源代码

### 3. oneOf（-S s）

* 生产环境和开发环境都可以用
  * 对于1个文件，要去匹配loader，就会把所有loader的匹配规则都过1遍，但其实没有必要，只要第1次匹配到，就不用再向下匹配了
* 把loader都放在oneOf节点下，一个文件就只会匹配到1个loader，不会再向下匹配，提高打包速度
  * 缺点，如果1中文件要经过多个loader处理，则需要把多于的loader放到oneOf外面（保证oneOf中每种文件只有1个loader）
  * 例如 生产环境下的eslint-loader 和 babel-loader

```js
  module: {
    rules: [
      // eslint-loader 放在外面
      {
        oneOf: [
          {
            // css loader
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            // less loader
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
          },
          // babel-loader放里面
        ]
      }
    ]
  },
```

### 4. 缓存

#### 4.1 babel缓存（-S s）

* 优化生产环境 重复打包 构建速度

* 用法：在babel-loader的options中添加1条配置即可

  ```js
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: {
              version: 3
            },
            targets: {
              chrome: '60',
              firefox: '60',
              ie: '8',
              safari: '10',
              edge: '17'
            }
          }
        ]
      ],
      // 开启babel编译缓存，这样未改变的js模块将使用缓存，而不用再次被babel处理
      cacheDirectory: true
    }
  }
  ```

#### 4.2 资源缓存（-S p）

1. 服务器开启 静态资源缓存
2. 对打包输出的资源文件名使用hash标识，有3种hash
   * hash：webpack每次打包生成一个hash，所以js 和 css文件使用的hash是一样的（不行）
     * 图片，字体的hash与上述hash不同（就是contenthash）
   * chunkhash：每个chunk有一个独立的chunkhash，但是由于css文件是从js chunk中分离出来的，所以他俩还是一样
   * contenthash：对每一个输出文件，使用他们的内容生成1个hash，可以保证不同的文件使用不同的hash
3. 最终选择contenthash。这样，每次打包（更新资源），只有内容变化的资源hash值变化，浏览器刷新的时候，只有文件名变化的资源会重新请求

### 5. tree shaking（-S p）

* tree shaking会把项目中没有使用的代码去除

* 只要满足一下两个条件，就会自动使用tree shaking

  * **使用import语法（es6 module）导入的文件**
  * **构建环境设为 production**

* 注意：某些webpack版本中，会把css、@babel/polyfill等文件给去掉（把他们当做无 副作用的文件）

* 所以最好在package.json中加上以下字段

  * **"sideEffects"**：值为数组，或 布尔类型
    * false：代表可以把 无副作用 的文件都删除（有些webpack版本使用了这个作为默认值）
    * 数组：符合数组描述的文件，认为它有副作用（即使它没有）

  ```
  {
  	"sideEffects": ["*.css", "*.less"]
  }
  ```

### 6. code split（-S p）

#### 6.1 多入口（较少用）

* 可以为entry指定多个入口js文件，这样每个js文件都会有一个单独输出
  * 对于使用了import导入的js文件，将其作为一个单独的入口是多此一举（在其他入口中它也会被导入）
* 实例：

```js
  entry: {
    main: './src/main.js',
    a: './src/js/a.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js'
  },
```

#### 6.2 分离第三方包

* 使用webpack内置的optimization插件，这种方式只能把第三方包全部分离到1个chunk中，如要再细分，可以使用dll
* 实例：

```js
optimization: {
  splitChunks: {
    chunks: 'all'
  }
}
```

#### 6.3 分离js模块(同懒)

* import()函数介绍：异步导入1个js文件，返回的是1个promise实例，resolve方法的实参就是这个模块的Module对象
  * 当import方法被执行的时候，才去导入模块
  * 结合webpack，这种用法会把js文件单独打包成1个js文件，且不会被直接插入到html文件中，而是当import()被调用时，向DOM中插入1个script标签，去请求这个js文件（类似于jsonp）
* 实例：
  * 1、import被同步调用，所以页面加载完毕，就会执行并向服务器请求a.js，然后执行之
  * 2、import放在事件处理函数中，事件触发，才会执行import并向服务器请求a.js，然后执行之
    * 这就是懒加载了
  * 3、then、catch并非必须的，如果只是想加载a.js并执行，就不需要then、catch

```js
// main.js
import('./js/a')
  .then(({mul}) => {
    // eslint-disable-next-line
    console.log(mul(3,5))
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('导入失败')
  })
```

### 7. 懒加载和预加载（-S p）

1. 懒加载：模块导入通过import()进行，import放在事件处理函数中，事件触发，才会执行import并向服务器请求a.js，然后执行之

2. 预加载：prefetch，其他资源优先加载，其他资源加载完毕，才加载 设置了预加载的资源

   * 好处：可以减少页面加载时的并行请求数量，提高性能（预加载的资源稍后才开始加载）

   * 缺点：兼容性差，只有较新的桌面浏览器才支持

   * 过程：

     1、浏览器请求index.html

     2、把`<link rel="prefetch" as="script" href="js/test.dda127f5b8da9d440137.js">`插入到html文件中，使test.js作为预加载内容处理

     3、当页面其他资源加载完毕，创建1个script标签，加载预加载资源

* 实例：

  * 在import()中通过注释，设置打包的chunk名称、预加载

  * 注意事项：eslint会对非顶层作用域的import报错，导致懒加载无法使用，需要在eslint配置（package.json 或 .eslintrc.js）中添加规则

    ```json
      "eslintConfig": {
        "extends": "airbnb-base",
        "rules": {
          /*这里我也是醉了：eslint提示这个字段有3个值：0 == off；1 == warn；2 == error
          	然鹅，0并不管用，false反而管用（尽管会报警告）
          */
          "global-require": false
        }
      }
    ```

```js
// 懒加载和预加载
document.getElementById('btn').onclick = function () {
  // 当按钮被点击的时候再去加载模块
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./js/a').then(({mul}) => {
    // eslint-disable-next-line
    console.log(mul(3,5))
  })
}
```

### 8. PWA（-S p）

* Progressive Web App（渐进式web应用）：使用了PWA的网站，会把资源缓存到浏览器的serviceworker中，当网络中断，再次打开网站时，浏览器就会去serviceworker中读取缓存，使用户在没有网络的情况下，也可以访问网站
  * 1、要让网站使用serviceworker，就必须生成一个serviceworker配置文件
  * 2、必须在网页（js）中请求这个配置文件（'/service-worker.js'）并注册

#### 8.1 在wp中使用PWA

1. 使用插件，借助workbox生成serviceworker配置文件（默认会被放在项目根目录）

   * 需安装两个包：
     * `cnpm i @types/babel__core@^7.1.9 -D`（workbox-webpack-plugin的依赖）
     * `cnpm i workbox-webpack-plugin@6.1.1 -D`

2. 在项目入口文件（mian.js）中注册 serviceworker

3. 其他：

   * 在package中配置"eslintConfig" => "env" => "browser"为true，使eslint支持浏览器环境的全局变量，避免报错

     ```json
     {
     	"eslintConfig": {
     		"extends": "airbnb-base",
     		"env": {
       			"browser": true
     		}
       	},
     }
     ```

   * 项目必须运行在服务器中

* 实例：

```js
// webpack.config.js
// 生成serviceworker配置文件的插件
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
// 略...
plugins: [
  // 打包时生成serviceworker配置文件
  new WorkboxWebpackPlugin.GenerateSW({
    skipWaiting: true,
    clientsClaim: true
  })
]
```

```js
// main.js
// 注册serviceworker
// 需要处理兼容性问题，不支持就不使用
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('注册成功了~');
      })
      .catch(() => {
        console.log('注册失败~');
      });
  });
}
```

### 9. 多进程打包（-S s）

* 开启多个node进程，进行打包。需要loader：`cnpm i thread-loader -D`
* 可以在任意需要多进程打包的loader中使用thread-loader，这样当这个loader开始处理代码时，就会使用多进程
  * 一般用于babel，对于大型项目，这个语法转换最耗时
* 缺点：进程开启（约600ms）、进程之间通信 都需要耗时，所以如果本身打包时间就不是很长，最好不用，否则反而会更慢

```js
module.exports = {
  mode: 'production',
  module: {
    rules: [
      // 使用babel core-js对js进行兼容性处理
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // 多进程打包
          {
            loader: 'thread-loader',
            options: {
              workers: 2 // 进程数量
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: {
                      version: 3
                    },
                    targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '8',
                      safari: '10',
                      edge: '17'
                    }
                  }
                ]
              ],
              // 开启babel编译缓存，这样未改变的js模块将使用缓存，而不用再次被babel处理
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  }
}
```

### 10. externals（-S s）

* 对于第三方包（vue、jquery等），把它们忽略掉，不参与打包，会提升打包速度
* 在html文档中 使用CDN引入这些包即可
  * 注意：如果要使用这种方式，要保证不要在项目js代码中再导入vue、jq等，直接使用即可

```js
externals: {
  // 忽略库名 : npm包名称
  vue: 'vue'
}
```

### 11. dll（-S s）

* 使用dll可以把第三方包（vue、jquery等单独打包）

  1、避免bundle过大（把第三方库拆分出来）

  2、大大提高打包速度（不用再重复处理第三方库）

* 项目中第三方库的 导入、使用 均照常即可，不受影响

#### 11.1 webpack.dll.js

* 这个文件专门配置dll打包第三方库的过程
* 作用：把指定的第三方库，先打包好，并生成1个配套的manifest.json文件，告诉webpack打包时不必再打包这些第三方库
* 执行构建 `webpack --config webpack.dll.js`

```js
/*
  处理依赖的库
*/
const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    // 键：就是[name]，例如vue打包后就以vue.js命名
    // 值：要打包的npm包列表（mint-ui虽然没有生成[name]_[hash]，但也会被正确处理）
    vue: ['vue', 'mint-ui'],// 有更多的库需要打包进vue.js，只需加入这个数组即可
    jquery: ['jquery']
  },
  output: {
    // 输出的目录（项目根目录下）
    path: resolve(__dirname, 'dll'),
    filename: '[name].js',
    // 修改库中暴露的变量的名称，例如vue默认暴露的是Vue，经过dll，就变成了vue_fd5c7b8be06234b8a53f
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      // manifest.json文件记录的变量名，应与library一致，用于把我们代码中用到Vue的地方改为vue_fd5c7b8be06234b8a53f
      name: '[name]_[hash]',
      // 记录不参与打包的库 和 dll处理后的暴露变量名，入口处每一个 键 对应一个manifest.json
      path: resolve(__dirname, 'dll/[name].manifest.json')
    })
  ],
  mode: 'production'
}
```

#### 11.2 webpack.config.js

* 第三方库已经被webpack.dll.js构建好了，还需要在webpack.config.js中做2件事：

  1、使用插件webpack.DllReferencePlugin，作用：（对于多个库，可以多次创建该插件的实例）

  * 1、告诉webpack哪些第三方库不需要打包

    2、它会自动把项目中使用这些库的地方的变量名修改

    > 例如，项目中使用了vue，其实是使用了vue.js中的一个变量 => Vue
    >
    > ​    2.1 dll处理vue库的时候，会把其中暴露的Vue变量 改为我们指定的 library: '[name]_[hash]'，然后输出vue.js（内部的Vue变量名变成了vue_c7775325db17d0534c8d）
    >
    > ​    2.2 DllReferencePlugin又把我们项目中使用了Vue的地方的变量名都改为vue_c7775325db17d0534c8d
    >
    > 这样，经过dll处理的vue.js被插入到html中以后，就保证我们的bundle.js可以正常使用vue（双方使用的都是vue_c7775325db17d0534c8d）

    ​    

  2、使用插件`cnpm i add-asset-html-webpack-plugin -D`，作用：

  * 把这些已经被dll处理过的第三方库，输出到dist构建目录，并加到html文件中引入

* 实例：

```js
// 导入webpack，使用其内置的DllReferencePlugin插件读取minifest.json，找到不需要打包的第三方库
const webpack = require('webpack')
// 把指定的文件 输出到dist构建目录，并加到html文件中引入
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
module.exports = {
  mode: 'production',
  plugins: [
    //  1. 告诉webpack哪些第三方库不需要打包
    //  2. 它会自动把项目中使用这些库的地方的变量名修改
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/vue.manifest.json')
    }),
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/jquery.manifest.json')
    }),
    // 把这些已经被dll处理过的第三方库，输出到dist构建目录，并加到html文件中引入
    new AddAssetHtmlWebpackPlugin([
      // 这样的对象可以有多个，甚至可以是css文件
      {
        // 入口文件绝对路径
        filepath: resolve(__dirname, 'dll/vue.js'),
        // 要输出到的目录，相对于dist
        outputPath: 'js',
        // 插入到html中的标签，路径默认就是一个文件名vue.js，要把其相对于html的路径加上得到js/vue.js
        publicPath: 'js/'
      },
      {
        filepath: resolve(__dirname, 'dll/jquery.js'),
        outputPath: 'js',
        publicPath: 'js/'
      }
    ])
  ]
}
```

记录package.json文件中都安装了那些包