<template>
  <div class="timeBox">
    <div class="timeTop">
      <div class="timeInput">
        <date-picker
          type="datetime"
          v-model:value="time"
          :format="dFormat || 'YYYY-MM-DD HH:mm'"
          :value-type="dValueType || 'YYYYMMDDHHmm'"
          :confirm="true"
          :clearable="false"
          :minute-step="mstep"
          :hour-step="hstep"
          :hour-options="hoptions"
          :show-minute="false"
          confirm-text="确定"
          @confirm="confirm"
        ></date-picker>
      </div>
      <el-tooltip content="获取最新时次" popper-class="atooltip" placement="top">
        <div class="refresh flex" @click="refresh">
          <span class="iconfont icon-Refresh">
            <span style="position: relative; bottom: 1px; padding-left: 3px">自动刷新</span>
          </span>
        </div>
      </el-tooltip>
      <div class="playBtn">
        <span @click="preTick" class="iconfont icon-xiangzuojiantou"></span>
        <span
          @click="play = !play"
          class="iconfont"
          :class="play ? 'icon-pause' : 'icon-playfill'"
        ></span>
        <span @click="nextTick" class="iconfont icon-xiangyoujiantou"></span>
        <span class="auto-play-text">自动播放</span>
      </div>
    </div>
    <div class="timeline">
      <div class="timeInter" v-if="showDura">
        <div
          v-for="(itm, idx) in timeInfo"
          :key="idx"
          :class="itm.value ? 'active' : ''"
          @click="changeTimeDura(itm, idx)"
        >
          {{ itm.name }}
        </div>
      </div>

      <div class="line" name="line">
        <div class="backLine"></div>
        <div class="innerLine" v-if="half">
          <span class="innerLineLeft" :style="'width:' + activeWidth"></span>
          <span class="innerLineRight" :style="'width:' + activeRightWidth"></span>
        </div>
        <div
          class="innerLine"
          v-else
          :style="
            'width:' +
            activeWidth +
            ';background-image: linear-gradient(to right, #7AB6FF,#457AE6 );'
          "
        ></div>
        <div class="innerIcon" :style="'left:' + activeLeft"></div>
        <div v-if="half" class="colorBack" :style="'width:' + backWidth"></div>
        <ul ref="timeline">
          <li
            v-for="(item, index) in timeList"
            :key="index"
            :style="index < bound ? obsWidth : fcstWidth"
            @click="itemClick(item)"
            @mouseover="item.show = true"
            @mouseleave="liover(item)"
          >
            <transition name="slide-fade">
              <div class="timeInfo" :class="{ active: selectTick == item.id }" v-if="item.show">
                {{ item.lable }}
              </div>
            </transition>
            <span
              class="bar"
              v-if="
                timeDura !== '1' &&
                ((index == 0 && timeList[1].hour.substr(3, 5) !== '00') ||
                  item.hour.substr(3, 5) == '00')
              "
              :class="item.type"
            ></span>
            <span class="bar" v-if="timeDura == '1'" :class="item.type"></span>

            <span
              class="hour"
              v-if="
                (index == 0 && timeList[1].hour.substr(3, 5) !== '00') ||
                item.hour.substr(3, 5) == '00'
              "
              >{{ item.hour.substr(0, 2) }}:00</span
            >
            <span
              class="hour"
              v-if="timeDura == '1' && item.hour.substr(3, 5) !== '00' && index !== 0"
              >{{ item.hour.substr(3, 5) }}</span
            >
          </li>
        </ul>
      </div>
      <template v-if="showSpeed">
        <div class="timeInter" v-for="item in speedActive" :key="item.name">
          <div class="ta" :class="{ active: item.active }" @click="handle(item)">
            {{ item.name }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import 'vue-datepicker-next/locale/zh-cn.es'
import moment from 'moment'
export default {
  props: [
    'minuteStep',
    'hourStep',
    'startTime',
    'timeArray',
    'tick',
    'select',
    'half',
    'bound',
    'timer',
    'hoptions',
    'isAutoo',
    'obsTimeRange',
    'fcstTimeRange',
    'showDura',
    'showSpeed',
    'dValueType',
    'dFormat',
  ],
  components: { DatePicker },
  data() {
    return {
      autoOk: true,
      selRef: false,
      play: false,
      timeList: [],
      obsWidth: '',
      fcstWidth: '',
      time: '',
      selectTick: '',
      run: '',
      backWidth: '',
      tdlen: 0,
      speed: '1x',
      speedActive: [
        {
          name: '0.5x',
          active: false,
        },
        {
          name: '1x',
          active: true,
        },
        {
          name: '2x',
          active: false,
        },
      ],
      timeInfo: [
        {
          id: '1',
          name: '1h',
          value: true,
        },
        {
          id: '6',
          name: '6h',
          value: false,
        },
        {
          id: '12',
          name: '12h',
          value: false,
        },
      ],
      timeDura: '1',
      firstLeftWidth: '',
    }
  },
  filters: {},
  computed: {
    mstep() {
      // 日期选择框的分钟间隔
      if (this.minuteStep) {
        return this.minuteStep
      }
      return 1
    },
    hstep() {
      // 日期选择框的小时间隔
      if (this.hourStep) {
        return this.hourStep
      }
      return 1
    },
    activeWidth() {
      var w =
        100 /
        (this.bound +
          (this.timeList.length - this.bound) * (this.fcstTimeRange / this.obsTimeRange))
      if (this.selectTick == this.timeList.length) {
        return 'calc(100%)'
      } else {
        var oko
        if (this.fcstTimeRange / this.obsTimeRange == 1) {
          oko = this.selectTick + 0.5
        } else {
          oko =
            this.bound +
            (this.selectTick - this.bound) * (this.fcstTimeRange / this.obsTimeRange) +
            0.5 * (this.fcstTimeRange / this.obsTimeRange)
        }
        var len = this.selectTick < this.bound ? this.selectTick + 0.5 : oko
        let leftWidth
        if (this.half) {
          leftWidth = w * len > this.firstLeftWidth ? this.firstLeftWidth : w * len
        } else {
          leftWidth = w * len
        }
        return 'calc(' + leftWidth + '%)'
      }
    },
    activeRightWidth() {
      var w =
        100 /
        (this.bound +
          (this.timeList.length - this.bound) * (this.fcstTimeRange / this.obsTimeRange))
      var oko
      if (this.fcstTimeRange / this.obsTimeRange == 1) {
        oko = this.selectTick + 0.5
      } else {
        oko =
          this.bound +
          (this.selectTick - this.bound) * (this.fcstTimeRange / this.obsTimeRange) +
          0.5 * (this.fcstTimeRange / this.obsTimeRange)
      }
      var len = this.selectTick < this.bound ? this.selectTick + 0.5 : oko
      let rightWidth = w * len > this.firstLeftWidth ? w * len - this.firstLeftWidth : 0
      return 'calc(' + rightWidth + '%)'
    },
    activeProp() {
      if (this.selectTick < this.bound - 1) {
        return 100
      } else {
        if (this.fcstTimeRange / this.obsTimeRange == 1) {
          return ((this.bound - 1 + 0.5) / (this.selectTick + 0.5)) * 100
        } else {
          return (
            ((this.bound - 1 + 0.5) /
              (this.bound -
                1 +
                0.5 +
                (this.selectTick - (this.bound - 1) - 0.5) *
                  (this.fcstTimeRange / this.obsTimeRange))) *
            100
          )
        }
      }
    },
    activeLeft() {
      var w =
        100 /
        (this.bound +
          (this.timeList.length - this.bound) * (this.fcstTimeRange / this.obsTimeRange))
      if (this.selectTick == this.timeList.length) {
        return 'calc(100% - 6px)'
      } else {
        var oko
        if (this.fcstTimeRange / this.obsTimeRange == 1) {
          oko = this.selectTick + 0.5
        } else {
          oko =
            this.bound +
            (this.selectTick - this.bound) * (this.fcstTimeRange / this.obsTimeRange) +
            0.5 * (this.fcstTimeRange / this.obsTimeRange)
        }
        var len = this.selectTick < this.bound ? this.selectTick + 0.5 : oko
        return 'calc(' + w * len + '% - 6px)'
      }
    },
    // eslint-disable-next-line
    setWarnTable(TIME, TYPE) {},
  },
  watch: {
    startTime(val) {
      this.time = this.startTime
    },
    select() {
      this.selectTick = this.select
    },
    timeArray() {
      this.tdlen = this.timeArray.length
      this.calcBack()
      this.init()
    },
    play() {
      // 监听播放按钮改变
      if (this.play) {
        var interval
        switch (this.speed) {
          case '0.5x':
            interval = 1500
            break
          case '1x':
            interval = 1000
            break
          case '2x':
            interval = 500
            break
          default:
            break
        }
        this.run = setInterval(() => {
          this.selectTick = this.selectTick < this.timeArray.length - 1 ? this.selectTick + 1 : 0
          this.$emit('itemClick', this.selectTick, this.timeList[this.selectTick])
        }, interval)
        this.$emit('timerRun', this.run)
      } else {
        clearInterval(this.run)
      }
    },
    selectTick(val) {
      if (val === '') return
      this.timeList.map(function (item) {
        item.show = false
        return item
      })
      if (this.timeList[val]) {
        this.timeList[val].show = true
      }
    },
    bound() {
      this.calcBack()
    },
    timer() {
      if (this.timer == null) {
        this.play = false
      }
    },
  },
  mounted() {
    this.time = this.startTime
    this.calcBack()
    this.init()
    this.selectTick = this.select
  },
  methods: {
    refresh() {
      this.$emit('autoFresh')
    },
    // 获取播放速度
    handle(item) {
      this.speed = item.name
      this.speedActive.forEach((itm) => {
        itm.active = false
      })
      item.active = true
    },
    init() {
      this.creatList()
      var w =
        100 /
        (this.bound +
          (this.timeList.length - this.bound) * (this.fcstTimeRange / this.obsTimeRange))
      this.obsWidth = 'width:' + w + '%'
      this.fcstWidth = 'width:' + w * (this.fcstTimeRange / this.obsTimeRange) + '%'
    },
    creatList() {
      var arr = this.timeArray.slice()
      var cout = 0
      this.timeList = []
      if (this.select) {
        this.selectTick = this.select
      } else {
        this.selectTick = 0
      }
      for (let i = 0; i < arr.length; i++) {
        var time = moment(arr[i], 'YYYYMMDDHHmm').format('HH:mm')
        var lable = moment(arr[i], 'YYYYMMDDHHmm').format('YYYY-MM-DD HH:mm')
        var type = ''
        if (time == '00:00' || i == 0) {
          var day = moment(arr[i], 'YYYYMMDDHHmm').format('YYYY-MM-DD')
        } else {
          // eslint-disable-next-line
          var day = "";
        }
        if (this.tick != undefined && this.tick != null && this.tick != '') {
          var t = this.tick.split('_')[0]
          var f = this.tick.split('_')[1]
          let minutes = moment(arr[i], 'YYYYMMDDHHmm').format(f)
          if (minutes % t != 0) {
            time = ''
            type = 'min'
            day = ''
          } else {
            if (cout == 0) {
              // eslint-disable-next-line
              var day = moment(arr[i], "YYYYMMDDHHmm").format("YYYY-MM-DD");
            }
            cout++
          }
        }
        if (i == this.selectTick) {
          var show = true
        } else {
          // eslint-disable-next-line
          var show = false;
        }
        let item = {
          hour: time,
          day: day,
          time: arr[i],
          id: i,
          type: type,
          lable: lable,
          show: show,
        }
        this.timeList.push(item)
      }
      this.computeLeftWidth()
    },
    confirm() {
      this.$emit('inputTimeChange', this.time)
    },
    itemClick(item) {
      this.selectTick = item.id
      this.$emit('itemClick', this.selectTick, this.timeList[this.selectTick])
      this.play = false
    },
    calcBack() {
      if (this.half) {
        var len =
          this.bound +
          (this.timeArray.length - this.bound) * (this.fcstTimeRange / this.obsTimeRange)
        this.backWidth = ((this.bound - 0.5) / len) * 100 + '%'
      }
    },
    liover(item) {
      if (item.id == this.selectTick) {
        item.show = true
      } else {
        item.show = false
      }
    },
    // 修改展示时长
    changeTimeDura(itm, idx) {
      this.timeDura = itm.id
      this.timeInfo.forEach((item, index) => {
        if (index == idx) {
          item.value = true
        } else {
          item.value = false
        }
      })
      this.$emit('changeTimeDura', this.timeDura)
    },
    // 计算页面加载进来时间轴左侧宽度
    computeLeftWidth() {
      var w =
        100 /
        (this.bound +
          (this.timeList.length - this.bound) * (this.fcstTimeRange / this.obsTimeRange))
      var oko
      if (this.fcstTimeRange / this.obsTimeRange == 1) {
        oko = this.selectTick + 0.5
      } else {
        oko =
          this.bound +
          (this.selectTick - this.bound) * (this.fcstTimeRange / this.obsTimeRange) +
          0.5 * (this.fcstTimeRange / this.obsTimeRange)
      }
      var len = this.selectTick < this.bound ? this.selectTick + 0.5 : oko
      this.firstLeftWidth = w * len
    },
    nextTick() {
      this.selectTick = this.selectTick < this.timeArray.length - 1 ? this.selectTick + 1 : 0
      this.$emit('itemClick', this.selectTick, this.timeList[this.selectTick])
    },
    preTick() {
      this.selectTick = this.selectTick > 0 ? this.selectTick - 1 : this.timeArray.length - 1
      this.$emit('itemClick', this.selectTick, this.timeList[this.selectTick])
    },
  },
}
</script>

<style lang="less" scoped>
@lineColor: #0095ff; //线条颜色
@backColor: #ffffff; //背景颜色
@grayColor: #243a5e; //线条颜色
@agingColor: #1d5096; //刻度颜色
@inputHeight: 25px;
@lineHeigth: 65px;
@infoHeight: 20px;
@backColor2: #fff;
@font-face {
  font-family: 'iconfont'; /* Project id 4007758 */
  src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAATgAAsAAAAACpgAAASUAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDVgqHTIYgATYCJAMcCxAABCAFhGcHdBsaCcieBXbjSxGIxktOeG7+bcKCJ35/35l75+EvmawKRZgRYEjKG9KmzuQSdvj3tNemHpQMzE4YMtDduXzJsvLS9CAGJ+iPYAIEmDXVq+y/vz9WutFURfVoPwBsVV40R5Tf+M0CXXTwCaQvkN9jOMX1E1cRj0GAIIplk9YXVzYC7wUDawehZOBSAa+jLNCUAagkN5rBEHybW/RQRW6BA+ZMegYAbqyflz9ApAKDY8GztFxkBseeIS9+IqP+jwL7AowlCLC5ARzAAvkD88p2dngV4pTzIQQlPURGA0AIPgb9RJ55PdM/r3nx8/8ESDo9hoUQhg1rDYqDafAfzwVxoeYQIPZUXPhENASFTy8EBz51CAY+9QgWvmoQBL5/WlhUvLd1GJACSAEAskCI5WZhX7Ykkkb4+XXpIpFhJd3LSwJwG9UNUljDcUB3eX5qECWOdpHCFG4UBs26JuS0kZASpqDmhDvxU8XROj4o6HTT1SaeRxu5+as7msSFgVphzarAWwVOCVyTfK34WumVWg7l1vefgqIntNe0ghDULC5Yg+q5eVgTv3otqb8Hj61Oulp0teJ6gygRNwTqfEBYpwYEd2tjGfmK5zxA0PiZLnigu5zG+1yQyPdEDw8JOj8kiQ97+FwcdR7Rx2IkyjwYhnj5mhk1o1avlUwsxTVpRom9cZo0e8iDQlXftcxv4f8Ck+/zmapJqhkv/Nj/6i/agZ+8Oweg71BqKXZZR2Lv0IFb95kBcLNNQKEYqdgmA7buJDEy5rMHou8w8Dq81hj3rRTRIQ6irgsWXZBmDkbUJRf39h76u6xzSVl0YeooxJcOLQj4VC59XBE0uIfauzwtQ1mXV4Ken47uUmbu9ElDXFxbPuxPWqdiwi9KUeOizvkBn3cbQnl4pV8Ay+WHiEPz03Nxqpijz8Px2OgeNYXzifm2+GgiWnVQFa5ZC63mbYg2EZMiwsFSCE2eVGjeaYrBjBpDCnz7bCdCvGfM8Na8Ye/OqkMSVGzQdhd3OojdQ1O7gP9s1G5s0uoRMAKua6ulTwD4z0psq0UzD+XAHklfsmakr6OYp6e2PjzaHo/T+WR+VXkoAB+9LIGQ/k9B9aiPuSpmnlHLQMFh9ZsBT5N61tS0rccdSAQu8UoEEQQ8lvEo95qzRhcuguAHNCIYPJLB4pOKVWIuOARTCi4+FRBEnqKjg4nmhCAaADKNJSBEWA+GMJ7BEuE4VonXwSHOc3CJ8BeC6MrrdMFkZipgoIGFZtw4GKdNDjup2lir1npIua0GJq6ghYyLhhweHxMXbiiBdsjUsYdrAEWwLImTjMOGFwtXg1arA3cyjlZoYmNaWNaZHhtLJn1IjMlhAwUYkAELMsMZDYajmTjYkcbwbPDv1YMoblYGTEGsNshwcSpaOy5ejLgC2BKzvVC3A1nbZQAKgcUiua1IDAcbXPE3CFlZ2QHnTN6oFWTCitFSoeiULpYORxY1x3Rvte3kZUAQ+BaeGLGi4ogrnvj4K1bDYJK2Wn0G0QY7NdjhbrUMLK8Jcoa4HWso6yHJQFeLumyt1u/O0FZa7jS4XRAA')
    format('woff2');
}
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-playfill:before {
  content: '\e74f';
}
.icon-xiangyoujiantou:before {
  content: '\e65f';
}
.icon-xiangzuojiantou:before {
  content: '\e660';
}
.icon-Refresh:before {
  content: '\e603';
}
.icon-Icon-rili:before {
  content: '\e60d';
}
.icon-pause:before {
  content: '\e8f9';
}
.timeBox {
  .timeTop {
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
    display: flex;
    .timeInput {
      position: relative;
      display: inline-block;
      height: 30px;
      margin: 0px 15px 0px 0px;
      text-align: center;
      margin-right: 34px;
    }
    .refresh {
      // width: 30px;
      height: 30px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      > .iconfont {
        display: flex;
        padding: 0 5px;
        height: 24px;
        font-size: 14px;
        align-items: center;
        justify-content: center;
        background-color: #1890ff;
        cursor: pointer;
        color: #ffffff;
        vertical-align: top;
      }
    }
    .playBtn {
      display: flex;
      align-items: center;
      height: 30px;
      margin-left: 16px;
      margin-right: 12px;
      // color: #025ac6;
      // background: linear-gradient(180deg, #fcfefd 0%, #c1d8f0 100%);
      // border: 1px solid #c5d9ef;
      .iconfont {
        display: flex;
        width: 24px;
        height: 24px;
        align-items: center;
        justify-content: center;
        background-color: #1890ff;
        cursor: pointer;
        color: #ffffff;
        & + .iconfont {
          margin-left: 8px;
        }
      }
      .auto-play-text {
        font-size: 14px;
        padding-left: 8px;
      }
    }
  }
  .timeline {
    width: calc(100% - 0px);
    display: flex;
    padding: 8px 34px 4px;
    background: @backColor;
    box-shadow: 0px 2px 8px 0px rgba(0, 23, 67, 0.3);
    position: relative;
    .timeInter {
      display: flex;
      span {
        display: inline-block;
        width: 35px;
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 12px;
      }
      div {
        width: 30px;
        height: 30px;
        background: linear-gradient(180deg, #fcfefd 0%, #c1d8f0 100%);
        border: 1px solid #c5d9ef;
        line-height: 30px;
        text-align: center;
        color: #333;
        font-size: 12px;
        cursor: pointer;
      }
      .ta {
        margin-left: 8px;
      }
      .active {
        width: 30px;
        height: 30px;
        background: linear-gradient(180deg, #7ab6ff 0%, #457ae6 100%);
        border: 1px solid #c5d9ef;
        color: #ffffff;
      }
    }
    .line {
      width: 100%;
      height: 50px;
      display: inline-block;
      vertical-align: top;
      z-index: 100;
      transition: all 1s;
      position: relative;
      .innerIcon {
        height: 10px;
        width: 10px;
        position: absolute;
        top: math.div(@inputHeight - 15, 2);
        background: @lineColor;
        border-radius: 50%;
        border: solid 2px white;
        z-index: 5;
        transition: all 1s;
      }
      .backLine {
        width: 100%;
        height: 10px;
        position: absolute;
        top: math.div(@inputHeight - 13, 2);
        background: #d6d8da;
        border-radius: 10px;
        pointer-events: none;
        z-index: 1;
      }
      .innerLine {
        height: 10px;
        width: 100%;
        position: absolute;
        top: math.div(@inputHeight - 13, 2);
        border-radius: 10px 0px 0px 10px;
        pointer-events: none;
        z-index: 3;
        transition: all 1s;
        max-width: 100%;
        display: flex;
        justify-content: flex-start;
        .innerLineLeft {
          display: inline-block;
          // width: 50%;
          height: 10px;
          border-radius: 10px 0px 0px 10px;
          background-image: linear-gradient(to right, #7ab6ff, #457ae6);
          transition: all 1s;
        }
        .innerLineRight {
          display: inline-block;
          // width: 50%;
          height: 10px;
          border-radius: 0px 10px 10px 0px;
          background-image: linear-gradient(to right, #ffb100, #ffb100);
          transition: all 1s;
        }
      }
      ul {
        width: 100%;
        margin-top: math.div(@inputHeight - 2, 2);
        position: relative;
        z-index: 2;
        vertical-align: top;
        li {
          display: inline-block;
          position: relative;
          height: 2px;
          vertical-align: top;
          cursor: pointer;
          color: #858585;
          .bar {
            display: inline-block;
            width: 100%;
          }
          .hour {
            display: block;
            position: relative;
            font-size: 10px;
            text-align: right;
            margin-top: 0px;
            text-align: center;
            min-width: 40px;
            left: 50%;
            transform: translate(-50%);
          }
          .day {
            display: block;
            position: relative;
            font-size: 10px;
            text-align: center;
            min-width: 80px;
            left: 50%;
            transform: translate(-50%);
          }
          .bar::after {
            content: '';
            height: 6px;
            content: '';
            width: 100%;
            display: inline-block;
            position: absolute;
            margin-top: -10px;
            right: 50%;
            pointer-events: none;
            border-right: 1px solid #7ab6ff;
          }
          .bar.min::after {
            content: '';
            height: 10px;
            content: '';
            width: 100%;
            display: inline-block;
            position: absolute;
            margin-top: -9px;
            right: 50%;
            pointer-events: none;
          }
          .timeInfo {
            position: absolute;
            top: -30px;
            background: @grayColor;
            color: #fff;
            width: 120px;
            min-width: 120px;
            height: 20px;
            left: calc(50% - 60px);
            border-radius: 10px;
            text-align: center;
            font-size: 8px;
            line-height: 20px;
            cursor: default;
          }
          .timeInfo.active {
            background: @lineColor;
          }
        }
      }
    }
    .colorBack {
      height: 57px;
      width: 25%;
      position: absolute;
      top: -5px;
      left: 0px;
    }
  }
}

.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
<style lang="less">
.timeBox {
  .mx-input {
    border-radius: 0;
    border: none;
    padding-right: 10px;
    height: 30px;
  }
  .mx-datepicker {
    width: 140px;
    height: 30px;
  }
  .mx-datepicker::after {
    display: inline-block;
    content: '';
    width: 30px;
    height: 30px;
    background: #edeff8;
    left: 140px;
    top: 0;
    position: absolute;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAAAXNSR0IArs4c6QAAAflJREFUOE+lk89rE1EQx7+zG0GINQlYqxdZRBuExSXvxcRclB68+Qd4EbwIRvFkb/44KL3Vk9iWnkQvXgu99VDEg41mNq4sKKXI4sWfGFYNKGZ35JUEYmwhxXcZeDPzmR/f9wj/eWg4Xyn1EsAN3/eXB31KqbNENMPM3uA9FYvFsWw2e9WyrCMiYoDnATQBvB6CHxORE0T0kIgkTdONTqdzj5RSS0R0BsArACIiFQDviOjDIEBEDgA4RETPAZhCx0VkhbTWvwBcZ+ZZk6C1/iIi077vPxga4QIRzTLzvl7cNIAZAxAAdWZeMA7XdSfCMPwMIB0awXJddzwMw489wCUA833AWwCfdijIfgCHNwEi8oyI1ncCEJFJIqr9M8KoEK31XyNs7sBxnN2FQmGs1WqZHaBare41ttFofDO2VCqNt9vt71EU/dwSoLVeBXAawKk4jl/kcrmvRrI4jgv5fL4sIk8BPGHmqS0BnudNZjIZB8AqM/9WSp00lX3fX9Na7wIw1e12oyAI1rfr4I6I1NI0rdu2HRHRYwMQkXNJkjiWZc0R0Roz39wOcFlEdJIkt4IgeF8ul+8aQLPZvOZ53kHbtm8TETPz3CDAPJgrzDw/qgK9h1QHcN/I+AbADwCPTLcjQvqfbg9VKpVakiSLAI6OmNwP27Bt++IfNmTtqDT/kPMAAAAASUVORK5CYII=);
    background-size: 16px 16px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  .mx-datepicker svg {
    display: none;
  }
}
</style>
