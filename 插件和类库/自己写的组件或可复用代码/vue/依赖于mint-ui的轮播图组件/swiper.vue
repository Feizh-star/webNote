<template>
  <div>
    <mt-swipe :auto="3000" :style="swipeHeight" ref="swipe">
      <mt-swipe-item v-for="(item, i) in imglist" :key="i">
        <img :src="item.src"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
// 轮播图组件使用：
// 1.依赖于mint-ui，需要在main.js中手动导入Swipe, SwipeItem组件，详见mint-ui官网
      // import { Swipe, SwipeItem } from 'mint-ui';

      // Vue.component(Swipe.name, Swipe);
      // Vue.component(SwipeItem.name, SwipeItem);
// 2.在需要使用轮播图的组件中，import本组件，并注册组件，在html结构中使用标签即可
// 3.必须的属性：<swiper :width="192" :height="108" :imglist="swipeList"></swiper>
//  3.1 width：指定你使用的轮播图的宽度
//  3.2 height：指定你使用的轮播图的高度，只要与宽度之比  等于你使用的真实图片的宽高比即可
//  3.3 imglist：指定图片列表数据，数组形式，元素为对象，对象必须包含src属性，即图片的url地址
export default {
  data() {
    return {
      // 轮播图容器的高度
      swipeHeight: { height: "" },
    };
  },
  // 需要调用者手动传递轮播图的真实宽高，只要与图片的真实尺寸同比例就可以了
  props: ['height', 'width', 'imglist'],
  mounted() {
    // 检测容器宽度，根据图片宽高比计算需要的轮播图高度
    this.swipeHeight.height =
      (this.$refs.swipe.$el.offsetWidth / this.width) * this.height + "px";
  }
};
</script>
<style lang="less" scoped>
.mint-swipe {
  > .mint-swipe-items-wrap {
    > div {
      > img {
        width: 100%;
      }
    }
  }
}
</style>