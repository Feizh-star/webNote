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