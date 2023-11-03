## 一、jQuery简介

好处：

- 解决兼容性问题
- 链式编程，一行实现一个功能
- 隐式迭代

### 1. jQuery中的顶级对象$

- DOM中的顶级对象是document——页面中的顶级对象；
  - document. 点出来的是DOM中的属性和方法
- BOM中的顶级对象是window——浏览器中的顶级对象；
  - window. 点出来的是浏览器中的属性和方法，document也属于window
- jQuery中的顶级对象是jQuery，简写为$;
  - $. 点出来的是jQuery中的方法
  - $()就是一个jQuery对象，例如\$(document)

### 2. DOM对象和jQuery对象互转

1. DOM对象（页面元素）---->jQuery对象

   - $(DOM对象)就是jQuery对象

2. jQuery对象（ $(选择器) ）---->DOM对象

   - $("#btn")[0]：就是id为btn的DOM对象
   - $("#btn").get(0)：就是id为btn的DOM对象
   - \$(".box>p")就是一个保存着所有p标签的伪数组，\$(".box>p")[0]就是第一个p元素，$(".box>p")[1]就是第二个，以此类推。

3. DOM对象和jQuery对象的属性和方法不能混用。

   ```javascript
   var btn = document.getElementById('btn');
   // DOM 注册事件，不可混用
   btn.onclick = function() {};
   // jQuery 注册事件，不可混用
   $("#btn").click(function() {});
   ```

### 3. 使用jQuery

- 下载使用。从 [jquery.com](http://jquery.com/download/) 下载 jQuery 库

```html
<head>
<script src="jquery-1.10.2.min.js"></script>
</head>
```

- 从 CDN 中载入 jQuery, 如从 Google 中加载 jQuery

```html
<head>
<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js">
</script>
</head>
```

### 4. jQuery语法

  jQuery 语法是通过选取 HTML 元素，并对选取的元素执行某些操作。

基础语法： **$(selector).action()**

- 美元符号定义 jQuery
- 选择符（selector）"查询"和"查找" HTML 元素
- jQuery 的 action() 执行对元素的操作

##### (1) 文件就绪事件

  为了防止文档在完全加载（就绪）之前运行 jQuery 代码，即在 DOM 加载完成后才可以对 DOM 进行操作，所有 jQuery 函数位于一个 document ready 函数中：

```javascript
$(document).ready(function(){
 
   // 开始写 jQuery 代码...
 
});
```

- 简洁写法（与以上写法效果相同）:

```javascript
$(function(){
 
   // 开始写 jQuery 代码...
 
});
```

- jQuery 入口函数:

```
$(document).ready(function(){
    // 执行代码
});
或者
$(function(){
    // 执行代码
});
```

- JavaScript 入口函数:

```
window.onload = function () {
    // 执行代码
}
```

- jQuery中实现和JS的window.onload一样的所有内容（包括图片之类的）加载完毕再执行的方式（可以多次使用，不会覆盖）：

```
$(window).load(function () {
  	// 执行代码
})
```

jQuery 入口函数（ready事件）与 JavaScript 入口函数（load事件）的区别：

- jQuery 的入口函数（ready事件）是在 html 所有标签(DOM)都加载之后，就会去执行。可以执行多次，第N次执行不会覆盖上一次。
- JavaScript 的 window.onload 事件是等到所有内容，包括外部图片之类的文件加载完后，才会执行。只能执行一次，如果执行第二次，第一次执行会被覆盖。**就是只执行最后一个**

##### (2) jQuery链

  通过 jQuery，可以把动作/方法链接在一起。Chaining 允许我们在一条语句中运行多个 jQuery 方法（在相同的元素上）。

* 使用链式编程的前提是链中的方法都返回当前元素

```javascript
// 把 css()、slideUp() 和 slideDown() 链接在一起。"p1" 元素首先会变为红色，然后向上滑动，再然后向下滑动：
$("#p1").css("color","red").slideUp(2000).slideDown(2000);
```

* jQuery 语法不是很严格；您可以按照希望的格式来写，包含换行和缩进。如下书写也可以很好地运行：

```javascript
$("#p1").css("color","red")
  .slideUp(2000)
  .slideDown(2000);
```

### 5. 多库共存

#### 5.1 noConflict释放$

* noConflict() 方法会释放对 $ 标识符的控制，这样其他脚本就可以使用它了。当然，您仍然可以通过全名替代简写的方式来使用 jQuery：

```javascript
$.noConflict();
jQuery(document).ready(function(){
  jQuery("button").click(function(){
    jQuery("p").text("jQuery 仍然在工作!");
  });
});
```

#### 5.2 自定义jQuery标识符

* 可以创建自己的简写。noConflict() 可返回对 jQuery 的引用，您可以把它存入变量，以供稍后使用。请看这个例子：

```javascript
var jq = $.noConflict();
jq(document).ready(function(){
  jq("button").click(function(){
    jq("p").text("jQuery 仍然在工作!");
  });
});
```

#### 5.3 依旧使用$

* 如果你的 jQuery 代码块使用 $ 简写，并且您不愿意改变这个快捷方式，那么您可以把 $ 符号作为变量传递给 ready 方法。这样就可以在函数内使用 $ 符号了 - 而在函数外，依旧不得不使用 "jQuery"：

```javascript
$.noConflict();
jQuery(document).ready(function($){
  $("button").click(function(){
    $("p").text("jQuery 仍然在工作!");
  });
});
```

## 二、 jQuery选择器

  jQuery 选择器基于元素的 ：

- id
- 类
- 元素类型
- 属性
- 属性值

等"查找"（或选择）HTML 元素。 它基于已经存在的 [CSS 选择器](https://www.runoob.com/cssref/css-selectors.html)，除此之外，它还有一些自定义的选择器。

- **jQuery 中所有选择器都以美元符号开头：$()。**
- jQuery中的选择器可以选中多个元素，对这样的选择器进行操作（如注册事件），则会对选中的所有元素注册事件

### 1. 标签选择器

  jQuery 标签选择器基于**标签名**选取元素。

- 在页面中选取所有 <p> 元素:

```
$("p")
```

- 实例：点击按钮隐藏所有p

```javascript
$(function () {
	$("button").click(function () {
		$("p").hide();
	})
})
```

### 2. id选择器

  jQuery #id 选择器通过 HTML 元素的 **id 属性**选取指定的元素。页面中元素的 id 应该是唯一的，所以您要在页面中选取唯一的元素需要通过 #id 选择器。

- 通过 id 选取元素语法如下：

```javascript
$("#test")
```

- 实例：点击按钮后，有 id="test" 属性的元素将被隐藏：

```javascript
$(function () {

	$("button").click(function () {
		$("#test").hide();
	})
})
```

### 3. 类选择器

  jQuery 类选择器可以通过指定的 **class** 查找元素。

- 通过.class选取元素的语法如下：

```
$(".test")
```

- 实例：点击按钮后所有带有 class="test" 属性的元素都隐藏：

```javascript
$(function () {
	$("button").click(function () {
		$(".test").hide();
	})
})
```

### 4. 属性（值）选择器

  jQuery 属性（值）选择器可以通过指定的**属性或属性值**查找元素。

- 通过[属性]选取元素的语法如下：

```j
$("[href]")
```

- 通过[属性=属性值]选取元素的语法如下：

```javascript
// 选取所有 target 属性值等于 "_blank" 的 <a> 元素（这也是一种交集选择器）
$("a[target='_blank']")
// 选取所有 target 属性值不等于 "_blank" 的 <a> 元素（这也是一种交集选择器）
$("a[target!='_blank']")
```

### 5. 标签.类（交集）选择器

  jQuery 中标签.类选择器对应于css中的交集选择器。

- 标签.类选择器语法如下：

```javascript
// 选取 class 为 box 的 <div> 元素
$("div.box")
```

### 6. 多条件（并集）选择器

  jQuery 中多条件（并集）选择器对应于css中的并集选择器。

- 多条件（并集）选择器语法如下：

```javascript
// 选取span、div和li元素
$("span,div,li")
```

### 7. 层次选择器

  jQuery 中层次选择器包括**后代**选择器和**子**选择器。

#### 7.1 后代选择器

  jQuery 中后代选择器对应于css中的后代选择器。

- 后代选择器语法如下：

```javascript
// 选择div后代（子、孙、...）中的p标签
$("div p")
```

#### 7.2 子选择器

  jQuery 中子选择器对应于css中的子选择器。

- 子选择器语法如下：

```javascript
// 选择div子代（不要孙）中的p标签
$("div>p")
```

### 8. 奇偶选择器

  jQuery 中的奇偶选择器可以选择某种类型的元素的奇数个或偶数（偶数从0开始）个。

- 当奇偶选择器遇上后代选择器时，所有后代（包括孙代）都参与奇偶顺序。

  ```html
  <ul>
  	<li> <!--奇偶序号0--> 
  		111111
  		<ul>
  			<li>111222</li> <!--奇偶序号1--> 
  		</ul>
  	</li>
  	<li>222222</li> <!--奇偶序号2--> 
  	<li>333333</li> <!--奇偶序号3--> 
  </ul>
  <script>
  	$(function () {
  		$("#test").click(function () {
            	// 选择奇偶序号0和2的li，由于序号1在序号0的li中，所以序号1的li也变色
  			$(".box>ul li:even").css("backgroundColor", "yellow");
  		});
  	});
  </script>
  ```

- 当奇偶选择器遇到多种标签，如`$("div>p:even")` ,p标签中间夹杂着div，奇偶排序会把div排除在外，只针对p


- 奇偶选择器的语法如下：

```javascript
// 选择ul子代里面的偶数位置上的li（0， 2， 4， ...）
$("ul>li:even")
// 选择ul子代里面的奇数位置上的li（1， 3， 5， ...）
$("ul>li:odd")
```

### 9. 索引选择器

  jQuery 中的索引选择器可以根据元素的索引获取元素（索引不需要显式声明，即按排列顺序从0开始）。

- eq(n): 索引等于n的元素
- gt(n):索引大于n的元素
- lt(n):索引小于n的元素
- 当索引选择器遇上后代选择器时，所有后代（包括孙代）都参与索引顺序。
- 当索引选择器遇到多种标签，如`$("div>p:eq(2)")` ,p标签中间夹杂着div，索引排序会把div排除在外，只针对p
- 索引选择器的语法如下

```javascript
// 选择ul子代里索引等于4的li元素
$("ul>li:eq(4)")
// 选择ul子代里索引大于4的li元素
$("ul>li:gt(4)")
// 选择ul子代里索引小于4的li元素
$("ul>li:lt(4)")
```

### 10. 其他选择器

| 选择器              | 语法                     | 描述                                       |
| ---------------- | ---------------------- | ---------------------------------------- |
| 通配符              | $("*")                 | 选取所有元素                                   |
| 事件中的this，指向当前事件源 | $(this)                | 选取当前 HTML 元素                             |
|                  | $("p:first")           | 选取第一个 <p> 元素                             |
|                  | $("ul li:first")       | 选取**第一个** <ul> 元素的**第一个** <li> 元素        |
|                  | $("ul li:first-child") | 选取**每个** <ul> 元素的**第一个** <li> 元素         |
|                  | $(":button")           | 选取所有 type="button" 的 <input> 元素 和 <button> 元素 |

## 三、jQuery动画效果

### 1. 显示/隐藏

#### 1.1 hide()

  hide()方法由jQuery选择器（DOM元素）调用，用于隐藏元素，语法：

```javascript
$(selector).hide(speed, bufferfun, callback);
```

- 可选的 speed 参数规定隐藏的速度，可以取以下值："slow"、"fast" 或毫秒。
- 可选的 bufferfun 参数规定使用哪种缓冲函数（过渡曲线）。jQuery自身提供"linear" 和 "swing"，其他可以使用相关的插件。
- 可选的 callback 参数是隐藏完成后所执行的函数名称。

```javascript
$("button").click(function(){
  	$("p").hide(1000);
});
```

#### 1.2 show()

  show()方法由jQuery选择器（DOM元素）调用，用于显示元素，语法：

```
$(selector).show(speed, bufferfun, callback);
```

- 可选的 speed 参数规定显示的速度，可以取以下值："slow"、"fast" 或毫秒。
- 可选的 bufferfun 参数规定使用哪种缓冲函数（过渡曲线）。jQuery自身提供"linear" 和 "swing"，其他可以使用相关的插件。
- 可选的 callback 参数是显示完成后所执行的函数名称。

```javascript
// <button id="test">隐藏</button>
// <div class="box"></div>

$(function () {
	var show = true;
	$("#test").click(function () {
		if (show) {
			this.innerText = "显示";
			show = !show;
			$(".box").hide(1000, "swing");
		} else {
			this.innerText = "隐藏";
			show = !show;
			$(".box").show(1000, "linear");
		}
	});
});
```

#### 1.3 toggle()

  toggle()方法由jQuery选择器（DOM元素）调用，用于**显示元素已隐藏**的元素/**隐藏已显示**的元素，语法：

```
$(selector).toggle(speed, bufferfun, callback);
```

- 可选的 speed 参数规定显示的速度，可以取以下值："slow"、"fast" 或毫秒。
- 可选的 bufferfun 参数规定使用哪种缓冲函数（过渡曲线）。jQuery自身提供"linear" 和 "swing"，其他可以使用相关的插件。
- 可选的 callback 参数是隐藏或显示完成后所执行的函数名称。

```javascript
$(function () {
	$("#test").click(function () {
		$(".box").toggle(1000, "swing");
	});
});
```

### 2. 淡入淡出（显示/隐藏）

  通过 jQuery，可以实现元素的淡入淡出效果。

#### 2.1 fadeIn()

  fadeIn() 用于淡入已隐藏的元素。语法：

```javascript
$(selector).fadeIn(speed, callback);
```

- 可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
- 可选的 callback 参数是 fading 完成后所执行的函数名称。

```javascript
$(function () {
	$(".box").hide();
	$("#test").click(function () {
		$(".box").fadeIn();
	});
});
```

#### 2.2 fadeOut()

  fadeOut() 用于淡出可见的元素。语法：

```javascript
$(selector).fadeIn(speed, callback);
```

- 可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
- 可选的 callback 参数是 fading 完成后所执行的函数名称。

```javascript
$(function () {
	$("#test").click(function () {
		$(".box").fadeOut();
	});
});
```

#### 2.3 fadeToggle()

  fadeToggle() 方法可以在 fadeIn() 与 fadeOut() 方法之间进行切换。如果元素已淡出，则 fadeToggle() 会向元素添加淡入效果。如果元素已淡入，则fadeToggle() 会向元素添加淡出效果。语法：

```
$(selector).fadeToggle(speed,callback);
```

- 可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
- 可选的 callback 参数是 fading 完成后所执行的函数名称。

```javascript
$(function () {
	$("#test").click(function () {
		$(".box").fadeToggle();
	});
});
```

#### 2.4 fadeTo()

  fadeTo() 方法将选择器指定的元素**渐变为**给定的不透明度（值介于 0 与 1 之间）。语法：

```javascript
$(selector).fadeTo(speed,opacity,callback);
```

- 必需的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
- 必需的 opacity 参数将淡入淡出效果设置为给定的不透明度（值介于 0 与 1 之间）。
- 可选的 callback 参数是该函数完成后所执行的函数名称。

```javascript
$(function () {
	$("#test").click(function () {
		$(".box").fadeTo("slow", 0.3);
	});
});
```

### 3. 上下滑动（隐藏/显示）

  通过 jQuery，可以在元素上创建滑动效果。滑动效果是：

- 隐藏的元素像卷帘门放下一样向下滑动显示
- 显示的元素像卷帘门拉起一样向上滑动隐藏

#### 3.1 slideDown()

  slideDown() 方法用于（隐藏的元素）向下滑动显示。语法：

```javascript
$(selector).slideDown(speed, callback);
```

- 可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
- 可选的 callback 参数是滑动完成后所执行的函数名称。

```javascript
$(function () {
	$(".box").hide();
	$("#test").click(function () {
		$(".box").slideDown();
	});
});
```

#### 3.2 slideUp()

  slideUp() 方法用于（显示的元素）向上滑动隐藏。语法：

```javascript
$(selector).slideUp(speed, callback);
```

- 可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
- 可选的 callback 参数是滑动完成后所执行的函数名称。

```javascript
$(function () {
	$("#test").click(function () {
		$(".box").slideUp();
	});
});
```

#### 3.3 slideToggle()

  slideToggle() 方法可以在 slideDown() 与 slideUp() 方法之间进行切换。如果元素向下滑动，则 slideToggle() 可向上滑动它们。如果元素向上滑动，则 slideToggle() 可向下滑动它们。语法：

```javascript
$(selector).slideToggle(speed, callback);
```

- 可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
- 可选的 callback 参数是滑动完成后所执行的函数名称。

```javascript
$(function () {
	$("#test").click(function () {
		$(".box").slideToggle();
	});
});
```

### 4. 自定义动画

#### 4.1 animate()方法

  jQuery animate() 方法用于创建自定义动画。语法：

```javascript
$(selector).animate({params},speed,callback);
```

* 必需的 params 参数定义形成动画的 CSS 属性。这些属性几乎包括所有的css属性（除了颜色，如果需要生成颜色动画，需要从 [jquery.com](http://jquery.com/download/) 下载 [颜色动画](http://plugins.jquery.com/color/) 插件。）。要改变位置需先设置css定位属性为relative、fixed 或 absolute。
* 可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
* 可选的 callback 参数是动画完成后所执行的函数名称。

```javascript
$(function () {
	$("#test").click(function () {
		$(".box").animate({left:'250px'}, 1000);
	});
});
```

#### 4.2 操作多个属性

* 可以使用animate一次操作多个css属性

```javascript
$(function () {
	$("#test").click(function () {
		$(".box").animate({
			left:'250px',
			top:'250px',
			height:'100px',
			width:'100px'
		}, 1000);
	});
});
```

#### 4.3 使用相对值

* 可以定义相对值（该值相对于元素的当前值）。需要在值的前面加上 += 或 -=：

```javascript
$(function () {
	$("#test").click(function () {
		$(".box").animate({
			left:'250px',
			top:'250px',
			height:'+=100px',
			width:'+=100px'
		}, 1000);
	});
});
```

#### 4.4 使用预定义的值

* 可以把属性的动画值设置为 "show"、"hide" 或 "toggle"：
* show：就是保持原有的css属性
* hide：就是把css值设为默认（例如宽高是0，定位是display: none）
* toggle：就是在show和hide两种状态之间交替

```javascript
$(function () {
	$("#test").click(function () {
		$(".box").animate({
			left:'250px',
			top:'250px',
          	// 一次点击，高度变为0；再次点击，高度变为10px（css中设置的）
			height:'toggle',
			width:'100px'
		}, 1000);
	});
});
```

#### 4.5 队列功能

  jQuery 提供针对动画的队列功能。这意味着：

* 对某个元素编写多个 animate() 调用，jQuery 会创建包含这些方法调用的"内部"队列。然后逐一运行这些 animate 调用。

```javascript
$(function () {
	$("#test").click(function () {
		$(".box").animate({height:'300px',opacity:'0.4'},"slow");
		$(".box").animate({width:'300px',opacity:'0.8'},"slow");
		$(".box").animate({height:'100px',opacity:'0.4'},"slow");
		$(".box").animate({width:'100px',opacity:'0.8'},"slow");
	});
});
// 链式实现，与上面一样
$(function () {
	$("#test").click(function () {
		$(".box").animate({height:'300px',opacity:'0.4'},"slow").animate({width:'300px',opacity:'0.8'},"slow").animate({height:'100px',opacity:'0.4'},"slow").animate({width:'100px',opacity:'0.8'},"slow");
	});
});
```

#### 4.6 stop()停止动画

  jQuery stop() 方法用于停止动画或效果，在它们完成之前。

* stop() 方法适用于所有 jQuery 效果函数，包括滑动、淡入淡出和自定义动画。

**语法:**

```javascript
$(selector).stop(stopAll,goToEnd);
```

* 可选的 stopAll 参数规定是否应该清除动画队列。默认是 false，即仅停止活动的动画，允许任何排入队列的动画向后执行。
* 可选的 goToEnd 参数规定是否立即完成当前动画。默认是 false。

```
// 停止当前动画，开始后续动画
$(".box").stop();
// 停止所有动画
$(".box").stop(true);
// 停止动画，但把当前动画的动作瞬间完成
$(".box").stop(true, true);
```

### 5. callback

  jQuery中的动画效果（显示、隐藏、淡入淡出、上下滑动、自定义动画）都可以使用回调函数使动画结束后执行相应的操作。

* 立即停止的动画不会触发回调，即`$("选择器").stop()`
* 被立即完成的动画会触发回调，即`$("选择器").stop(false, ture)` （停止当前动画，立即完成动作，触发回调）
* 如果动画有队列的话，想实现其快速完成所有动画并停止，就要相应的与队列数对应条数的停止语句。

## 四、jQuery操作DOM

### 1. jQuery获得内容

#### 1.1 html()

- $("选择器").html()方法。设置或返回标签中间显示的其他标签及内容,类似于 innerHTML
- 参数（可选）：字符串，要设置的内容（其中的标签会被解析）
- 返回值：**有参数**返回调用html方法的jQuery元素
- 返回值：**无参数**返回当前标签内部的其他标签及内容（无参数不能链式编程）

> 用html(string)的方法设置内容，若string（html标签）中有style行内样式，且行内样式中有路径，路径中的斜杠“/”会被替换为空格。
>
> 这种情况需要先添加HTML元素，再通过css()方法设置样式
>
> ```
> $(items[0]).html('<a href="javascript:;" class="pcImg" style="background-image: url("./images/slide_02_640x340.jpg")"></a>');
> // 会得到如下的结果
> <div class="item" data-attr-name="image1">
> 	<a href="javascript:;" class="pcImg" style="background-image: url(" . images slide_02_640x340.jpg")"=""></a>
> </div>
> ```
>
> 其他情况下的斜杠“/”不会被替换为空格，例如img的src属性中的路径可以正常添加

#### 1.2 text()

- $("选择器").text()方法。设置或返回标签中间显示的文本内容,类似于 innerText
- 参数（可选）：字符串，要设置的内容（其中的标签不会被解析）
- 返回值：**有参数**返回调用text方法的jQuery元素
- 返回值：**无参数**返回当前标签内部的内容（无参数不能链式编程）

#### 1.3 val()

- $("选择器").val()方法。设置或返回表单中value的值,类似于value。

- 参数（可选）：字符串，要设置的表单值

- 返回值：**有参数**返回调用val方法的jQuery元素

- 返回值：**无参数**返回当前表单的value属性值（无参数不能链式编程）

- 小应用：对下拉框中的选项设置val()，可以让这一项成为默认选中的。

  ```html
  <select name="se" id="sel">
  	<option value="1">北京</option>
  	<option value="2">上海</option>
  	<option value="3">南京</option>
  	<option value="4">深圳</option>
  </select>
  <script>
    	// 点击按钮使select中的value值为3的南京被选中
  	$("#test").click(function () {
  		console.log($("#sel").val(3));
      })
  </script>
```
  

#### 1.4 text()、html()、val() 的回调函数

  text()、html() 以及 val()，同样拥有回调函数。回调函数有两个参数：

* 参数1：被选元素列表（调用这三个函数的jQuery对象）中当前元素的下标
* 参数2：原始（旧的）值。
* 回调函数的返回值被用作新的要设置的值。

```javascript
// 点击按钮，把$("#test1")元素的innerText值设置为："旧文本: " + origText + " 新文本: Hello world! (index: " + i + ")"
$("#btn1").click(function(){
    $("#test1").text(function(i,origText){
        return "旧文本: " + origText + " 新文本: Hello world! (index: " + i + ")"; 
    });
});
```

#### 1.5 data()

* $("选择器").data()方法。在元素上存放数据。如果jQuery集合指向多个元素，那将在所有元素上设置对应数据。
* 参数1：字符串，要设置的属性名
* 参数2：值，可以是字符串，数值等
* 返回值：返回jQuery对象。



* $("选择器").data()方法。在元素上取出数据。
* 参数：要获取的属性名。
* 返回值：属性值

> 被封装成jQuery对象的DOM对象中会有一个形如jQuery35102868211179968132的对象，里面以键值对的形式存放着**通过data方法设置的属性** 和**通过html标签中的data-name方式设置的属性** 。data()方法设置的属性不会放到DOM元素的dataset属性中

> 所以使用data()可以读取到**通过data方法设置的属性** 和**通过html标签中的data-name方式设置的属性** 

> 而通过attr()和prop()设置的属性就是html标签的属性，和其他html标签属性一起存放在DOM元素的attributes属性中

#### 1.6 attr()和prop()

* $("选择器").attr()方法。获取属性值。也可以设置属性值
* 参数（必须）：字符串，要获取的属性名
* 返回值：要获取的属性值，如果没有相应的属性，返回值是 undefined



* $("选择器").attr()方法。设置属性值。

* 参数（必须）：键值对，一个属性可以使用`$("选择器").attr("href","http://www.runoob.com/jquery");`

* 参数：多个属性

  ```javascript
  $("选择器").attr({
  	"href" : "http://www.r.com",
      "title" : "jQuery 教程"
  });
  ```

* 返回值：设置属性时返回调用attr方法的jQuery元素



* $("选择器").prop()方法。获取属性值。**也可以设置属性值，类似于attr** 。
* 参数（必须）：字符串，要获取的属性名
* 返回值：要获取的属性值，如果没有相应的属性，返回值是 空字符串



* 对于 HTML 元素本身就带有的固有属性，在处理时，建议使用 **prop** 方法。
* 对于 HTML 元素我们自己自定义的 DOM 属性，在处理时，建议使用 **attr** 方法。

#### 1.7 attr() 和prop() 的回调函数

  jQuery 方法 attr() 和prop()，也提供回调函数。回调函数有两个参数：

* 参数1：被选元素列表（调用这三个函数的jQuery对象）中当前元素的下标
* 参数2：原始（旧的）值。
* 回调函数的返回值被用作新的要设置的值。

```javascript
// 点击按钮设置$("#runoob")元素的"href"属性的值为：旧值 + "/jquery"
$("button").click(function(){
  $("#runoob").attr("href", function(i,origValue){
    return origValue + "/jquery"; 
  });
});
```

#### 1.8 总结：获取值不能链式

  **text()、html() 、val()、attr() 和prop() 获取值的时候不能用在链式编程中，设置值的时候可以。**

### 2. jQuery添加元素

#### 2.1 append()

  append() 可以在被选元素的结尾插入内容（新内容仍然在该元素内部）

```javascript
// 在p标签中添加"追加文本"，没有添加HTML标签
$("p").append("追加文本");
```

* append() 方法可以添加新DOM元素
* 参数：字符串、jQuery元素、DOM元素均可，个数不限
* 参数：text/HTML字符串
* 参数：jQuery对象
* 参数：JavaScript/DOM元素
* 返回值：被选元素（即调用append的元素）
* 如果参数是已有的DOM元素（对应的jQuery元素），则会把原位置的DOM元素移除，追加到指定的新位置

```javascript
function appendText(){
    var txt1="<p>文本-1。</p>";              // 使用 HTML 标签创建文本
    var txt2=$("<p></p>").text("文本-2。");  // 使用 jQuery 创建文本
    var txt3=document.createElement("p");
    txt3.innerHTML="文本-3。";               // 使用 DOM 创建文本 text with DOM
    $("body").append(txt1,txt2,txt3);        // 追加新元素
}
```

#### 2.2 appendTo()

  $("选择器").appendTo(jQuery对象)可以把被选元素（选择器）追加到参数指定的元素（jQuery对象）的结尾（新内容仍然在指定的元素（jQuery对象）内部）

* 参数：要追加的位置（jQuery对象内部）
* 返回值：被追加的内容（不能链式）

```javascript
function appendText(){
    var txt2=$("<p></p>").text("文本-2。");  // 使用 jQuery 创建文本
    txt2.appendTo($("body"));        // 把txt2追加到$("body")的末尾
}
```

#### 2.3 prepend()

  prepend() 可以在被选元素的开始插入内容（新内容仍然在该元素内部）

```javascript
// 在p标签中添加"在开头追加文本"，没有添加HTML标签
$("p").prepend("在开头追加文本");
```

- prepend() 方法可以添加新DOM元素
- 参数：字符串、jQuery元素、DOM元素均可，个数不限
- 参数：text/HTML字符串
- 参数：jQuery对象
- 参数：JavaScript/DOM元素
- 返回值：被选元素（即调用prepend的元素）

```javascript
function prependText(){
    var txt1="<p>文本-1。</p>";              // 使用 HTML 标签创建文本
    var txt2=$("<p></p>").text("文本-2。");  // 使用 jQuery 创建文本
    var txt3=document.createElement("p");
    txt3.innerHTML="文本-3。";               // 使用 DOM 创建文本 text with DOM
    $("body").prepend(txt1,txt2,txt3);        // 在开头追加新元素
}
```

#### 2.4 after()

  after() 可以在被选元素之后插入内容（新内容该元素外部）

```javascript
// 在p标签后面添加"在后面追加文本"，没有添加HTML标签
$("p").after("在后面追加文本");
```

- after() 方法可以添加新DOM元素
- 参数：字符串、jQuery元素、DOM元素均可，个数不限
- 参数：text/HTML字符串
- 参数：jQuery对象
- 参数：JavaScript/DOM元素
- 返回值：被选元素（即调用after的元素）

```javascript
function afterText(){
    var txt1="<p>文本-1。</p>";              // 使用 HTML 标签创建文本
    var txt2=$("<p></p>").text("文本-2。");  // 使用 jQuery 创建文本
    var txt3=document.createElement("p");
    txt3.innerHTML="文本-3。";               // 使用 DOM 创建文本 text with DOM
    $(".box").after(txt1,txt2,txt3);        // 在当前元素后面追加新元素
}
```

#### 2.5 before()

  before() 可以在被选元素之前插入内容（新内容该元素外部）

```javascript
// 在p标签前面添加"在前面追加文本"，没有添加HTML标签
$("p").before("在前面追加文本");
```

- before() 方法可以添加新DOM元素
- 参数：字符串、jQuery元素、DOM元素均可，个数不限
- 参数：text/HTML字符串
- 参数：jQuery对象
- 参数：JavaScript/DOM元素
- 返回值：被选元素（即调用before的元素）

```javascript
function beforeText(){
    var txt1="<p>文本-1。</p>";              // 使用 HTML 标签创建文本
    var txt2=$("<p></p>").text("文本-2。");  // 使用 jQuery 创建文本
    var txt3=document.createElement("p");
    txt3.innerHTML="文本-3。";               // 使用 DOM 创建文本 text with DOM
    $(".box").before(txt1,txt2,txt3);        // 在当前元素前面追加新元素
}
```

#### 2.6 clone()克隆元素

  $("选择器").clone()方法可以克隆被选元素。返回克隆后的新元素（包括其子元素）（再通过append追加到指定位置）。

* 参数（可选）：布尔值，指定元素的事件处理函数是否被复制，默认false
* 返回值：返回克隆后的新元素（包括其子元素）

### 3. jQuery删除元素

#### 3.1 remove()

  jQuery remove() 方法删除**被选元素及其子元素**。

```javascript
// 删除$("#div1")
$("#div1").remove();
```

* remove() 方法也可接受一个参数，允许您对被删元素进行过滤。即删除所有符合此过滤器的元素。该参数可以是任何 jQuery 选择器的语法。
* 使用过滤的前提是$("#div1")是一个列表（伪数组），过滤器仅对这个列表中符合条件的元素进行删除。其不符合条件的元素的子元素（即使符合条件）也不会被删除。

```javascript
// 删除 class="italic" 的所有 <p> 元素：
$("p").remove(".italic");
```

#### 3.2 empty()

  jQuery empty() 方法删除**被选元素的子元素**。即保留被选元素本身。

```javascript
// 删除$("#div1")的子元素，保留div1本身
$("#div1").empty();
```

#### 3.3 html("")

  使用\$("选择器").html("")方法设置元素内容为空，即可清除\$("选择器")的内容。

### 4. jQuery CSS操作

#### 4.1 css()获取或设置css属性

##### (1) 获取css属性值（不能链式）

* $("选择器").css("属性名")方法。获取选择器中第一个元素指定的属性值（字符串）。

```javascript
// 返回首个匹配元素的 background-color 值：
$("p").css("background-color");
```

##### (2) 设置css属性值

- $("选择器").css()方法。设置元素的样式, 类似于style，行内样式
- 参数：键值对
- 只设置一个属性：`$("选择器").css("backgroundColor", "yellow")`
  * 第二个参数可以是一个匿名函数，返回一个颜色值
- 设置多组属性：`$("选择器").css({"backgroundColor":"yellow", "height":"300px", "width":"300px"})`
- 返回值：调用css()方法的元素列表

#### 4.2 addClass()

- $("选择器").addClass()方法。添加类样式（已有的类样式不删除），相当于修改标签的class属性
- 参数：添加单个类样式`$("选择器").addClass("类名")`
- 参数：添加多个类样式`$("选择器").addClass("类名1 类名2")`
- 多个类样式有冲突的属性，由css的层叠性决定
- 返回值：调用addClass()方法的元素列表

#### 4.3 removeClass()

- $("选择器").removeClass()方法。移除类样式，相当于修改标签的class属性
- 参数：移除一个类样式`$("选择器").removeClass("类名")`
- 参数：移除多类样式`$("选择器").removeClass("类名1 类名2")`
- 参数：移除全部类样式`$("选择器").removeClass()`
- 返回值：调用removeClass()方法的元素列表

#### 4.4 toggleClass()

* $("选择器").toggleClass()方法。每运行一次就对被选元素进行添加/删除类的切换操作，相当于修改标签的class属性
* 参数：单个类样式`$("选择器").addClass("类名")`
* 参数：多个类样式`$("选择器").addClass("类名1 类名2")`
* 多个类样式有冲突的属性，由css的层叠性决定
* 返回值调用toggleClass()方法的元素列表

#### 4.5 hasClass()

- $("选择器").hasClass()方法。查询类样式，检测当前元素是否应用了指定的类样式
- 参数：`$("选择器").hasClass("类名")`
- 返回值：应用了返回true，没应用返回false

### 5. jQuery尺寸

![](../../image/jQuery/img_size.gif)

* 唯一需要注意的地方，设置了 box-sizing 后，width() 获取的是 css 设置的 width 减去 padding 和 border 的值。（此时css中的width和height是包括padding和border的）

#### 5.1 width()/height()

* width() 方法设置或返回元素的宽度（不包括内边距、边框或外边距）。设置css行内样式
* height() 方法设置或返回元素的高度（不包括内边距、边框或外边距）。设置css行内样式
* 参数：字符串，要设置的宽度/高度值`"200px"`
* 返回值：有参数时返回当前选中的元素列表
* 返回值：无参数时返回获取的数值（不能链式编程）

```javascript
$(".wrap").width();
$(".wrap").height("200px");
// 获取视口宽度(屏幕宽度)
$(window).width();
```

#### 5.2 innerWidth()/innerHeight()

* innerWidth() 方法返回元素的宽度（包括内边距）。设置css行内样式（用作设置时会将**设置的值**自动减去css设置的padding，以剩下的数值为内容宽度）
* innerHeight() 方法返回元素的高度（包括内边距）。设置css行内样式（用作设置时会将**设置的值**自动减去css设置的padding，以剩下的数值为内容高度）
* 参数：字符串，要设置的宽度/高度值`"200px"`
* 返回值：有参数时返回当前选中的元素列表
* 返回值：无参数时返回获取的数值（不能链式编程）

```javascript
$(".wrap").innerWidth();
$(".wrap").innerHeight("200px");
```

#### 5.3 outerWidth()/outerHeight()

* outerWidth() 方法返回元素的宽度（包括内边距和边框）。设置css行内样式（用作设置时会将**设置的值**自动减去css设置的padding和border，以剩下的数值为内容宽度）
* outerHeight() 方法返回元素的高度（包括内边距和边框）。设置css行内样式（用作设置时会将**设置的值**自动减去css设置的padding和border，以剩下的数值为内容高度）
* 参数：字符串，要设置的宽度/高度值`"200px"`
* 参数：true，获取元素的宽度/高度（带padding、border、margin）
* 返回值：有参数时返回当前选中的元素列表
* 返回值：无参数时返回获取的数值（不能链式编程）

```javascript
$(".wrap").outerWidth();
$(".wrap").outerHeight("200px");
```

### 6. jQuery位置

#### 6.1 offset()

* $("选择器").offset()方法用于获取或设置定位元素的位置。
* 参数：对象，用于设置left和top值`{"left":200, "top":200}`
* 返回值：被选对象的css位置属性对象（对象的属性就是css属性）

```javascript
// 获取left和top值
$("#box").offset().left;
$("#box").offset().top;
// 设置被选对象的left和top值
$("#box").offset({"left":200, "top":200});
```

#### 6.2 scrollTop()/scrollLeft()

* $("选择器").scrollTop()方法用于获取或设置被选元素向上滚动出去的距离。
* $("选择器").scrollLeft()方法用于获取或设置被选元素向左滚动出去的距离。
* 参数：数值。设置相对滚动条顶部/左侧的偏移，一般针对document。`$(document).scrollTop(300)`
* 返回值：有参数用于设置滚动距离时，返回被选元素
* 返回值：无参数用于获取滚动距离时（一般获取document的滚动距离`$(document).scrollTop()`），返回滚动距离数值

## 五、jQuery遍历

### 1. 向上遍历 

#### 1.1 parent()

* $("选择器").parent() 方法返回被选元素（列表）的直接父元素（列表）。即如果选择器选中的是多个元素，则把每一个元素的直接父元素放在伪数组中返回。
* 参数（可选）：字符串，选择器，获取符合选择器筛选的直接父元素
* 返回值：所有被选元素的直接父元素伪数组。
* 该方法只会向上一级对 DOM 树进行遍历。

```javascript
// 返回每个 <span> 元素的直接父元素：
$(document).ready(function(){
  $("span").parent();
});
```

#### 1.2 parents()

* $("选择器").parents() 方法返回每一个被选元素的所有祖先元素，它一路向上直到文档的根元素 (<html>)。
* 参数（可选）：字符串，选择器，获取符合选择器筛选的祖先元素
* 返回值：每一个被选元素的祖先元素组成的伪数组。

```javascript
// 返回所有 <span> 元素的所有祖先，并且它是 <ul> 元素：
$(document).ready(function(){
  $("span").parents("ul");
});
```

#### 1.3 parentsUntil()

* $("选择器").parentsUntil("选择器") 方法返回介于两个给定元素之间的所有祖先元素。即以每一个被选元素开始向上找它们各自的祖先元素，直到遇到第一个“参数所指定的元素”（不包含）停止。
* 参数（可选）：字符串，选择器，规定向上遍历的停止元素。如果没有参数，则默认是`"html"`
* 返回值：在被选元素和参数指定元素之间的所有祖先元素（伪数组）

```javascript
// 返回介于 <span> 与 <div> 元素之间的所有祖先元素：
$(document).ready(function(){
  $("span").parentsUntil("div");
});
```

### 2. 向下遍历

#### 2.1 children()

* $("选择器").children() 方法返回每一个被选元素的所有直接子元素（组成的伪数组）。
* 参数（可选）：字符串，选择器，获取符合此选择器筛选的直接子元素（伪数组）
* 返回值：每一个被选元素的所有直接子元素（组成的伪数组）
* 该方法只会向下一级对 DOM 树进行遍历。

```javascript
// 返回类名为 "1" 的所有 <p> 元素，并且它们是 <div> 的直接子元素：
$(document).ready(function(){
  $("div").children("p.1");
});
```

#### 2.2 find()

* $("选择器").find() 方法返回每一个被选元素的后代元素，一路向下直到最后一个后代。
* 参数（可选）：字符串，选择器，获取符合此选择器筛选的所有后代元素（伪数组）
* 返回值：每一个被选元素的后代元素（组成的伪数组）

```javascript
// 返回属于 <div> 后代的所有 <span> 元素：
$(document).ready(function(){
  $("div").find("span");
});
```

### 3. 同级遍历

#### 3.1 siblings()

* $("选择器").siblings() 方法返回每一个被选元素的所有兄弟元素（伪数组）。
* 参数（可选）：字符串，选择器。获取符合参数筛选的兄弟元素。
* 返回值：每一个被选元素的符合参数筛选的兄弟元素（伪数组）。

```javascript
// 返回属于 <h2> 的同胞元素的所有 <p> 元素：
$(document).ready(function(){
  $("h2").siblings("p");
});
```

#### 3.2 next()

* $("选择器").next() 方法返回每一个被选元素的下一个兄弟元素。
* 参数（可选）：字符串，选择器。获取每一个被选元素的下一个兄弟元素中符合参数筛选的元素。
* 返回值：获取每一个被选元素的下一个兄弟元素 中符合参数筛选的元素（伪数组）。

```javascript
// 返回 <h2> 的下一个同胞元素：
$(document).ready(function(){
  $("h2").next();
});
```

#### 3.3 nextAll()

- $("选择器").nextAll() 方法返回每一个被选元素的**所有跟随**的兄弟元素。
- 参数（可选）：字符串，选择器。获取每一个被选元素的**所有跟随** 的兄弟元素中符合参数筛选的元素。
- 返回值：获取每一个被选元素的**所有跟随** 的兄弟元素 中符合参数筛选的元素（伪数组）。

```javascript
// 返回 <h2> 的所有跟随的同胞元素：
$(document).ready(function(){
  $("h2").nextAll();
});
```

#### 3.4 nextUntil()

* $("选择器").nextUntil("选择器") 方法返回介于两个给定参数（选择器）之间的所有跟随（每一个被选元素）的兄弟元素。
* 参数（可选）：字符串，选择器。如果没有此参数，则默认为所有跟随的兄弟元素
* 返回值：介于两个给定参数（选择器）之间的所有跟随（每一个被选元素）的兄弟元素（伪数组）。

```javascript
// 返回介于 <h2> 与 <h6> 元素之间的所有同胞元素：
$(document).ready(function(){
  $("h2").nextUntil("h6");
});
```

#### 3.5 prev()

* 与next()方法类似，方向相反（向上）

#### 3.6 prevAll()

* 与nextAll()方法类似，方向相反（向上）

#### 3.7 prevUntil()

* 与nextUntil()方法类似，方向相反（向上）

#### 3.8 each()

* 当需要对一个选择器选中的多个元素进行不同的操作时，可以使用each方法
* 参数1（可选）：数组。如果使用了参数1，each的功能就是遍历数组，为每一个数组元素执行一次callback，使用$.each(arr, callback)即可
* 参数2：回调函数，callback，each会传递给callback两个参数（被选元素列表的索引, 被选元素列表里的DOM元素）
* callback返回 'false' 将停止循环 (就像在普通的循环中使用 'break')。返回 'true' 跳至下一个循环(就像在普通的循环中使用'continue')。
* each()回调函数callback中的this是当前遍历到的DOM元素（同value），$(this)是当前遍历到的jQuery元素。

```javascript
// 为每一个li设置不同的透明度
$("ul>li").each(function (index, element) {
  	$(element).css("opacity", (index + 1) / 10);
})
```

### 4. 过滤

#### 4.1 first()

* $("选择器").first() 方法返回被选元素（伪数组）的首个元素。
* 参数：无
* 返回值：被选元素（伪数组）的首个元素。

```javascript
// 选取首个 <div> 元素内部的第一个 <p> 元素：
$(document).ready(function(){
  $("div p").first();
});
```

#### 4.2 last()

- $("选择器").last() 方法返回被选元素（伪数组）的最后一个元素。
- 参数：无
- 返回值：被选元素（伪数组）的最后一个元素。

```javascript
// 选择最后一个 <div> 元素中的最后一个 <p> 元素：
$(document).ready(function(){
  $("div p").last();
});
```

#### 4.3 eq()

* $("选择器").eq() 方法返回被选元素（伪数组）中带有指定索引号的元素。
* 参数：索引（从0开始）。若索引为-n，则返回被选元素（伪数组）中倒数第n个元素
* 返回值：返回被选元素（伪数组）中带有指定索引号的元素。

```javascript
// 选取第二个 <p> 元素（索引号 1）：
$(document).ready(function(){
  $("p").eq(1);
});
```

#### 4.4 filter()

* $("选择器").filter() 方法允许您规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回。
* 参数（可选）：字符串，选择器。无参数则返回的伪数组为空
* 返回值：被选元素中符合参数筛选的元素（伪数组）

```javascript
// 返回带有类名 "url" 的所有 <p> 元素：
$(document).ready(function(){
  $("p").filter(".url");
});
```

#### 4.5 not()

* $("选择器").not() 方法返回不匹配参数选择器标准的所有元素。与 filter() 相反。
* 参数（可选）：字符串，选择器。无参数则返回所有被选元素（伪数组）
* 返回值：被选元素中不符合参数筛选的元素（伪数组）

```javascript
// 返回不带有类名 "url" 的所有 <p> 元素：
$(document).ready(function(){
  $("p").not(".url");
});
```

## 六、jQuery事件

  在 jQuery 中，大多数 DOM 事件都有一个等效的 jQuery 方法。

#### 6.1 常见DOM事件

| 鼠标事件                                     | 键盘事件                                     | 表单事件                                     | 文档/窗口事件                                  |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| [click](https://www.runoob.com/jquery/event-click.html) | [keypress](https://www.runoob.com/jquery/event-keypress.html) | [submit](https://www.runoob.com/jquery/event-submit.html) | [load](https://www.runoob.com/jquery/event-load.html) |
| [dblclick](https://www.runoob.com/jquery/event-dblclick.html) | [keydown](https://www.runoob.com/jquery/event-keydown.html) | [change](https://www.runoob.com/jquery/event-change.html) | [resize](https://www.runoob.com/jquery/event-resize.html) |
| [mouseenter](https://www.runoob.com/jquery/event-mouseenter.html) | [keyup](https://www.runoob.com/jquery/event-keyup.html) | [focus](https://www.runoob.com/jquery/event-focus.html) | [scroll](https://www.runoob.com/jquery/event-scroll.html) |
| [mouseleave](https://www.runoob.com/jquery/event-mouseleave.html) |                                          | [blur](https://www.runoob.com/jquery/event-blur.html) | [unload](https://www.runoob.com/jquery/event-unload.html) |
| [hover](https://www.runoob.com/jquery/event-hover.html) |                                          |                                          |                                          |

#### 6.2 常用的事件

1. click() 点击事件

   - click() 方法是当按钮点击事件被触发时会调用一个函数。该函数在用户点击 HTML 元素时执行。

2. dblclick() 双击事件

   - 当双击元素时，会发生 dblclick 事件。

3. mouseenter() 鼠标指针穿过（进入）元素

   - 当鼠标指针穿过元素时，会发生 mouseenter 事件。

4. mouseleave() 鼠标指针离开元素

   - 当鼠标指针离开元素时，会发生 mouseleave 事件。

5. mousedown() 按下鼠标按键

   - 当鼠标指针移动到元素上方，并按下鼠标按键时，会发生 mousedown 事件。

6. mouseup() 松开鼠标按钮

   - 当在元素上松开鼠标按钮时，会发生 mouseup 事件。

7. hover() 方法用于模拟光标悬停事件。（光标进出事件）

   - hover() 方法接收两个参数（都是函数）
   - 当鼠标移动到元素上时，会触发指定的第一个函数(mouseenter);当鼠标移出这个元素时，会触发指定的第二个函数(mouseleave)。

   ```javascript
   $(function () {
   	$("#test").hover(function () {
   			alert('你进来了！');
   		},
   		function () {
   			alert('拜拜，你出去了！');
   		}
   	)
   })
   ```

   

8. focus() 获得焦点

   - 当元素获得焦点时，发生 focus 事件。
   - 当通过鼠标点击选中元素或通过 tab 键定位到元素时，该元素就会获得焦点。

9. blur() 失去焦点

   - 当元素失去焦点时，发生 blur 事件。

10. scroll()滚动

* 当页面滚动时，发生scroll事件，一般的调用者时\$(window)或\$(document)

11. change()改变

* 当选择框（select标签）中的选项被选中时触发（select标签改变）

#### 6.3 jQuery绑定事件

##### (1) 选择器.事件名(函数)

  在 jQuery 中，事件名被封装成事件注册函数，使用`选择器.事件名(事件处理函数)` 的方式为元素注册事件。如：

* 可以通过链式编程的语法为一个元素添加多个事件`$("p").click(function(){}).mouseover(function(){})`;

```javascript
$("p").click(function(){
  	$(this).hide();
});
```

##### (2) bind()不推荐

  在 jQuery 中，可以使用bind方法（不同于js内置的函数bind方法）给元素添加（多个）事件。

* $("选择器").bind()给元素添加（多个）事件。
* 参数：一个事件，字符串，函数。`$("#box").bind("click", function(){});`
* 参数：多个事件，对象。{"事件名1":函数1,"事件名2":函数2,"事件名3":函数3,"事件名4":函数4}
* 参数：可以为多个事件绑定一个事件处理函数`$("#box").bind("click mouseover", function(){});`

```javascript
// 为$("#test")注册点击、鼠标移入、鼠标离开事件
$("#test").bind({"click":function() {
	$("#scr").css("backgroundColor", "red");
}, "mouseover":function () {
	$("#scr").css("backgroundColor", "blue");
}, "mouseleave":function () {
	$("#scr").css("backgroundColor", "grey");
}});
```

##### (3) delegate()不推荐

* \$("父元素").delegate()由父元素调用，为\$("父元素")中的指定子元素绑定事件
* 参数1：要绑定事件的子元素（选择器）
* 参数2：字符串，指定事件名
* 参数3：事件处理函数
* 返回值：调用者，即\$("父元素")

```javascript
// 为body中的id为test的元素注册点击事件
$("body").delegate("#test", "click", function () {
	$("#scr").css("backgroundColor", "blue");
});
```

##### (4) on()常用

1. 为自己绑定事件：

   * $("选择器").on()为被选元素绑定事件
   * 参数1：字符串，事件名
   * 参数2：事件处理函数
   * 返回值：被选元素，即$("选择器")

   ```javascript
   $("#test").on("click", function () {
   	$("#scr").css("backgroundColor", "blue");
   });
   ```

2. 为子元素绑定事件：

   * $("父元素").on()父元素为其指定的子元素绑定事件
   * 参数1：字符串，事件名
   * 参数2：要绑定事件的子元素（选择器）
   * 参数3：事件处理函数
   * 返回值：调用者，即\$("父元素")

   ```javascript
   $("body").on("click", "#test", function () {
   	$("#scr").css("backgroundColor", "blue");
   })
   ```

3. 可以为自己绑定多个事件：

   * $("选择器").on()为被选元素绑定事件
   * 参数：多个事件，对象。{"事件名1":函数1,"事件名2":函数2,"事件名3":函数3,"事件名4":函数4}

   ```javascript
   $("#test").on({"click":function () {
   	$("#scr").css("backgroundColor", "blue");
   }, "mouseover":function () {
   	$("#scr").css("backgroundColor", "grey");
   }, "mouseleave":function () {
   	$("#scr").css("backgroundColor", "red");
   }});
   ```

#### 6.4 解绑事件

##### (1) off()对应on()

* \$("选择器").off()方法用于解绑由on()方法给\$("选择器")绑定的事件
* 参数：字符串，事件名（只能有一个）
* 返回值：被选元素，即$("选择器")，可以通过链式编程解绑多个事件

```javascript
// 点击$("#btn1")为$("#test")解绑"click"和"mouseover"事件
$("#btn1").on("click", function () {
	$("#test").off("click").off("mouseover");
})
```

##### (2) undelegate()

- \$("父元素").undelegate()由父元素调用，为\$("父元素")中的指定子元素解除绑定事件
- 参数1：要绑定事件的子元素（选择器）
- 参数2：字符串，指定事件名

```javascript
// 为body中的id为test的元素解除点击事件
$("body").undelegate("#test", "click");
```

##### (3) unbind()

- \$("选择器").unbind()方法用于解绑由bind()方法给\$("选择器")绑定的事件
- 参数：字符串，事件名（只能有一个）
- 返回值：被选元素，即$("选择器")，可以通过链式编程解绑多个事件

```javascript
// 点击$("#btn1")为$("#test")解绑"click"和"mouseover"事件
$("#btn1").bind("click", function () {
	$("#test").unbind("click").unbind("mouseover");
})
```

##### (4) 注意事项

* 如果

  1. 父级元素和子级元素都是通过正常的方式绑定事件（`事件()` 、`bind()`、`on()`）
  2. 通过off解绑
  3. 父级元素的事件解绑了,子级元素的事件不会解绑

* **如果**

  * 子级元素是通过父级元素调用delegate的方式绑定的事件
  * 父级元素使用off方式解绑事件
  * 父级元素和子级元素的相同的事件都会被解绑

* 下面的代码是把**子级**元素的点击事件**解绑**了,**父级**元素的点击事件**还存在**

  ```javascript
  // 解绑$("#dv")的子级的"click"事件，$("#dv")自身的还在
  $("#dv").off("click","**");
  ```

* **移除**父级元素和子级元素的**所有**的事件

  ```javascript
  //移除父级元素和子级元素的所有的事件
  $("#dv").off();
  ```

#### 6.5 （模拟）触发事件

  可以通过调用触发事件方法来模拟事件的触发，使之执行事件处理函数。

##### (1) $("选择器").事件名()

* $("选择器").事件名() 即可模拟产生被选元素的已注册的事件，让其执行事件处理函数
* 例如：`$("#btn").click()` 或`$("#btn").mouseover()`

##### (2)$("选择器").trigger()

* $("选择器").trigger("事件名")即可模拟产生被选元素的已注册的事件，让其执行事件处理函数
* 例如：`$("#btn").trigger("click")` 或`$("#btn").trigger("mouseover")`

##### (3)$("选择器").triggerHandler()

* $("选择器").triggerHandler("事件名")即可模拟产生被选元素的已注册的事件，让其执行事件处理函数
* 例如：`$("#btn").triggerHandler("click")` 或`$("#btn").triggerHandler("mouseover")`

##### (4) 触发事件的区别

* 以浏览器默认事件focus为例（文本框的focus事件是默认存在的，没有注册也存在）
* 前两种（focus()和trigger("focus")）可以触发浏览器默认事件（获得焦点），并会执行事件处理函数
* triggerHandler("focus")不会触发浏览器默认事件（不会获得焦点），会执行事件处理函数

#### 6.6 事件对象

  类似于DOM中的事件对象。在触发事件时传给事件处理函数（可用一个形参event接收），有一些常用的属性。

* event.delegateTarget：调用事件注册函数（on()、bind()、delegate()）的DOM对象
* event.currentTarget：绑定事件的DOM对象，即给谁注册事件就是谁
* event.target：当前触发事件的DOM对象（事件委托中真正触发事件的DOM元素）
* 其他属性类似于DOM中事件对象的相应属性

#### 6.7 取消事件冒泡

* 在事件处理函数中写`return false;`, 就可以取消事件冒泡


## 七、jQuery插件

#### 7.1 使用插件

* 搜索：jQuery插件，找到想用的插件，按照提示copy代码即可

#### 7.2 jQueryUI的使用

  jQueryUI是jQuery官方提供的一个功能库，里面提供了丰富的页面元素。

1. 确定要使用的UI组件，根据其名称在它的index.html中搜索，把搜索到的内容放到自己的项目index.html中
   * html代码放入body中
   * css代码放入style中
   * js代码放入body最后的script中
2. 引入jQueryUI的样式文件（css文件）
3. 引入jQuery文件
4. 引入jQueryUI的js文件
5. 使用jQueryUI的功能（测试一下能不能用）
6. 调整代码，成为自己想要的样子


## 八、jQuery Ajax

### 1. $.ajax()常见参数

  jQuery的\$.ajax()方法提供了基础的ajax请求封装，即调用\$.ajax()方法，并向其传递合适的参数，即可完成ajax请求。

* \$.ajax()方法用于发送ajax请求；
* 参数：一个对象，这个对象应使用一些键值对来指定ajax请求的参数；
* 返回值：使用异步请求时不需要关心返回值
* 返回值：使用同步请求时，\$.ajax()不会注册onreadystatechange事件，而是当服务器返回数据时，将数据放在一个对象中返回（使用时可以打印此对象，即可看到包含服务器返回数据的属性）。

**\$.ajax()参数中常用的属性：**

| 名称                             | 值/描述                                                      |
| -------------------------------- | ------------------------------------------------------------ |
| async                            | 布尔值，表示请求是否异步处理。默认是 true。                  |
| beforeSend(*xhr*)                | 发送请求前运行的函数。                                       |
| cache                            | 布尔值，表示浏览器是否缓存被请求页面。默认是 true。          |
| complete(*xhr,status*)           | 请求完成时运行的函数（在请求成功或失败之后均调用，即在 success 和 error 函数之后）。 |
| contentType                      | 发送数据到服务器时所使用的内容类型。默认是："application/x-www-form-urlencoded"，即表单数据（键=值&键=值）。若要使用json，则设置为"application/json" |
| context                          | 为所有 AJAX 相关的回调函数规定 "this" 值。                   |
| **data**                         | **规定要发送到服务器的数据。** （默认会被转换为查询字符串，下面的processData） |
| dataFilter(*data*,*type*)        | 用于处理 XMLHttpRequest 原始响应数据的函数。                 |
| **dataType**                     | **预期的服务器响应的数据类型。**                             |
| **error**(*xhr,status,error*)    | **如果请求失败要运行的函数。**                               |
| global                           | 布尔值，规定是否为请求触发全局 AJAX 事件处理程序。默认是 true。 |
| ifModified                       | 布尔值，规定是否仅在最后一次请求以来响应发生改变时才请求成功。默认是 false。 |
| **jsonp**                        | 在一个 jsonp 中重写回调函数的字符串。                        |
| **jsonpCallback**                | 在一个 jsonp 中规定回调函数的名称。                          |
| password                         | 规定在 HTTP 访问认证请求中使用的密码。                       |
| processData                      | 布尔值，规定通过请求发送的数据是否转换为查询字符串。默认是 true。 |
| scriptCharset                    | 规定请求的字符集。                                           |
| **success**(*result,status,xhr*) | **当请求成功时运行的函数。**                                 |
| timeout                          | 设置本地的请求超时时间（以毫秒计）。                         |
| traditional                      | 布尔值，规定是否使用参数序列化的传统样式。                   |
| **type**                         | **规定请求的类型（GET 或 POST）。**                          |
| **url**                          | **规定发送请求的 URL。默认是当前页面。**                     |
| username                         | 规定在 HTTP 访问认证请求中使用的用户名。                     |
| xhr                              | 用于创建 XMLHttpRequest 对象的函数。                         |

#### 1.1 data

* 属性类型：**Object**,String
* **发送到服务器的数据。**将自动转换为请求**字符串**格式。
* GET 请求中将附加在 URL 后。查看 processData 选项说明以禁止此自动转换。
* 必须为 Key/Value 格式。如果为数组，jQuery 将自动为不同值对应同一个名称。如 {foo:["bar1", "bar2"]} 转换为 "&foo=bar1&foo=bar2"。

##### (1) $('form').serialize()

* 可以直接获取form表单的数据
* 返回值：对象，包含表单数据

#### 1.2 **dataType**

* 属性类型：**String**
* **预期服务器返回的数据类型。**如果不指定，jQuery 将自动根据 HTTP 包 MIME 信息来智能判断，比如XML MIME类型就被识别为XML。在1.4中，JSON就会生成一个JavaScript对象，而script则会执行这个脚本。
* 随后服务器端返回的数据会根据这个值解析后，传递给回调函数。可用值: 

1. "xml": 返回 XML 文档，可用 jQuery 处理。
2. "html": 返回纯文本 HTML 信息；包含的script标签会在插入dom时执行。
3. "script": 返回纯文本 JavaScript 代码。不会自动缓存结果。除非设置了"cache"参数。'''注意：'''在远程请求时(不在同一个域下)，所有POST请求都将转为GET请求。(因为将使用DOM的script标签来加载)
4. "json": 返回 JSON 数据 。
5. "jsonp": [JSONP](http://bob.pythonmac.org/archives/2005/12/05/remote-json-jsonp/) 格式。使用 [JSONP](http://bob.pythonmac.org/archives/2005/12/05/remote-json-jsonp/) 形式调用函数时，如 "myurl?callback=?" jQuery 将自动替换 ? 为正确的函数名，以执行回调函数。
6. "text": 返回纯文本字符串

#### 1.3 **error**(xhr,status,error)

* 属性类型：**Function**
* (默认: 自动判断 (xml 或 html)) 请求失败时调用此函数。有以下三个参数：
  * XMLHttpRequest 对象
  * 错误信息
  * （可选）捕获的异常对象。
* 如果发生了错误，错误信息（第二个参数）除了得到null之外，还可能是"timeout", "error", "notmodified" 和 "parsererror"。

```javascript
function (XMLHttpRequest, textStatus, errorThrown) {
    // 通常 textStatus 和 errorThrown 之中
    // 只有一个会包含信息
    this; // 调用本次AJAX请求时传递的options参数
}
```

#### 1.4 **success(result,status,xhr)**

* 属性类型：**Function**,Array
* 请求成功后的回调函数。
* 参数1：由服务器返回，并根据dataType参数进行处理后的数据；
* 参数2：描述状态的字符串。成功地话就是`'success'`
* 参数3：xhr（在jQuery 1.4.x的中，XMLHttpRequest） 对象 。
* 在jQuery 1.5， success可以接受一个函数数组。每个函数将被依次调用。 

```javascript
function (data, textStatus) {
    // data 可能是 xmlDoc, jsonObj, html, text, 等等...
    this; // 调用本次AJAX请求时传递的options参数
}
```

#### 1.5 **type**

* 属性类型：**String**
* (默认: "GET") 请求方式 ("POST" 或 "GET")， 默认为 "GET"。
* 注意：其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。


#### 1.6 jsonp

* 属性类型：**String**
* 与后端约定的查询参数中回调函数的键，后端可以据此获得前端自定义的回调函数名
* 在jsonp请求中将放到`url?jsonp=jsonpCallback` 中

#### 1.7 jsonpCallback

* 属性类型：**String**
* 自定义的回调函数的函数名
* 在jsonp请求中将放到`url?jsonp=jsonpCallback` 中

### 2. jQuery ajax请求的使用

#### 2.1 原理见07-Ajax.md

* url
* data
* dataType
* type
* success
* error

```html
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script src="./ajax.js"></script>
<script>
	$(function () {
		$('#btn').click(function () {
			var code = $('#code').val();
			$.ajax({
				url: './books.php',
				type: 'get',
				data: {code: code},
				dataType: 'json',
				success: function (data, status, xhr) {
					if (data.flag === 0) {
						$('#info').html('没有图书' + code + '信息');
					} else {
						$('#info').html('<ul><li>' + data.bookname + '</li><li>' + data.author + '</li><li>' + data.desc + '</li></ul>');
					}
				}
			});
		})
	})
</script>
```

* 服务端接口，返回json数据

```php
<?php 
    $code = $_GET['code'];
    // $code = $_POST['code'];
    $books = array();
    $books['sgyy'] = array('bookname'=>'三国演义','author'=>'罗贯中','desc'=>'一个杀伐纷争的年代'); 
    $books['shz'] = array('bookname'=>'水浒传','author'=>'施耐庵','desc'=>'108条好汉的故事'); 
    $books['xyj'] = array('bookname'=>'西游记','author'=>'吴承恩','desc'=>'佛教与道教的斗争'); 
    $books['hlm'] = array('bookname'=>'红楼梦','author'=>'曹雪芹','desc'=>'一个封建王朝的缩影'); 
    // 这里的array_key_exists用来判断数组中没有对应键
    if(array_key_exists($code,$books) == 1){
        $book = $books[$code];//这里根据参数获取一本书的信息
        echo json_encode($book);
    }else{
        echo '{"flag":0}';
    }
 ?>   
```

### 3. jQuery jsonp的使用

#### 3.1 原理见07-Ajax.md

* jsonp跨域请求只能是get方式
* url：跨域的url地址
* data：查询参数，对象形式
* dataType：预期返回的数据类型，这里用`'jsonp'`
* jsonp：与后端约定的查询参数中回调函数的键，后端可以据此获得前端自定义的回调函数名
* jsonpCallback：自定义的回调函数的函数名
* success：成功返回数据时，调用回调函数，回调函数调用success

```html
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script src="./ajax.js"></script>
<script>
	$(function () {
		$('#btn').click(function () {
			var code = $('#code').val();
			$.ajax({
				url: 'http://localhost/jsonp/booksjsonp.php',
				data: {code: code},
				dataType: 'jsonp',
				jsonp: 'cb',
				jsonpCallback: 'jsonpCB',
				success: function (data, status, xhr) {
					if (data.flag === 0) {
						$('#info').html('没有图书' + code + '信息');
					} else {
						$('#info').html('<ul><li>' + data.bookname + '</li><li>' + data.author + '</li><li>' + data.desc + '</li></ul>');
					}
				}
			});
		})
	})
</script>
```

* 服务端接口，返回函数调用，如果没有返回函数调用，则字符串形式的数据会传递给error；
* 返回函数调用的作用就是让回调函数去调用success，处理参数中的数据

```php
<?php 
    $code = $_GET['code'];
    $cb = $_GET['cb'];
    $books = array();
    $books['sgyy'] = array('bookname'=>'三国演义','author'=>'罗贯中','desc'=>'一个杀伐纷争的年代'); 
    $books['shz'] = array('bookname'=>'水浒传','author'=>'施耐庵','desc'=>'108条好汉的故事'); 
    $books['xyj'] = array('bookname'=>'西游记','author'=>'吴承恩','desc'=>'佛教与道教的斗争'); 
    $books['hlm'] = array('bookname'=>'红楼梦','author'=>'曹雪芹','desc'=>'一个封建王朝的缩影'); 
    // 这里的array_key_exists用来判断数组中没有对应键
    if(array_key_exists($code,$books) == 1){
        $book = $books[$code];//这里根据参数获取一本书的信息
        echo $cb.'('.json_encode($book).')';
    }else{
        echo $cb.'('.'{"flag":0}'.')';;
    }
 ?>   
```













