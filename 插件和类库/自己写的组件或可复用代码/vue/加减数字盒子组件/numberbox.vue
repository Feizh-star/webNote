<template>
  <div class="number-box">
    <span @click="subNum">-</span><input type="text" @input="change" @blur="blur" :value="inputVal"><span @click="addNum">+</span>
  </div>
</template>
<script>
/*
  数字盒子使用方式：
  1. 导入组件，import；components；<numberbox :min="1" :max="goodsInfo.stoke_quantity || 1" @getnum="getNum"></numberbox>
  2. API说明
    1. min：设置最小值
    2. max：设置最大值，
    3. getnum事件：在handler方法中接收一个值，即盒子当前的数值，若设置了最大值或最小值，且输入了超出范围的值，
       不保证 文本框失去焦点时 立即通过getnum获取文本框的值 是正确的（因为此时可能numberbox组件还没有把超出范
       围的值正确设置为最大值或最小值），最好延时100ms进行数据操作
    4. 当极值，通过http请求的相应获得时，最好使用 http.res || 1 设置http响应之前的默认极值，以避免因异步操作出现错误
*/
export default {
  data() {
    return {
      // 始终是文本框显示的值，初始设置为最小值
      inputVal: this.min,
      // 文本框失去焦点标志
      blurFlag: false
    }
  },
  // 允许父组件设置数值的变化范围
  props: ['min', 'max'],
  watch: {
    inputVal: function (newVal, oldVal) {
      // inputVal的值变化时，只会时 数值，或者 '',只当它的值是数值时，将其传递到父组件
      if (this.inputVal !== '') {
        this.$emit('getnum', this.inputVal)
      }
    }
  },
  methods: {
    // 购买数量加
    addNum() {
      // 此标志为真true，代表，文本框失去焦点事件刚刚发生，此时点击 + 按钮，不做增加操作
      // 100ms后，此标志会变成false
      if (this.blurFlag) {
        return;
      }
      if(this.inputVal < this.max) {
        this.inputVal++;
      }
    },
    // 购买数量减
    subNum() {
      // 此标志为真true，代表，文本框失去焦点事件刚刚发生，此时点击 + 按钮，不做增加操作
      // 100ms后，此标志会变成false
      if (this.blurFlag) {
        return;
      }
      if(this.inputVal > this.min) {
        this.inputVal--;
      }
    },
    // change在由输入操作时触发，是保证 只能输入数字的关键
    change(e) {
      // 每有一次输入操作，就立即对文本框内容进行处理，使它显示处理后的结果
      let val = e.target.value;
      // 正则表达式，是过滤输入的关键
      if (/^\d*$/.test(val)) {
        // 如果值是 '' ，parseInt转换得到NaN，需要把文本框的值设置为 ''
        this.inputVal = parseInt(val) || '';
      } else {
        // 如果输入内容不合法，就使用上一次的值
        e.target.value = this.inputVal
      }
    },
    // 文本框失去焦点时触发，限制范围的关键，且失去焦点时，阻止递增或递减
    blur(e) {
      // 将文本框失去焦点 标志置为true，接下来100ms内，不执行递增操作
      this.blurFlag = !this.blurFlag;
      // 文本框失去焦点时，如果它是空 或者 它的值小于最小值，则设置为 最小值
      if (e.target.value === '' || this.inputVal < this.min) {
        this.inputVal = this.min
      } else if (this.inputVal > this.max) {  // 如果文本框的值，大于最大值，就将它设置为最大值
        this.inputVal = this.max
      }
      // 100ms后，恢复文本框失去焦点 标志为false，允许递增 或 递减操作
      setTimeout(() => {
        this.blurFlag = !this.blurFlag;
      }, 100)
    }
  }
}
</script>

<style lang="less" scoped>
.number-box {
  display: inline-block;
  color: #333;
  vertical-align: middle;
  border: 1px solid #aaa;
  border-radius: 3px;
  overflow: hidden;
  height: 26px;
  background-color: #ECEDED;
  input {
    padding: 0;
    margin: 0;
    border: none;
    width: 40px;
    text-align: center;
    height: 24px;
    border-radius: none;
    background-color: #fff;
    font-size: 14px;
  }
  span {
    display: inline-block;
    text-align: center;
    width:35px;
    height: 24px;
    line-height: 24px;
    vertical-align: top;
    &:first-of-type {
      border-right: 1px solid #aaa
    }
    &:last-of-type {
      border-left: 1px solid #aaa
    }
  }
}
</style>