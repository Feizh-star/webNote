#### 1. 根据disabled属性设置样式

* 由于html标签的disable属性是布尔类型
* 我们要为元素（例如按钮）设置它不能点击时的样式（disabled为true）
* 可以直接使用属性选择器，当disabled为false时，就相当于没有这个属性，属性选择器自然失效
* 可以免去js控制样式代码

#### 2. input输入框左侧有宽度不定的内容时的布局技巧

![](../前端常用知识库简表速查/image/css技巧/input伸缩布局.jpg)

* 由于input是单标签，所以额外内容（标签）只能放在input外面

* 由于 额外的标签要重叠在input的左侧，且宽度不固定，所以不能使用定位

* 思路：把 额外标签 和 input 放在一个外层div中，外侧div采用灵活布局（flex），左侧标签由其内容撑开，input设置`flex:1;`，可使其自动占据剩余宽度

  ```less
  .inputOutter {
    width: 100%;
    height: 36px;
    box-sizing: border-box;
    border: 0;
    background-color: #f1f1f1;
    border-radius: 5px;
    display: flex;
    .address-city {
      padding-left: 5px;
      line-height: 36px;
    }
    input {
      flex: 1;
      border: 0;
      outline: none;
      background-color: transparent;
    }
  }
  ```

### 2. 移动端布局技巧

#### 1.1 顶部搜索栏

  顶部搜索栏布局一般是“左-中-右”三段式，左右宽度固定，中间搜索框宽度伸缩，整体固定定位在页面顶部：

* flex灵活布局可以实现，但有兼容性问题，不推荐
* margin-left: 100px; padding-right: 200px;（假设左右固定宽度都是100px，右侧padding是因为margin不在中段form表单的宽度范围内）
* padding-left: 100px; padding-right: 100px;（假设左右固定宽度都是100px）

![](C:/Users/17936/Desktop/前端常用知识库简表速查/image/mweb/顶部搜索块实现方式.png)

#### 1.2 顶部搜索栏+下方内容全屏

  全屏是指：水平和垂直方向都没有滚动条。顶部搜索栏跟6.1中一样。下方分为左右两栏：

* 全屏：html、body、包裹整个页面的div的宽高都是100%即可
* 下方内容容器（包裹左右两栏的div）宽高100%，padding-top: 50px（假设顶部搜索栏高度是50px）
* **子元素使用绝对定位，它的百分比高度就是参照父容器的高度（带padding和border）** ，所以下方内容的左右布局不能使用6.1中的方法，即**左侧栏不能使用定位** 。
* 左边栏高度100%，宽度100px，float: left;（浮动保证了左右内容一行显示，**浮动元素的高度百分比参照父容器内容高度**）
* 右边栏高度100%，**不设宽度** ，margin-left: 100px;（利用自动计算来保证右边栏的宽度占满剩余空间，就可以伸缩）

![](C:/Users/17936/Desktop/前端常用知识库简表速查/image/mweb/分类页面结构.png)

#### 1.3 上方高度不固定+下方全屏

情况：

* 上方高度不固定
* 下方盒子要占据剩余高度（即不设高度，也没法设置高度）
* 超出部分还要隐藏

解决：

* 临时办法，使用flex，还是要overflow
* 使用js计算高度，再设置下方盒子的高度，还是要overflow

![](C:/Users/17936/Desktop/前端常用知识库简表速查/image/mweb/上部高度不固定下部高度是剩余高度且超出内容隐藏.png)

#### 1.4 移动端a点击高亮

- 移动端的a标签默认有点击高亮显示效果，一般不需要，使用如下代码移除

```css
// 给a标签加即可
a {
  -webkit-tap-highlight-color: transparent;
}
```

#### 1.5 一个盒子中有若干个小盒子换行显示

* ==不方便为小盒子设置确定宽度==，因为要让它适应不同尺寸的屏幕

* 要让大盒子中一行显示3个（或其他数值）小盒子，且==小盒子的总宽度刚好等于大盒子的宽度==

* 总共9个小盒子，一行显示三个，==不能添加行盒子==

* 解决：

  1. 使用rem宽度，例如设计稿件的宽度是640px，分20rem，一个rem就是32px（UI稿件的宽度可以假设，然后换算一下）

     * 设置媒体查询，设置html字号

       ```
       <style>
         @media screen and (device-width: 375px) {
           html {
             font-size: 18.75px;
         }
         @media screen and (device-width: 320px) {
           html {
             font-size: 16px;
         }
       </style>
       ```

  2. 假设大盒子外部还有6px（UI稿件中的）的间距，那么间距就是：6 / 32 rem

  3. 小盒子的宽度应设置为 （640 - 6 * 2）(UI稿件中大盒子内容的总宽度)/ 3 / 32 rem

  4. 小盒子之间的间距用padding，也用rem单位

  5. 小盒子设置display: inline-block，避免块级元素换行