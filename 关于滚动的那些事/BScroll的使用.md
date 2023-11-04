## better-scroll的使用

### 1. 基本使用

1. npm安装或script标签引入
2. （必须保证要使用bscroll的html结构已经渲染完毕）使用`new BScroll(DOM元素/选择器, 配置对象)`创建一个BScroll实例
   * DOM元素/选择器：是bs要控制的区域
   * bs的滚动是通过css3的translate动画来实现的，所以，需要把滚动区域的内容都放在一个容器中（即DOM元素/选择器的子元素只能有1个）
3. 最好不要在嵌套滚动中使用better-scroll，除非滚动区域不会随着外层页面滚动超出屏幕区域

### \#.嵌套滚动行为

#### 1.1 现象

1. 内外都是原生：
   * 向上滚：内层优先，当内层滚动到（内层scrollTop最大）最大距离时，外层开始滚动
   * 向下滚：内层优先，当内层滚动到（内层scrollTop为0）最小距离时，外层开始滚动
2. 外层原生，内层better-scroll（默认阻止 原生事件）：*适合滚动区域保证不会跑到屏幕以外的情况*
   * 向上滚：内层优先，当内层滚动到（内层scrollTop最大）最大距离时，外层也==不滚动==
     * ！会导致外层没有滚动到最大距离时，内层滚动的==底部拉不上来==（只能把手指移动到外层再向上滚动）
   * 向下滚：内层优先，当内层滚动到（内层scrollTop为0）最小距离时，外层也==不滚动==
     * ！当内层滚动  容器的顶端  在屏幕（顶部）之外，导致页面拉不下来
3. 外层原生，内层better-scroll（不 阻止 原生事件`preventDefault: false`）：尽量不用（内层或外层会抖动）
   * 向上滚：外层优先，在内层滚动区域 **上滑**时，外层先滚动到最**底**部，然后内层才开始滚动
     * 当内层滚动容器 下方还有内容时，外层不滚动到最底部，内层无法滚动
   * 向下滚：外层优先，在内层滚动区域 **下滑**时，外层先滚动到最**顶**部，然后内层才开始滚动
     * 外层不滚动到最顶部，内层无法滚动

#### 1.2 向上 外层优先，向下，内层优先

* 在内层滚动区域，向上划动时，内层不动，外层滚动
* 在内层滚动区域，向下划动时，内层先动，内层到顶，外层再动

1. 方案1：操作外层
   * 缺点，外层和内层的滑动，衔接时，必须手指离开，再次滑动才行（无论上下）

```html
<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html,body {
    width: 100%;
    height: 100%;
  }
  ul {
    list-style: none;
  }
  hr {
    margin: 20px 0;
    width: 100vw;
  }
  .use-bscroll {
    width: 98vw;
    margin: 0 1vw;
    height: 80vh;
    border: 3px solid #aaa;
    text-align: center;
    overflow-y: hidden;
  }
  .use-bscroll 
  li {
    line-height: 50px;
  }
  .use-bscroll 
  li:nth-of-type(2n-1) {
    background-color: red;
    
  }
  .use-bscroll 
  li:nth-of-type(2n) {
    background-color: green;
  }
</style>
<body>
  <div class="page">
    <hr><hr><hr><hr><hr><hr><hr><hr><hr><hr>
    <!-- 内层滚动区域，固定高度 -->
    <div class="use-bscroll" id="inner">
      <ul>
        <li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li><li>13</li><li>14</li><li>15</li><li>16</li><li>17</li><li>18</li><li>19</li><li>20</li>
      </ul>
    </div>
  </div>
  <script>
    let touchY = 0
    // 页面的最大滚动距离
    let maxScrollYOfDoc = document.documentElement.scrollHeight - document.documentElement.offsetHeight
    let inner = document.getElementById('inner')
    document.addEventListener('touchstart', function (e) {
      touchY = e.touches[0].clientY
    })
    document.addEventListener('touchmove', function (e) {
      currentY = e.touches[0].clientY
      if (currentY < touchY && document.documentElement.scrollTop < maxScrollYOfDoc) {
        // 向上滑动 且 外层滚动没有到最底部（滚动距离最大值），仅有这种情况下，禁止内层滚动
        inner.style['overflow-y'] = 'hidden'
      } else {
        // 其余所有情况下，允许内层滚动
        inner.style['overflow-y'] = 'scroll'
      }
      touchY = currentY
    })
    // 不可去掉，这个事件监听是为了解决：当手指在内层快速向上划动，外层依赖惯性到达底部，内层的'overflow-y'依然是'hidden'
    document.addEventListener('scroll', function (e) {
      if (maxScrollYOfDoc - document.documentElement.scrollTop < 0.1) {
        inner.style['overflow-y'] = 'scroll'
      }
    })
  </script>
</body>
```

2. 方案2：通过为内层加一个屏蔽层来实现是否可滚动
   * 优点：向上滑动可以无缝衔接
   * 缺点：向下滑动（先内层再外层）依然无法做到无缝衔接

```html
<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html,body {
    width: 100%;
    height: 100%;
  }
  ul {
    list-style: none;
  }
  hr {
    margin: 20px 0;
    width: 100vw;
  }
  .use-bscroll {
    width: 98vw;
    margin: 0 1vw;
    height: 80vh;
    border: 3px solid #aaa;
    text-align: center;
    overflow-y: scroll;
  }
  .use-bscroll 
  li {
    line-height: 50px;
  }
  .use-bscroll 
  li:nth-of-type(2n-1) {
    background-color: red;
    
  }
  .use-bscroll 
  li:nth-of-type(2n) {
    background-color: green;
  }
</style>
<body>
  <div class="page">
    <hr><hr><hr><hr><hr><hr><hr><hr><hr><hr>
    <div style="position: relative;">
      <div class="use-bscroll" id="inner">
        <ul>
          <li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li><li>13</li><li>14</li><li>15</li><li>16</li><li>17</li><li>18</li><li>19</li><li>20</li>
        </ul>
      </div>
      <div id="outter"></div>
    </div>
    
  </div>
  <script>
    let touchY = 0
    let direction = 1 // 1代表向下滑动，-1反之
    // 页面的最大滚动距离
    let maxScrollYOfDoc = document.documentElement.scrollHeight - document.documentElement.offsetHeight
    let inner = document.getElementById('inner')
    let outter = document.getElementById('outter')
    outter.style.position = 'absolute'
    outter.style.top = '0'
    outter.style.width = inner.offsetWidth + 'px'
    outter.style.height = inner.offsetHeight + 'px'
    document.addEventListener('touchstart', function (e) {
      touchY = e.touches[0].clientY
      // 解决：进入页面，先下滑(none解除屏蔽)的问题，保证每次开始滑动，都是屏蔽状态，是否解除，由touchmove决定
      outter.style.display = 'block'
    })
    document.addEventListener('touchmove', function (e) {
      currentY = e.touches[0].clientY
      if (currentY < touchY && document.documentElement.scrollTop < maxScrollYOfDoc) {
        // 1.1向上滑动 且 外层滚动没有到最底部（滚动距离最大值），仅有这种情况下，禁止内层滚动
        outter.style.display = 'block'
      }
      // 2.向下滑动，无论有没有在最底部，都允许
      if (currentY > touchY) {
        outter.style.display = 'none'
      }
      // 解决：外层已经到了最底部，再上滑，（1.2）滚动事件不会触发；（2.）也不会触发，于是受touchstart影响，一直是block（屏蔽内层滚动）
      if (maxScrollYOfDoc - document.documentElement.scrollTop < 0.1) {
        outter.style.display = 'none'
      }
      touchY = currentY
    })
    // 只有当 外层划动到了底部，才允许内层划动
    // 1.2向上滑动，到了最底部，就允许内层向上滑动
    document.addEventListener('scroll', function (e) {
      if (maxScrollYOfDoc - document.documentElement.scrollTop < 0.1) {
        outter.style.display = 'none'
      }
    })
  </script>
</body>
```

