# 移动端UI的使用

## 一、Mint-UI

* Mint-UI是一个基于Vue的组件库，是一套移动端UI

### 1. 安装

1. 使用npm安装（webpack、vue环境已经配置好的前提下）

   ```
   cnpm i mint-ui -S
   ```

2. 在 Vue 2.0 中，为自定义组件绑定原生事件必须使用 .native 修饰符：

   ```html
   <my-component @click.native="handleClick">Click Me</my-component>
   ```

### 2. 完整引入

* 就是把mint-ui的组件全部引入，并全部注册为全局组件

#### 2.1 导入mint-ui

```javascript
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
// 安装MintUI，将其组件注册为全局组件
Vue.use(MintUI)

new Vue({
  el: '#app',
  render: ce => ce(App)
})
```

#### 2.2 使用js组件

* 以Toast——简短提示为例
* 全局导入模式，js组件的方法不能在  .vue文件中直接使用，需要在使用js组件的.vue文件中，按需导入

1. Toast()被调用时，显示提示信息，可以让Toast()在某个方法中被调用

   ```html
   <template>
     <div class="myconApp">
       <mt-button type="primary" @click.native="show">primary</mt-button>
     </div>
   </template>
   
   <script>
   // 必须按需导入Toast方法
   import { Toast } from 'mint-ui';
   
   export default {
     data: function () {
       return {
       };
     },
     methods: {
       show() {
         Toast({
           message: '操作成功',
           duration: 1000,
           position: 'bottom'
         })
       }
     }
   };
   </script>
   ```

2. 配置参数

   * message：字符串，提示的文本内容
   * position：字符串，提示的位置，取值'top' | 'middle' | 'bottom'
   * duration：数值，信息提示持续时间，若设置为-1，则提示框不会自动消失
     * Toast方法会返回1个实例对象（将其作为当前.vue组件的data），用于关闭提示框
     * ToastInstance.close()，可以手动关闭提示框
   * className：提示框 的类名。可以为其添加样式
     * 这个css类不能在  .vue组件的style（使用了scoped）中定义，因为有作用域存在，而提示框不属于当前.vue组件
     * 可以在任意全局css中定义
   * iconClass：icon 图标的类名，可以放置字体图标

#### 2.3 使用css组件

* 以Tabbar——底部选项卡  和  tab-container——面板  组合使用  为例

* 全局导入模式，可以直接在任意  .vue文件中直接使用  组件（当然前提是项目使用了这个.vue文件）

1. 把文档中的示例代码依次放入template中

   ```html
   <template>
     <div class="myconApp">
       <!-- tab-container——面板 -->
       <mt-tab-container v-model="active" swipeable>
         <mt-tab-container-item id="tab-container1">
           <mt-cell v-for="n in 10" title="tab-container 1" :key="n"></mt-cell>
         </mt-tab-container-item>
         <mt-tab-container-item id="tab-container2">
           <mt-cell v-for="n in 5" title="tab-container 2" :key="n"></mt-cell>
         </mt-tab-container-item>
         <mt-tab-container-item id="tab-container3">
           <mt-cell v-for="n in 7" title="tab-container 3" :key="n"></mt-cell>
         </mt-tab-container-item>
       </mt-tab-container>
       <!-- Tabbar——底部选项卡 -->
       <mt-tabbar v-model="selected" fixed>
         <mt-tab-item id="外卖" @click.native="active='tab-container1'">
           <span slot="icon" class="spanimg"></span>
           外卖
         </mt-tab-item>
         <mt-tab-item id="订单" @click.native="active='tab-container2'">
           <span slot="icon" class="spanimg"></span>
           订单
         </mt-tab-item>
         <mt-tab-item id="发现" @click.native="active='tab-container3'">
           <span slot="icon" class="spanimg"></span>
           发现
         </mt-tab-item>
       </mt-tabbar>
     </div>
   </template>
   
   <script>
   export default {
     data: function () {
       return {
         active: 'tab-container1',
         selected: '外卖'
       };
     },
   };
   </script>
   
   <style lang="less" scoped>
     .myconApp {
       margin-bottom: 26px;
     }
     .spanimg {
       width: 24px;
       height: 24px;
       background: url(./images/img/miao.png);
       background-size: cover;
     }
   </style>
   ```

2. tab-container

   * active：必须在当前vue组件的data中加入双向绑定数据 active，active的值  等于  tab-container-item的id时，面板就显示对应的tab-container-item
   * swipeable：属性，启用面板切换过渡动画
   * tab-container-item需要几个放几个，设置好id即可
   * mt-cell中可以放置任意内容（标签、文本）

3. tabbar

   * selected：必须在当前vue组件的data中加入双向绑定数据 selected，selected的值  等于  tab-item的id时，选中对应的 tab-item
   * fixed：属性：将选项卡固定在底部
     * 为使选项卡不遮挡面板的内容，需要将外部容器div的margin-bottom设置为选项卡的高度

4. tab-item：为tab-item绑定点击事件，被点击时切换active的值，使面板内容切换

   * 图标不使用img，改用span + 背景图，设置好样式即可
   * tab-item需要几个放几个，设置好id即可

### 3. 按需引入

1. 安装babel-plugin-component插件

   ```
   cnpm install babel-plugin-component -D
   ```

2. 在.babelrc中的"plugins"加一项

   * 官网的说明有误，多了一层[]，会导致打包时报错
     * Error: .plugins\[2][1] must be an object, false, or undefined

   ```json
   [
     "component",
     {
       "libraryName": "mint-ui",
       "style": true
     }
   ]
   ```

3. 在main.js中按需引入组件

   * 对于css组件，只需在main.js中引入，然后注册组件，就可以全局使用（以标签的形式）
   * 对于js组件中的  方法，必须在使用  方法  的.vue文件中  按需引入这个方法才行

   ```javascript
   import Vue from 'vue'
   import App from './App.vue'
   
   import { Button, Cell } from 'mint-ui'
   // Button.name是预定义的组件名，具体是什么，去官网看看就知道了
   Vue.component(Button.name, Button)
   Vue.component(Cell.name, Cell)
   
   new Vue({
     el: '#app',
     render: ce => ce(App)
   })
   ```

### 4. Header返回按钮

* 使用mint-ui的header组件，添加返回按钮后，按钮点击有个难看的背景色,使用如下样式可解决

  ```
  .mint-button:active {
    background-color: transparent;
  }
  ```

### 5. 轮播图

#### 5.1 使用

* 参考官网

#### 5.2 坑

* mint-ui的轮播图，采用了继承高度的方式，所以它的父级没有设置高度时，轮播图不会被其内容撑开，而是高度为0
* 很多时候，我们希望轮播图的高度不固定（为了适应移动端不同尺寸的屏幕）
* 于是，可以通过vue指令（如ref）拿到当前屏幕的宽度，然后，根据图片宽高比，计算一下高度（作为行内样式）
* 还可以在App.vue 中，在mounted钩子中，直接把屏幕的宽高，作为vuex的状态保存，以备不时之需

### 6. 上拉下拉刷新

#### 6.1 使用

1. 按需导入：！不要对复杂内容使用这种组件，它很容易打乱布局（例如搜索栏滚动到顶部时停靠），仅限于列表可以使用

   ```
   import { Loadmore } from 'mint-ui';
   Vue.component(Loadmore.name, Loadmore);
   ```

2. 把标签放在想用的位置（使用组件包裹，需要上拉下拉刷新的结构，它的外层要使用固定高度）

   * 内容可以随意

   ```
   <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
     <ul>
       <li v-for="item in list">{{ item }}</li>
     </ul>
   </mt-loadmore>
   ```

3. 定义loadTop方法，下拉时触发，进行异步操作，一般是请求数据

   * 必须在==异步操作的回调中==调用this.$refs.loadmore.onTopLoaded()
   * 刷新持续的时间就是异步操作的时间

   ```
   loadTop() {
     this.$axios.post('/api/profile/restaurants/1/5').then(result => {
       if(result.status === 200) {
         // ...
         this.$refs.loadmore.onTopLoaded()
       }
     })
   }
   ```

4. 定义loadBottom方法，上拉时触发，进行异步操作，一般是请求数据

   * 必须在==异步操作的回调中==调用this.$refs.loadmore.onBottomLoaded();
   * 刷新持续的时间就是异步操作的时间

   ```
   loadBottom() {
     // this.allLoaded = true;// 若数据已全部获取完毕
     setTimeout(() => {
       this.$refs.loadmore.onBottomLoaded();
     }, 3000)
   }
   ```

   

#### 6.2 坑

* 使用<mt-loadmore>组件后，按照官网的介绍，需要在自定义方法中进行如下调用

  * 坑之所在：onBottomLoaded()要放在一个定时器里，如果，直接同步调用，则页面会卡死

  ```
  loadTop() {
    this.$refs.loadmore.onTopLoaded()
  },
  loadBottom() {
    // this.allLoaded = true;// 若数据已全部获取完毕
    setTimeout(() => {
      this.$refs.loadmore.onBottomLoaded();
    }, 100)
  }
  ```

* 另外mint-ui滑动，会导致报错

  * 解决方法：参考https://blog.csdn.net/weixin_44557053/article/details/97663508（就是直接改mint-ui的包，治标不治本）

  ```
  [Intervention] Ignored attempt to cancel a touchmove event with cancelable=false, for example because scrolling is in progress and cannot be interrupted.
  ```



### \#. 踩坑记录

#### 1.1 轮播图

* mint-ui的轮播图，采用了继承高度的方式，所以它的父级没有设置高度时，轮播图不会被其内容撑开，而是高度为0
* 很多时候，我们希望轮播图的高度不固定（为了适应移动端不同尺寸的屏幕）
* 于是，可以通过vue指令（如ref）拿到当前屏幕的宽度，然后，根据图片宽高比，计算一下高度（作为行内样式）
* 还可以在App.vue 中，在mounted钩子中，直接把屏幕的宽高，作为vuex的状态保存，以备不时之需

#### 1.2 上拉下拉刷新

* 使用<mt-loadmore>组件后，按照官网的介绍，需要在自定义方法中进行如下调用

  * 坑之所在：onBottomLoaded()要放在一个定时器里，如果，直接同步调用，则页面会卡死

  ```
  loadTop() {
    this.$refs.loadmore.onTopLoaded()
  },
  loadBottom() {
    // this.allLoaded = true;// 若数据已全部获取完毕
    setTimeout(() => {
      this.$refs.loadmore.onBottomLoaded();
    }, 100)
  }
  ```

* 另外mint-ui滑动，会导致报错

  * 解决方法：参考https://blog.csdn.net/weixin_44557053/article/details/97663508（就是直接改mint-ui的包，治标不治本）

  ```
  [Intervention] Ignored attempt to cancel a touchmove event with cancelable=false, for example because scrolling is in progress and cannot be interrupted.
  ```

## 二、MUI

* MUI的使用类似于bootstrap，不依赖于其他框架
* MUI的mui.js是非严格模式的，在webpack中（使用了babel）打包会出问题
  * 在.babelrc中设置忽略mui.js即可导入

### 1. MUI滑动条的坑们：

    1. 需要借助于 MUI 中的 tab-top-webview-main.html 
    2. 需要把 slider 区域的 mui-fullscreen 类去掉
    3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下：
       * 导入 mui.js 
       * 调用官方提供的 方式 去初始化：

  ```
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  ```

 4. 我们在初始化 滑动条 的时候，导入的 mui.js ，但是，控制台报错： `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`

    * 经过我们合理的推测，觉得，可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' 东西，但是， webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以，这两者冲突了；

    * 解决方案：移除严格模式： 使用这个插件 babel-plugin-transform-remove-strict-mode

      * `cnpm i babel-plugin-transform-remove-strict-mode -D`

      * ```
        // .babelrc
        {
          "plugins": ["transform-remove-strict-mode"]
        }
        ```

      * 这个移除严格模式的方法并不管用，直接在.babelrc中忽略mui.js即可

        ```
        // 注意路径，刚开始就是路径搞错了
        "ignore": [
          "./src/lib/js/mui.js",
          "./src/lib/js/mui.min.js"
        ]
        ```

5. 当 滑动条 调试OK后，发现， tabbar 无法正常工作了，这时候，我们需要把 每个 tabbar 按钮的 样式中  `mui-tab-item` 重新改一下名字；

* 不是无法工作，而是一直报错，改类名可解

6. Chrome浏览器会报一个警告，以为你没有使用它的  使滑动更加流畅的css样式，加上就好了

```
.photolist-container {
  touch-action: pan-x;
}
```

7. 最后发现，点击不会变色了，没办法，手动解决（添加类）

### 2. 卡片视图

* 在hello-mui例子中的card.html

## 三、better-scroll

### 1. 安装

* 使用cnpm安装即可：`cnpm i better-scroll -S`
* 文档写的很糟糕，可参考[知乎](https://zhuanlan.zhihu.com/p/27407024)

### 2. 基本使用

1. 在需要使用滚动的组件里导入 better-scroll

   ```
   import BScroll from "better-scroll";
   ```

2. 写一个方法，初始化BScroll

   * BScroll构造函数：创建一个控制指定DOM元素的实例
     * 参数1：DOM元素
     * 参数2：配置对象
   * ！初始化必须在它控制的DOM元素已经渲染完毕再执行，即initScroll方法应该在this.$refs.area_scroll指定的元素渲染完毕再执行（滚动内容由http请求获取的要尤为注意）
     * 可在==相关数据http请求成功的回调==中，使用vue实例的this.$nextTick()方法来保证initScroll()在下次DOM更新完毕后再执行

   ```
   initScroll() {
     this.scroll = new BScroll(this.$refs.area_scroll, {
       click: true	// 让scroll控制的区域的内容可以点击
     });
   }
   ```

### 3. API

#### 3.1 scroll.scrollToElement()

* 实例方法：可以使滚动区域，滚动到指定的DOM元素（当然要是滚动内容中的DOM元素）
  * 参数1：要滚动到的DOM元素
  * 参数2：滚动的时间ms



