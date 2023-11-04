<template>
  <div class="tjh-scroll-x">
    <ul
      ref="listwidth"
      class="tjh-scroll-ul"
      @touchstart="getStartX"
      @touchmove="swipe"
      @touchend="getSpeed"
    >
      <!-- <li class="tjh-scroll-li" v-for="(item, i) in list" :key="i">{{item.title}}</li> -->
      <li class="tjh-scroll-li" v-for="(item, i) in list" :key="i">
        <a href="javascript:;" @click="getData" :class="[i == 0 ? 'a-active' : '']" ref="ainli" :data-index="i">{{item.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
/*
  本组件使用说明：
  1. 导入
    import scroll from 'path/scrollcom.vue'
    components: {scroll}
    在html结构中使用<scroll :list="tabbarList"></scroll>
  2. 属性
    list为必须，且应该为父组件中的  一个  数组，数组元素必须为对象，每个对象必须包含title属性（来设置列表的内容）
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
  3. 通过自定义事件sendIndex向父组件的方法传递  当前被点击的a标签的索引
    <scroll :list="tabbarList" @sendIndex="getPhoto"></scroll>
    getPhoto是父组件的一个方法，需接受一个参数————被点击的a标签的索引
  4. 若有更多需要，就改动一下
*/ 
export default {
  data() {
    return {
      posOfUlStartX: 0, // ul的初始位置（相对于定位父元素）
      startX: 0, // 手指的起始位置
      oldX: 0, // 手指上次（touchmove触发时）的位移
      oldTime: 0, // 手指上次（touchmove触发时）位移的时刻
      speed: 0, // 手指的速度
      v_array: [], // 记录手指离开后，ul的移动速度变化
      limit: 0, // 在mounted中设置，ul滑动时的最小 left值
      timerId: null // 减速阶段定时器id
    }
  },
  props: ['list'],
  updated() {
    // 计算ul的宽度，必须等到父组件请求到数据，子组件更新数据完毕，重绘列表完毕，否则，ul的宽度将不正确
    this.computeUlWidth()
  },
  methods: {
    // 计算ul的宽度
    computeUlWidth() {
      // DOM 元素挂载完毕，立即设置顶部图片分类中ul的宽度，使其等于内部的所有li宽度之和
      var ul = this.$refs.listwidth
      var widthOfUl = 0
      // 加0.5的原因是，不知为何，计算ul宽度的时候，每一个li都少算了0.5px。导致ul放不下最后一个li，使最后一个li换行了
      for (var i = 0; i < ul.children.length; i++) {
        widthOfUl += ul.children[i].offsetWidth + 0.1
      }
      ul.style.width = widthOfUl + "px"
      // 立即设置ul滑动时的最小 left值
      this.limit = this.$refs.listwidth.parentNode.offsetWidth - this.$refs.listwidth.offsetWidth
    },
    // 
    getStartX(e) {
      this.startX = e.touches[0].clientX;
      this.oldTime = Date.now();
      this.posOfUlStartX = this.$refs.listwidth.offsetLeft;
      this.oldX = 0;
      if (this.v_array.length > 0) {
        this.v_array = []
        clearInterval(this.timerId)
      }
    },
    // touchmove处理函数
    swipe(e) {
      // 前提：ul的宽度大于父容器，否则就没有必要滑动了
      // this.limit：若ul的宽度大于父容器，父容器宽度 - ul宽度 = limit < 0，limit就是ul定位的最小值，最大值是0
      if (this.limit >= 0) {
        // 没必要滑动
        return;
      }

      // 获取手指的当前位置
      // this.currentX = e.touches[0].clientX
      // 手指的当前位移，相对于触摸位置
      var nowX = e.touches[0].clientX - this.startX;

      // 以下是计算手指的滑动速度
      var nowTime = Date.now();
      // 获取手指位置变化的时间间隔
      var t = nowTime - this.oldTime;
      // 手指位移的变化
      var x = nowX - this.oldX;
      // 更新old的值，以备下次使用
      this.oldTime = nowTime;
      this.oldX = nowX;
      // 获取速度，单位px / ms
      this.speed = x / t;

      // 设置ul的当前位置 = ul的起始定位left + 手指的水平位移
      // 先检查定位值left是否超出范围
      // 计算ul的定位值
      // 有可能出现这种情况：
      // 1. 这一次触发touchmove时，ulLeft = -1px,
      // 2. 但下一次触发touchmove时，由于滑动太快，ulLeft一下子变成了2px,于是uleft就固定到了-1px
      // 3. 下次滑动时，稍微一移动手指，就使得nowX（位移）远大于1，于是，ulleft就再也回不到0了
      var ulLeft = this.posOfUlStartX + nowX;
      if (ulLeft <= 0 && ulLeft >= this.limit) {
        this.$refs.listwidth.style.left = ulLeft + "px";
      } else if (ulLeft > 0) {
        this.$refs.listwidth.style.left = "0px";
      } else {
        this.$refs.listwidth.style.left = this.limit + "px";
      }
    },
    getSpeed() {
      if (this.$refs.listwidth.offsetLeft == 0 || this.$refs.listwidth.offsetLeft == this.limit) {
        // 如果ul已经在限制 位置 就没必要计算减速过程了
        return
      }
      // 手指离开时，进行减速效果
      // 以cht ms为间隔，计算ul的位置
      // 时间间隔ms
      var cht = 5
      // 加速度  px / ms^2
      var a = Math.abs(this.speed) > 1 ? -0.0075 : -0.0002
      // 确定移动的方向，true为向左，false为向右
      var flag = this.speed > 0 ? false : true
      var v = Math.abs(this.speed); // 减速运动的初速度
      // 把本次滑动的速度清零
      this.speed = 0
      // 把初速度压入数组
      this.v_array.push(v);
      while (v > 0) {
        v = v + a * cht;
        this.v_array.push(v);
      }
      // 速度值计算完毕，设置定时器，每隔一定时间计算并设置一下 ul的定位left值
      this.timerId = setInterval(() => {
        if (this.v_array.length >= 2) {
          // 计算cht ms时间间隔的位移，因为定时器首次触发时，对应的是第二个速度值，所以这样算就行
          var x = ((this.v_array[0] + this.v_array[1]) / 2) * cht
          // 计算ul经过位移后的left值，区分方向
          if (flag) {
            var ulLeft = this.$refs.listwidth.offsetLeft - x
          } else {
            var ulLeft = this.$refs.listwidth.offsetLeft + x
          }
          // 避免ul跑过了，或者走不到0 / limit
          if (ulLeft <= 0 && ulLeft >= this.limit) {
            this.$refs.listwidth.style.left = ulLeft + "px";
          } else if (ulLeft > 0) {
            this.$refs.listwidth.style.left = "0px";
            this.v_array = [];
            clearInterval(this.timerId);
          } else {
            this.$refs.listwidth.style.left = this.limit + "px";
            this.v_array = [];
            clearInterval(this.timerId);
          }
          // 弹出上一个时刻的速度值，即this.v_array[0]
          this.v_array.shift();
        } else {
          this.v_array = [];
          clearInterval(this.timerId);
        }
        // console.log("定时器还在运行");
      }, cht);
    },
    getData(e) {
      // console.log(this.$refs.ainli)
      for (var i = 0; i < this.$refs.ainli.length; i++) {
        this.$refs.ainli[i].className = ''
      }
      e.target.className = 'a-active'
      // 执行自定义事件，向父组件传递当前点击的链接的索引
      this.$emit('sendIndex', e.target.dataset.index)
    }
  }
};
</script>

<style lang="less" scoped>
.tjh-scroll-x {
  width: 100%;
  height: 40px;
  // background-color: rgb(8, 219, 149);
  position: relative;
  overflow: hidden;
  font-size: 12px;
  > .tjh-scroll-ul {
    margin: 0;
    padding: 0;
    list-style: none;
    height: 100%;
    position: absolute;
    > .tjh-scroll-li {
      height: 100%;
      float: left;
      line-height: 40px;
      padding: 0 13px;
      > a {
        color: #000;
        &.a-active {
          color: rgb(2, 112, 238);
        }
      }
    }
  }
}
</style>