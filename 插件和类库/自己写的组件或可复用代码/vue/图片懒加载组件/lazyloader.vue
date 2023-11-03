<template>
  <div class="photo">
    <ul id="photo-list">
      <li v-for="(item, i) in imgList" :key="i">
        <a href="javascript:;">
          <img :src="i < 3 ? item.img_url : loadingSrc" alt="" :data-src="item.img_url">
          <span class="text" v-if="item.title && item.zhaiyao">
            <p>{{item.title}}</p>
            <p>{{item.zhaiyao}}</p>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
// 组件的使用方式：
// 1. 导入并注册组件：import lazyloader from './lazyloader.vue'  components: { lazyloader }
// 2. 把组件的标签放入页面  <lazyloader :imgList="photoList" :flag="id"></lazyloader>
// 3. 必须的属性：
//    1.必须绑定imgList属性到父组件的图片列表，列表中每一个图片对象至少应包含img_url属性指定图片的资源地址
//    2.必须绑定flag属性到父组件的一个数值变量，这个变量是图片分类的id，用于判断图片分类是否变化，以“先将img恢复loading状态”再重新加载所有图片
//      2.1当图片分类的id变化时，父组件请求数据前，应该先修改id变量的值
//      2.2若没有图片分类，也需要这个id，只是将其置0即可
//    3.必须绑定loadingSrc为一个载入git动图的url，图片需自行准备，建议使用loading动画在图片中心的尺寸较大的动图，但图片数据量应尽可能小
//      3.1 此动图需以loading.gif命名，且真实图片的url不能包含loading.gif字符串
// 4. 此组件只针对浏览器整个页面的滚动有效，若是自行设计的在某区域内可滚动的效果，本组件不适用
// 5. 若要显示文字描述，需要在图片对象中有title 和 zhaiyao属性（必须同时有）
export default {
  data() {
    return {
      DOMul: {}
    }
  },
  props: ['flag', 'imgList', 'loadingSrc'],
  mounted() {
    this.DOMul = document.getElementById('photo-list')
    window.addEventListener('scroll', this.lazyLoader)
  },
  methods: {
    lazyLoader() {
      var imgs = this.DOMul.querySelectorAll('img')
      // 获取页面滚动出去的距离
      var sOfPage = document.body.scrollTop || document.documentElement.scrollTop
      // console.log(sOfPage)
      // 获取页面可视区域的高度
      var vOfPage = window.innerHeight
      // 图片距可视区域顶部的距离
      var imgToPageTop = 0
      // 如果imgToPageTop（图片距可视区域顶部的距离） < vOfPage（可视区域底边）, 则图片需要加载
      // 遍历所有图片 
      // 正则，过滤掉已经替换过src属性的图片
      var reg = /loading\.gif/
      for (var i = 0; i < imgs.length; i++) {
        // 图片距可视区域顶部的距离 = 图片距页面（body）顶部的距离 - body滚动出去的距离
        // 由于li使用相对定位（为了添加文字），会导致img的offsetTop变成相对于li的值（0），所以要用li的offsetTop代替img的
        imgToPageTop = imgs[i].parentNode.parentNode.offsetTop - sOfPage
        // 当图片进入浏览器底部  且  图片的src属性中包含loading.gif才替换src属性
        if (imgToPageTop < vOfPage && reg.test(imgs[i].src)) {
          imgs[i].src = imgs[i].dataset.src
        }
      }
    }
  },
  watch: {
    flag: function (oldVal, newVal) {
      if (newVal != oldVal) {
        // 如果父组件 的图片分类变化，就要把所有图片变成加载状态
        this.DOMul.querySelectorAll('img').forEach((item) => {
          item.src = this.loadingSrc
        })
        // 还要把scroll距离瞬间置零
        if (document.body.scrollTop) {
          document.body.scrollTop = 0
        } else {
          document.documentElement.scrollTop = 0
        }
        // 无伤大雅的小bug，由于后端偷懒，测试用的图片分类只有两套，分类id为奇数的一套，偶数的一套，这就导致了：
        //    第1个分类  和  第3个分类（中间隔一个的两个分类）  图片数据完全一样，所以从隔一个点击图片分类的时候，vue的数据并没有更新
        //    于是v-for就没有重绘页面，导致没有滚动的时候，页面一直是加载中
        //    滚动一下就好了（替换了src）
        // 解决：手动调用一下滚动的事件处理函数即可
        // 所以实际生产环境中，这个bug并不会被触发
        this.lazyLoader()
      }
    }
  }
};
</script>

<style lang="less" scoped>
.photo {
  padding-top: 40px;
  > ul {
    padding: 0;
    margin: 0;
    list-style: none;
    > li {
      margin-bottom: 3px;
      position: relative;
      img {
        width: 100%;
        vertical-align: middle;
      }
      span {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 0 3px;
        background-color: rgba(0, 0, 0, 0.4);
        > p {
          margin: 0;
          color: #fff;
          &:nth-of-type(1) {
            margin-bottom: 3px;
          }
          &:nth-of-type(2) {
            font-size: 12px;
            max-height: 40px;
          }
        }
      }
    }
  }
}
</style>