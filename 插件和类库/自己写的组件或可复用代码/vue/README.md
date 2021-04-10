* 把本目录的lazyloader.vue 和 photosharepage.vue 和 scrollcom.vue放到photosharecoms目录下，即可得到自己写的水平滚动 + 懒加载
### 1. 图片分类栏水平滑动特效
* 本组件使用说明：
  1. 导入
    import scroll from 'path/scrollcom.vue'
    components: {scroll}
    在html结构中使用<scroll :list="tabbarList"></scroll>
    
  2. 属性
    list为必须，且应该为父组件中的  一个  数组，数组元素必须为对象，每个对象必须包含title属性（来设置列表的内容）
    
    ```
    tabbarList: [
      {
        title: "全部",
        id: 1
      },
      {
        title: "花草树木",
        id: 2
      }
    ]
    ```
    
  3. 通过自定义事件sendIndex向父组件的方法传递  当前被点击的a标签的索引
    <scroll :list="tabbarList" @sendIndex="getPhoto"></scroll>
    getPhoto是父组件的一个方法，需接受一个参数————被点击的a标签的索引
  
  4. 可以给<scroll></scroll>添加类样式，使其固定定位
     该组件的宽度继承自父元素（内容宽度占父元素的98%，左右margin各占父元素宽度的1%）
     若固定定位，其“父元素宽度”就是浏览器宽度
     需要背景色
  
  5. 若有更多需要，就改动一下

### 2. 图片懒加载组件
* 组件的使用方式：
  1. 导入并注册组件：import lazyloader from './lazyloader.vue'  components: { lazyloader }
  2. 把组件的标签放入页面  <lazyloader :imgList="photoList" :flag="id"></lazyloader>
  3. 必须的属性：
      * 必须绑定imgList属性到父组件的图片列表，列表中每一个图片对象至少应包含img_url属性指定图片的资源地址
      * 必须绑定flag属性到父组件的一个数值变量，这个变量是图片分类的id，用于判断图片分类是否变化，以“先将img恢复loading状态”再重新加载所有图片
        - 当图片分类的id变化时，父组件请求数据前，应该先修改id变量的值
        - 若没有图片分类，也需要这个id，只是将其置0即可
      * 必须绑定loadingSrc为一个载入git动图的url，图片需自行准备，建议使用loading动画在图片中心的尺寸较大的动图，但图片数据量应尽可能小
        - 此动图需以loading.gif命名，且真实图片的url不能包含loading.gif字符串
      * 最好为router属性传入路由，就像`:router="'/home/photolist/'"`,路由参数最好图片对象的id上，这样就可以直接拼出路由
  4. 此组件只针对浏览器可视区域内可滚动的效果，div内的滚动效果不适用
  5. 若要显示文字描述，需要在图片对象中有title 和 zhaiyao属性（必须同时有）
* 遇到的问题：
  1. 懒加载功能测试成功之后，为了给图片添加文本（需要定位到图片底部），就给容纳img图片的li添加了相对对位，以使li元素中的span可以使用绝对定位
      * li > a > img + span
      * 结果，一加定位，就出问题了：未显示的图片过早的加载（没有懒加载），并导致第一栏的图片显示到了第2栏的错乱现象
      * 原因：window的滚动事件中，使用了img.offsetTop来检测图片距页面顶部的距离，li加上定位，这个值就始终是0，导致所有图片过早加载
      * 解决：使用li的offsetTop来作为图片距页面顶部的距离

### 3. 轮播图组件

* 组件的使用方式

  1. 依赖于mint-ui，需要在main.js中手动导入Swipe, SwipeItem组件，详见mint-ui官网

     ```
     import { Swipe, SwipeItem } from 'mint-ui';
     Vue.component(Swipe.name, Swipe);
     Vue.component(SwipeItem.name, SwipeItem);
     ```

  2. 在需要使用轮播图的组件中，import本组件，并注册组件，在html结构中使用标签即可

  3. 必须的属性：<swiper :width="192" :height="108" :imglist="swipeList"></swiper>

     * width：指定你使用的轮播图的宽度
     * height：指定你使用的轮播图的高度，只要与宽度之比 等于你使用的真实图片的宽高比即可
     * imglist：指定图片列表数据，数组形式，元素为对象，对象必须包含src属性，即图片的url地址

### 4. 加减数字盒子组件

数字盒子使用方式：

1. 导入组件，import；components；<numberbox :min="1" :max="goodsInfo.stoke_quantity || 1" @getnum="getNum"></numberbox>

2. API说明

   1. min：设置最小值

   2. max：设置最大值，

   3. getnum事件：在handler方法中接收一个值，即盒子当前的数值，若设置了最大值或最小值，且输入了超出范围的值，不保证 文本框失去焦点时 立即通过getnum获取文本框的值 是正确的（因为此时可能numberbox组件还没有把超出范围的值正确设置为最大值或最小值），最好延时100ms进行数据操作

   4. 当极值，通过http请求的相应获得时，最好使用 http.res || 1 设置http响应之前的默认极值，以避免因异步操作出现错误









