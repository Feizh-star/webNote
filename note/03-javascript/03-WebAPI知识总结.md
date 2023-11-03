# WebAPI知识总结速查

# 一、DOM（文档对象模型）

## 1. 获取页面元素

### 1.1 根据id获取页面元素 

##### getElementById()

```html
<body>
	<div id="main">
		<div>111111</div>
	</div>
	<p id="onep">我是一个段落</p>
	<!-- 由于代码执行顺序从上到下，js标签要放最下方，或者将来独立放入.js文件 -->
	<script>
		// main是HTMLDivElement类型的对象
		var main = document.getElementById("main");	// 一般让js中的对象变量名 和 对应元素的id相同(习惯)
		console.dir(main);	// console.dir(main);专门在控制台输出对象，不做特殊处理(log会做特殊处理)
		// onep是HTMLParagraphElement类型的对象
		var onep = document.getElementById("onep");
		console.dir(onep);
		// 如果获取一个不存在的id，则返回null
		var twop = document.getElementById("twop");
		console.dir(twop);	// null
	</script>
</body>
```

### 1.2 根据TagName获取页面元素

##### getElementsByTagName()

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>根据标签TagName获取页面元素</title>
	<script>
		// document.getElementsByTagName("div")具有动态特性，它返回的集合是动态的
		// 就是说如果网页中的div元素动态变化(如添加了一个div)，getElementsByTagName("div")也能获取到
		var divs = document.getElementsByTagName("div");	// 这里获取到了下面的div
		console.log(divs);
		console.log(divs.length);	// length 是0
	</script>
</head>
<body>
	<div>111111</div>
	<div id="myDiv">222222</div>
	<div>333333</div>
	<script>
		// divs是一个对象，类型是集合HTMLCollection，伪数组，里面包含了HTMLDivElement
		var divs = document.getElementsByTagName("div");
		console.dir(divs);
		console.log(divs.length);	// length 是3
		// 集合HTMLCollection可以像数组一样去遍历
		for (var i = 0; i < divs.length; i++) {
			console.dir(divs[i]);
		}
		// 如果页面上没有要找的标签，依然返回一个集合(伪数组)，只不过是空的
		var spans = document.getElementsByTagName("span");
		console.dir(spans);
	</script>
</body>
</html>
```

### 1.3 id和TagName组合获取页面元素

```html
<body>
	<!-- 要获取container内部的两个div -->
	<div id="container">
		<div>1111</div>
		<div>2222</div>
		<p>3333pp</p>
	</div>
	<script>
		// getElementById()只能被document调用
		// 通过id获取一个元素后，它的子元素都会包含在对象中，并可以被获取到
		var container = document.getElementById("container");
		console.dir(container);
		// getElementsByTagName()可以在任何元素上调用，不仅仅是 document
		// 得到container内部的两个div
		var divsInContainer = container.getElementsByTagName("div");
		console.dir(divsInContainer);
	</script>
</body>
```

### 1.4 其它获取页面元素的方式

##### getElementsByName()

##### getElementsByClassName()

##### querySelector()

##### querySelectorAll()

```html
<body>
  <div id='main'></div>
  <div name='main'></div>
  <div class='a'></div>
  <div class='a'></div>
  <p class='a'></p>
  <script>
    // 根据标签的name属性获取元素
    // 仅在document上调用
    // document.getElementsByName()在有些浏览器中会获取到id名匹配的，少用
    var divs = document.getElementsByName('main');
    console.log(divs);
    // 
    // 根据标签的class属性获取元素，会获取到所有同类的元素
    // 可以在任何元素上调用，不仅仅是 document
    // 浏览器兼容性  IE9以后才支持的
    // document.getElementsByClassName();
    var classes = document.getElementsByClassName("a");
    console.log(classes);
    // 
    // query  查询
    // Selector  选择器
    // document.querySelector()
    // document.querySelectorAll()
    // 都是根据选择器来查找元素
    // 可以在任何元素上调用，不仅仅是 document
    // 浏览器兼容性问题   IE8以后才支持，移动端支持
    // 
    var main = document.querySelector('#main');  // id选择器
    console.log(main);
    //
    // 只能获取到第一个符合选择器的元素
    var element = document.querySelector('.a');  // 类选择器
    console.log(element);
    // 
    // 获取到所有符合选择器的元素集合
    var elements = document.querySelectorAll('.a');// 类选择器
    console.log(elements);
  </script>
</body>
```

### 1.5 自动获取焦点

##### (1) formelement.focus()

* 文本框的focus()方法可以使文本框获得焦点，可以用来让指定的文本框在页面加载后自动获得焦点

## 2. 事件

### 2.1 事件的三要素/注册事件

```html
<body>
	<input type="button" id="btn" value="点我">
	<p id="onep">ppppppp</p>
	<script>
		// 对象具有属性、方法、事件
		// 事件：就是触发-响应
		// 1.获取元素
		var btn = document.getElementById("btn");
		// 2.给元素注册事件
		// 事件源：要注册事件的元素对象
		// 事件名称：on后面的名称，如click
		// 事件处理函数：function
		btn.onclick = function () {
			alert('点我就对了');
		}
		var onep = document.getElementById("onep");
		onep.onclick = function () {
			alert('ppppppp');
		}
	</script>
</body>
```

### 2.2 常用的事件

```
onclick		点击事件
onfocus		文本框获得焦点
onblur		文本框失去焦点
onchange	在输入的文本改变，且文本框失去焦点的时候触发
// mouseover和mouseout在图片放大镜案例中，在IE浏览器会引起遮盖层位置错乱(事件冒泡)
onmouseover	当鼠标移入,会触发事件冒泡(事件委托，希望鼠标经过子元素时，执行父元素注册的鼠标经过事件)
onmouseout	当鼠标移出,会触发事件冒泡(事件委托，希望鼠标离开子元素时，执行父元素注册的鼠标离开事件)
onmouseenter当鼠标移入,不会触发事件冒泡(事件委托，不希望鼠标经过子元素时，执行父元素注册的鼠标经过事件)
onmouseleave当鼠标移出,不会触发事件冒泡(事件委托，不希望鼠标离开子元素时，执行父元素注册的鼠标离开事件)
onmousemove 当鼠标在元素上移动
onkeydown	键盘按下
onkeyup		键盘弹起
onload		元素和外部引用加载完再执行此事件中的代码
onunload	页面卸载的时候执行
onscroll	元素的滚动条被拖动时触发(拖动过程中不停地触发)，元素指的是滚动容器，而非滚动内容
onmousedown	鼠标按下事件
onmouseup	鼠标弹起事件
```

1. ele.change事件
   * change事件用在其绑定元素发生变化时
   * input:file文件域上传文件
   * select下拉菜单选中option
   * input:text输入的文本改变，且文本框失去焦点的时候触发
2. window.onresize事件
   * 当浏览器尺寸发生变化时触发
   * 移动端当屏幕尺寸发生变化时触发
3. ele.webkitTransitionEnd事件
   * 当绑定元素的css过渡效果transition结束时触发

## 3. 属性操作

### 3.1非表单元素属性

#### 3.1.1非表单元素

```
非表单元素：div、span、img等展示型标签
href、src、title、id、className等
特别情况：标签中的类名class在对象中的属性是className
```

#### 3.1.2取消a标签默认行为

##### 注册点击事件return false

##### href="javascript: void(0)"(不推荐)

```html
<!--在a标签的事件处理函数最后加上return false;-->
<!--href的作用是向浏览器地址栏填入href属性的值，如果是http网址就跳转，如果js代码就执行-->
<body>
  	<!--void是一个js运算符，执行()中的代码并始终返回undefined-->
	<a id="link" href="javascript: void(0)">百度</a>
	<script>
		var link = document.getElementById("link");
		link.onclick = function () {
			alert('点我了');
			// 取消a标签默认行为
			return false;
		}
	</script>
</body>
```

#### 3.1.3 美女相册案例-this获取活动元素的属性的方法

```
1.事件注册后并不执行，但会保存在相应的对象中
2.在某对象成为活动对象时  执行的事件处理函数  中的this指向  当前活动的事件
3.要操作当前页面元素：只需遍历要注册事件的元素，分别注册事件，在事件处理函数中用this访问页面活动元素的属性即可
```

```html
<!--样式表略-->
<body>
	<div class="titltOfPage">美女画廊</div>
	<div id="xiaoTu">
		<!-- a标签中把大图路径写上，可以方便后面获取要显示图片的url，后面会取消a的默认行为，href属性并不真的跳转 -->
		<a href="images/1.jpg" title="美女A">
			<!-- img标签是真正要显示缩略图的路径，使用小图片可以提高页面加载速度 -->
			<img src="images/1-small.jpg" alt="美女A">
		</a>
		<a href="images/2.jpg" title="美女B">
			<img src="images/2-small.jpg" alt="美女B">
		</a>
		<a href="images/3.jpg" title="美女C">
			<img src="images/3-small.jpg" alt="美女C">
		</a>
		<a href="images/4.jpg" title="美女D">
			<img src="images/4-small.jpg" alt="美女D">
		</a>
	</div>
	<img src="images/placeholder.png" alt="占位图" id="daTu">
	<div id="tit">选择一个图片</div>
	<script>
		// 1.获取xiaoTu里面的元素a标签的集合
		var xiaoTu = document.getElementById("xiaoTu");
		var links = xiaoTu.getElementsByTagName("a");
		// 2.给每一个a元素注册事件
		for (var i = 0; i < links.length; i++) {
			// 得到单个a元素
			var link = links[i];
			// 4.为a元素注册事件
			// for循环中分别为每一个a元素注册事件；
			// 注册事件并不执行，事件保存在相应的元素中；
			// 当事件被触发时才执行。
			link.onclick = function () {
				// 5.获取大图img标签，再替换路径
				var daTu = document.getElementById("daTu");
				// 这里的this指向事件源，即点击的a标签
				// 被点击时才执行事件处理函数，所以被点击的a就是事件源
				daTu.src = this.href;
				// 6.获取标题div，修改它的内容
				var tit = document.getElementById("tit");
				tit.innerHTML = this.title;
				// 3.取消a标签的默认行为，点击后不再跳转
				return false;
			}
		}
	</script>
```

#### 3.1.4 innerHTML和innerText

```html
// 基本使用
<body>
	<div id="ddd">
		我是div
		<span>哈哈哈</span>
	</div>
	<script>
		var ddd = document.getElementById("ddd");
		// innerHTML的值是原封不动的内容，包括子标签：我是div <span>哈哈哈</span>（换行和空格省略）
		console.log(ddd.innerHTML);
		// innerText的值是过滤掉标签后的文本：我是div 哈哈哈
		console.log(ddd.innerText);
		// 设置内容：纯文本用innerText，不会对标签进行解析
		ddd.innerText = '<b>hello</b>';		// "<b>hello</b>"
		// 设置内容：文本+标签用innerHTML,会对标签进行解析
		ddd.innerHTML = '<b>hello</b>';		// "hello"(加粗)
	</script>
</body>
```

```javascript
// 兼容性:innerText和textContent作用一样，有些浏览器支持innerText，有些支持textContent
// 通过检查元素的属性类型来确定元素对象中是innerText还是textContent
// 对象中不存在某个属性，则使用typeof获取类型得到undefined，而HTML标签的属性类型一般是字符串(例如id="tt")
var ddd = document.getElementById("ddd");
if (typeof ddd.innerText === 'string') {
  return ddd.innerText;
} else {
  return ddd.textContent;
}
```

### 3.2表单元素属性

#### 3.2.1 需要注意的属性

##### disabled

##### checked

##### selected

其余属性操作和非表单元素一样

```
disabled（文本框禁用输入）
checked（选择控件默认选择的项）
selected（下拉菜单默认选中项）
这三个html属性只有一个值（它们本身）
在DOM中是boolean类型
```

### 3.3 自定义属性

#### 3.3.1 自定义属性方法

##### getAttribute()

##### setAttribute()

##### removeAttribute()

```javascript
// 获取自定义属性,box是已经获取的页面元素
box.getAttribute('age');
// 设置自定义属性(setAttribute()也可以设置自带属性，不推荐)
box.setAttribute('sex', '男');
// 移除自定义属性(removeAttribute()也可以移除自带属性，不推荐)
box.removeAttribute('age');
```

```html
<body>
	<div id="box" age="18" personId="123456">张三</div>
	<script>
		var box = document.getElementById('box');
		// 获取自定义属性
		console.log(box.getAttribute('age'));
		console.log(box.getAttribute('personId'));
		// 设置自定义属性(setAttribute()也可以设置自带属性，不推荐)
		box.setAttribute('sex', '男');
		// 移除自定义属性(removeAttribute()也可以移除自带属性，不推荐)
		box.removeAttribute('age');
	</script>
</body>
```

##### dataset属性

* 除了以上方法外还可以使用data-name的形式直接在标签中增加自定义属性，通过element.dataset.name访问

* 形如data-attr-name的自定义属性会以ele，element.dataset.attrName的形式存在。

  ```
  <input id="ipt" type="text" name="txtQQ" data-rule="qq">
  <script>
  	var ipt = document.getElementById(ipt);
  	console.log(ipt.dataset.rule);	// "qq"
  </script>
  ```

### 3.4 样式操作

#### 3.4.1 类样式

* ele.classList属性，获得ele元素的类样式列表
* ele.classList.add("类样式")，为ele元素添加类样式
* ele.classList.remove("类样式")，为ele元素移除类样式

```javascript
// 通过类样式来操作元素的样式，更改标签类名，适用于更改多个样式
// txt是一个页面元素
txt.className = 'bgClass';
```

#### 3.4.2 style行内样式

```javascript
// 通过style来设置样式，作用于行内样式表，适用于更改少量样式、
// style获取的样式是行内样式，而不是内联/外部css样式，所以在设置行内样式之前获取style.width是空字符串''
// style是元素的一个属性，它的值是一个CSSStyleDeclaration类型的对象
// aBox是一个页面元素
aBox.style.width = '200px';
aBox.style.height = '200px';
// 要使用aBox.style.left/top必须在css中让盒子定位：absolute
```

#### 3.4.3 常用行内样式

```
aBox.style.width/height----宽高
aBox.style.position----定位
aBox.style.left/top----定位
aBox.style.backgroundPositionX----背景图片的水平位置
aBox.style.background----添加背景图片
```

## 4. 模拟DOM树

### 4.1 ||或和&&与运算的过程

```
||或运算的过程
// 两边都不是布尔类型，会对第一个表达式结果进行转换(如果表达式是布尔类型，省去转换，剩余过程一样)：
// 如果第一个表达式  转换成布尔类型  结果是ture, 直接返回第一个表达式的值(此时逻辑运算结果与第一个值相同)；
// 如果第一个表达式  转换成布尔类型  结果是false, 直接返回第二个表达式的值(此时逻辑运算结果与第二个值相同)；
&&与运算的过程
// 两边都不是布尔类型，会对第一个表达式结果进行转换(如果表达式是布尔类型，省去转换，剩余过程一样)：
// 如果第一个表达式  转换成布尔类型  结果是false, 直接返回第一个表达式的值(此时逻辑运算结果与第一个值相同)；
// 如果第一个表达式  转换成布尔类型  结果是true, 直接返回第二个表达式的值(此时逻辑运算结果与第二个值相同)；
```

```html
<body>
	<div id="box">hello</div>
	<p id="ppp">world</p>
	<script>
		var box = document.getElementById('box');
		console.dir(box);
		// 模拟节点的构造函数
		function Node(options) {
			this.id = options.id || '';
			this.className = options.className || '';
			// 节点名称属性
			this.nodeName = options.nodeName || '';
			// 节点类型：元素节点1、属性节点2、文本节点3、注释节点
			this.nodeType = options.nodeType || 1;
			// 节点值：对于元素节点，nodeValue是null,实际代码比较复杂，这里只是演示
			this.nodeValue = options.nodeValue || null;
			// 子节点，构造树的关键，使用数组表示
			this.children = options.children || [];
		}
		// 创建html节点
		var html = new Node({
			nodeName: 'html'
		});
		// 创建head节点，并把head节点作为子节点加入html中
		var head = new Node({
			nodeName: 'head'
		});
		html.children.push(head);
		// 创建body节点，并加入html中
		var body = new Node({
			nodeName: 'body'
		});
		html.children.push(body);
		// 创建div节点，并加入body中
		var div = new Node({
			id: 'box',
			nodeName: 'div'
		});
		body.children.push(div);
		// 创建p节点，并加入body中
		var ppp = new Node({
			id: 'ppp',
			nodeName: 'p'
		});
		body.children.push(ppp);
		console.dir(html);
	</script>
</body>
```

## 5. 节点介绍及应用

### 5.1 节点分类

```
// 元素节点，文本节点，注释节点位于box元素的子节点列表里(childNodes)
// 元素节点span：nodeType: 1, nodeName: "SPAN", nodeValue: null(默认为null)
// 文本节点text：nodeType: 3, nodeName: "#text", nodeValue: "↵		"
// 注释节点comment：nodeType: 8, nodeName: "#comment", nodeValue: " 我是注释 "

// 属性节点位于box元素的Attributes(NamedNodeMap类型，伪数组)属性里
// 例：属性节点id：nodeType: 2, nodeName: "id", nodeValue: "box"
```

### 5.2 父子节点

##### parentNode

##### childNodes

##### hasChildNodes()

##### children

childELementCount

```javascript
box.parentNode	// 父节点元素
box.childNodes	// 子节点列表，包含子元素节点、属性节点、文本节点
box.hasChildNodes()	// 判断是否有子节点
box.children	// 子元素节点的集合
box.childElementCount	// 子元素数量
```

```html
<body>
	<div id="box" class="aaa">
		<span>我是span</span>
		<p>我是p</p>
		<!-- 我是注释 -->
	</div>
	<script>
		var box = document.getElementById('box');
		console.dir(box);
		// 1.parentNode：父节点元素
		console.dir(box.parentNode);	// 就是body元素
		// 2.childNodes：子节点列表
		console.dir(box.childNodes);	// NodeList(7)	(可展开NodeList类型伪数组，包含元素节点，文本节										点，注释节点等)
		// 3.children：子元素集合
		console.log(box.children);		// HTMLCollection(2) [span, p]	(可展开)
	</script>
</body>
```

### 5.3 firstChild和lastChild

```
eleNode.firstChild	// 获取第一个子节点（不是元素）
eleNode.lastChild	// 获取最后一个节点（不是元素）
eleNode.firstElementChild	// 获取第一个子元素（需做兼容性处理，写一个手动实现此功能的函数）
eleNode.lastElementChild	// 获取最后一个子元素（需做兼容性处理）
```

```javascript
// 处理浏览器兼容性,获取第一个子元素
function getFirstElementChild(element) {
    var node, nodes = element.childNodes, i = 0;
    while (node = nodes[i++]) {
        if (node.nodeType === 1) {
            return node;
        }
    }
    return null;
}
```

### 5.4 previousSibling和nextSibling

```
eleNode.previousSibling	// 获取上一个兄弟节点（不是元素）
eleNode.nextSibling		// 获取下一个兄弟节点（不是元素）
eleNode.previousElementSibling	// 获取上一个兄第元素（需做兼容性处理）
eleNode.nextElementSibling		// 获取下一个兄弟元素（需做兼容性处理）
```

```javascript
// 处理浏览器兼容性,获取下一个兄弟元素
function getNextElementSibling(element) {
    var el = element;
    while (el = el.nextSibling) {
      if (el.nodeType === 1) {
          return el;
      }
    }
    return null;
}
```

## 6. 动态创建元素

### 6.1 动态创建元素

#### 6.1.1 document.write()

```javascript
document.write()	//在事件处理函数中会把原页面覆盖掉（不在事件中不会），很少使用，典型应用场景：网页边栏的					  客服（一般使用现成的代码）
```

#### 6.1.2 element.innerHTML

```javascript
// 使用数组代替字符串拼接，性能较好，但添加复杂元素的话字符串阅读性差
element.innerHTML //往往要多次拼接字符串才能完成创建动态元素，每次拼接后会重绘画面，性能较差，一般使用数组				 拼接后再给innerHTML重绘画面，然后才可以获取页面元素（获取页面元素较麻烦，所以也不是最常用的）
```

#### 6.1.3 document.createElement()

```javascript
// 性能较好，代码清晰，最常用
document.createElement()  // 先创建一个DOM对象，然后可以使用它的属性操作样式和属性，然后找到要添加的位置						（获取元素），再使用element.appendChild（）将此对象添加到DOM树中相应的位置
```

```html
<body>
	<button id="btn">按钮</button>
	<div id="box"></div>
	<script>
		var mn = ['西施', '貂蝉', '王昭君', '迪丽热巴'];
		var btn = document.getElementById('btn');
		btn.onclick = function () {
			// 1.1获取容器（父元素）
			var box = document.getElementById('box');
			// 1.2动态创建一个ul元素
			var anUl = document.createElement('ul');
			// 1.3将ul元素追加到父元素div中
			box.appendChild(anUl);
			// 遍历数据，添加li
			for (var i = 0; i < mn.length; i++) {
				var myMn = mn[i];
				// 2.1动态创建一个li元素
				var aLi = document.createElement('li');
				// 2.2设置li的属性innerText
				aLi.innerText = myMn;
				// 2.3将li元素追加到父元素ul中
				anUl.appendChild(aLi);
			}
		}
	</script>
</body>
```

#### 6.1.4 appendChild()和cloneNode()

node.appendChild()还可以将一个页面上已有的节点加入到目标位置，原位置的节点会被删除，若要保留应使用		      			node.cloneNode(true)方法(参数true代表带内容克隆，参数false代表不带内容克隆)

```html
<body>
	<input type="button" value="按钮" id="btn">
	<ul id="anUl">
		<li>111</li>
		<li>222</li>
		<li>333</li>
	</ul>
	<ul id="teUl">
		<li>444</li>
	</ul>
	<script>
		var btn = document.getElementById('btn');
		btn.onclick = function () {
			var anUl = document.getElementById('anUl');
			var teUl = document.getElementById('teUl');
			// 先克隆原节点，参数为true才会保留克隆节点的子节点
			var nodeClone = anUl.children[1].cloneNode(true);
			// 将原节点追加到新的位置，原节点被删除
			teUl.appendChild(anUl.children[1]);
			// 在原位置插入原节点的副本
			anUl.insertBefore(nodeClone, anUl.children[1]);
		}
	</script>
</body>
```

### 6.2 移除元素

```javascript
// 谁调用移除谁
element.remove()
```

### 6.3 其他常用方法

#### 6.3.1 insertBefore()

node.insertBefore()由父节点来调用，第一个参数是要插入的新元素，第二个参数是要插入的位置(已有元素，在它前面插入)，返回被插入的节点

```html
<body>
	<input type="button" value="按钮" id="btn">
	<ul id="anUl">
		<li>111</li>
		<li>222</li>
		<li>333</li>
	</ul>
	<script>
		var btn = document.getElementById('btn');
		btn.onclick = function () {
			var anUl = document.getElementById('anUl');
			// 一个要插入的新元素
			var anDiv = document.createElement('div');
			anDiv.innerText = 'hahaha';
			// 插入
			anUl.insertBefore(anDiv, anUl.children[1]);
		}
	</script>
</body>
```

#### 6.3.2 replaceChild()

Node.replaceChild()由父节点来调用，第一个参数是要替换的新元素，第二个参数是要替换的已有元素，返回替换掉的元素

```html
<body>
	<input type="button" value="按钮" id="btn">
	<ul id="anUl">
		<li>111</li>
		<li>222</li>
		<li>333</li>
	</ul>
	<script>
		var btn = document.getElementById('btn');
		btn.onclick = function () {
			var anUl = document.getElementById('anUl');
			// 一个要插入的新元素
			var anDiv = document.createElement('div');
			anDiv.innerText = 'hahaha';
			// 替换
			anUl.replaceChild(anDiv, anUl.children[1]);
		}
	</script>
</body>
```

### 6.4 innerHTML引起内存泄漏

```javascript
// // 将leftSel的内容（子节点）移动到rightSel，这里如果使用innerHTML会很简单
// // 问题1：rightSel的子元素是全新生成的，并不是DOM中原有的元素
rightSel.innerHTML = leftSel.innerHTML;
// // 问题2：使用''删除已有元素，会导致其事件处理函数的内存泄漏(没有变量指向它)
leftSel.innerHTML = ''; // 删除leftSel的子节点
// // 使用removeChild()会把对应的事件处理函数也删除
```

## 7. 事件详解

### 7.1 注册事件的方法及兼容性

```javascript
// 1.element.onclick只能为一个对象注册一个方法
element.onclick = function () {}
// 2.addEventListener(),可以为一个对象注册多个方法，兼容IE9以后
element.addEventListener('click', function)	// 基本用法，第三个参数可选，去MDN了解
// 3.attachEvent(),可以为一个对象注册多个方法，兼容IE6-IE10
element.attachEvent('onclick', function)
```

```javascript
// 解决兼容性函数:要注册事件的对象，事件名称，事件处理函数
function addEventListenerPro(element, eventName, fn) {
  // 分别检查addEventListener和attachEvent是否存在
  if (element.addEventListener) {
    element.addEventListener(eventName, fn);
  } else if (element.attachEvent) {
    element.attachEvent('on' + eventName, fn);
  } else {
    element['on' + eventName] = fn;
  }
}
```

### 7.2 移除事件

1.element.onclick方法直接在  事件处理函数中写element.onclick = null

2.element.addEventListener('click', fn)方法要将function写成命名函数（例如fn），在这个函数fn中调用removeEventListener('click', fn)

```javascript
var ddd = document.getElementById('ddd');
function fn() {
	alert('hello');
	this.removeEventListener('click', fn);
}
ddd.addEventListener('click', fn);
```

3.element.attachEvent('onclick', fn)方法要将function写成命名函数（例如fn），在这个函数fn中调用detachEvent('onclick', fn)

```javascript
var ddd = document.getElementById('ddd');
function fn() {
	alert('hello');
	this.detachEvent('onclick', fn);
}
ddd.attachEvent('onclick', fn);
```

### 7.3 事件的三个阶段

* addEventListener的第三个参数是负责：自身的事件处理函数在别人（子元素）的事件冒泡中执行（默认），还是在别人（子元素）的事件捕获中执行。

```
捕获阶段（从DOM树的根部向叶的方向，直至当前元素）
执行阶段：当前点击元素执行事件处理函数（以点击事件为例）
冒泡阶段（从当前元素向DOM树根的方向）
element.onclick和element.attachEvent('onclick', fn)不能设置事件的阶段
element.addEventListener('click', fn, false)的第三个参数（默认）为false时，事件冒泡（即本元素注册的事件会在“子元素上发生相同事件”的冒泡阶段触发）（即element作为父元素，它的事件比它的子元素后触发）
element.addEventListener('click', fn, true)的第三个参数为true时，（子元素上发生相同事件时）不在子元素事件的冒泡阶段触发，而在捕获阶段触发（即element作为父元素，它的事件比它的子元素先触发）
```

#### 7.3.1 事件冒泡的作用

```
1.事件委托：将子元素的事件委托给父元素，只需给父元素注册事件（用来处理子元素），在子元素触发事件时，在冒泡阶段会执行父元素的事件处理函数
2.事件委托中父元素事件如何找到子元素：通过系统传递给事件处理函数的一个参数（事件对象）来定位当前元素eventObject.target
3.根据事件委托规则，只要父元素注册了某种事件(如onmousemove)，此事件在子元素上发生了，父元素的事件处理函数就会执行
4.若想要子元素的某事件在超出此元素大小的范围触发，需要将此事件注册给冒泡过程中的某一级父元素(如document)，这样无论此事件在哪里触发，都可以顺利执行(例子：模拟滚动条案例中的鼠标弹起移除document.onmousemove事件)
```

### 7.4 事件对象

```
事件对象有兼容性问题，老版本的浏览器是window.event, 通过e = e || window.event解决
1)e.eventPhase事件的阶段：(值 = 1捕获阶段；2目标阶段；3冒泡阶段)
2)e.target真正触发事件的对象，老版本中是e.srcElement, 通过var target = e.target || e.srcElement解决
3)e.currentTarget事件处理函数所属的对象，跟this一样
4)e.type获取事件名称：当多个类型的事件使用同一个事件处理函数fn时，可以获取当前事件的名称，如‘click’
5)e.clientX/e.clientY:获取事件触发时鼠标的位置（坐标原点：可视区域左上角）
6)e.pageX/e.pageY:获取事件触发时鼠标的位置（坐标原点：页面的左上角）
  e.pageX/e.pageY有兼容性问题，需要用clientY + 页面滚动距离 来替代
7)document.body.scrollLeft/Top页面滚动出去的距离(大部分浏览器使用)
  document.documentElement.scrollLeft/Top页面滚动出去的距离(有些浏览器使用)
  documentElement是文档的根元素，即HTML标签
  二者配合可处理兼容性问题
8)e.keyCode键盘码(ASCII码)就是按下键盘输入的字符
```

```javascript
// pageX/pageY兼容性问题
document.onclick = function (e) {
	console.log(getPageXY(e).pageX);
	console.log(getPageXY(e).pageY);
}
function getPageXY(e) {
  	// 若不支持e.pageY，用clientY + 页面滚动距离 来替代
	var pageX = e.pageX || e.clientX + document.body.scrollLeft;
	var pageY = e.pageY || e.clientY + document.body.scrollTop
	return {
		pageX: pageX,
		pageY: pageY
	}
}
```

#### 7.4.1 取消元素的默认行为

```
1. return false(常用),会引起事件处理函数返回;
2. e.preventDefault()，大部分浏览器支持;
3. e.returnValue = false，老版本IE支持;
```

#### 7.4.2 阻止冒泡

* 这里阻止冒泡的意思是：子元素事件不再冒泡，进而不在冒泡阶段执行父元素的事件处理函数
* 所以要阻止父元素的事件触发，要
  * 1.父元素事件设为冒泡阶段执行（即默认，或者addEventListener第三个参数为false）
  * 2.子元素阻止事件冒泡
* 只要子元素ele阻止了冒泡，孙元素的相同事件就无法穿过ele向上冒泡

```
要写在子元素的事件处理函数中，子元素事件不再冒泡，进而不执行父元素的事件处理函数(写父元素中没用)
1. e.stopPropagation()，DOM标准方式;  
2. e.cancelBubble = true，老版本IE支持;
```

#### 7.4.3 键盘事件

```
1. keydown当键盘按下时触发，还没有真正输入，可以对键盘码进行操作
2. keyup当键盘弹起时触发，已经输入，没有处理的机会
3. 事件对象中e.keyCode键盘码(ASCII码)就是按下键盘输入的字符
```

#### 7.4.4 盒子在页面中的偏移量 

```
box.offsetLeft/box.offsetTop盒子(左上角)在页面中的偏移量,box是一个页面元素
```

#### 7.4.5 鼠标在盒子中的位置

* 鼠标离视口边缘的距离event.clientX - 盒子距离视口边缘的距离（通过ele.getBoundingClientRect()）
* 递归的方法不太实用

```javascript
// 递归求 鼠标距本层定位盒子边缘位置
// 要求：每一级盒子都使用了定位
// 参数1：鼠标点击时鼠标距离页面可视区域边缘的X坐标，事件对象event.clientX
// 参数2：鼠标点击的盒子，DOM元素或jQuery元素皆可以
function getOffsetX(x, element) {
	// console.dir(element);
	//if (element.parent) {	// 针对element为jQuery元素
	//	if (element.parent().get(0).tagName === 'BODY'){
	//		return x - element.get(0).offsetLeft - element.parent().get(0).clientLeft;
	//	} else {
	//		// 层层剥离，鼠标距上一层定位盒子的边缘位置 - 本层距上一层定位盒子的边缘位置 = 鼠标距本层定位盒子边缘位置
	//		return getOffsetX(x, element.parent()) - element.get(0).offsetLeft - element.parent().get(0).clientLeft;
	//	}
	//} else {	// 针对element为DOM元素
		if (element.parentNode.tagName === 'BODY'){
			return x - element.offsetLeft - element.parentNode.clientLeft;
		} else {
			// 层层剥离，鼠标距上一层定位盒子的边缘位置 - 本层距上一层定位盒子的边缘位置 = 鼠标距本层定位盒子边缘位置
			return getOffsetX(x, element.parentNode) - element.offsetLeft - element.parentNode.clientLeft;
		}
	//}
}
```

### 7.5 自定义事件

* 自定义事件只能手动触发，例如在click事件中触发

1. var myEvent = new Event('myevent')：定义1个自定义事件
   * myEvent：触发事件用
   * myevent：事件名，注册事件用
2. var myCustome = new CustomeEvent('mycustome', {配置对象})：定义1个自定义事件
   * myCustome ：触发事件用
   * mycustome：事件名，注册事件用
   * 配置对象：
     * bubbles 一个布尔值，表示该事件能否冒泡。 注意：测试chrome默认为不冒泡。
     * cancelable 一个布尔值，表示该事件是否可以取消。
3. ele.dispatchEvent('事件名')，手动触发自定义事件

```js
let box = document.getElementById('box')
let myEvent = new Event('myevent')
let myCustome = new CustomEvent('mycustome', {
	bubbles: false
})
box.addEventListener('click', function (event) {
	console.log('a')
	this.dispatchEvent(myEvent)
	this.dispatchEvent(myCustome)
})
box.addEventListener('myevent', function (event) {
	console.log('myevent')
	console.log(event)
})
box.addEventListener('mycustome', function (event) {
	console.log('mycustome')
	console.log(event)
})
```

# 二、BOM（浏览器对象模型）

## 1. BOM介绍

BOM就是浏览器功能抽象出来的对象模型

### 1.1 window对象 

```
1. 浏览器顶级对象window，包括document,使用window的成员可以省略window
2. 全局变量、可以直接使用的内置函数/方法 都是window的成员(console、alert等等)
```

```
某些标识符不能随意用作变量名，例如
	1. top是window的属性，只能获取不能赋值
	2. name是window的属性，是字符串类型（赋值为数值会自动转化为字符串）
	...
```

#### 1.1.1window对象的属性

```
window.pageYOffset----浏览器窗口滚动出去的距离
window.innerHeight----浏览器可视窗口的高度
```

### 1.2 常见对话框（了解）

```
alert('hello')弹出提示
var age = prompt('请输入年龄', '18')参数是提示和默认值，返回输入的内容
var isSure = confirm('是否确认删除')参数是提示内容，返回布尔类型
```

### 1.3  js加载

  body最后的script标签在所有元素创建完毕之后   引用的外部资源（js,css,图片）下载完毕之前   执行

#### 1.3.1 load事件

```
1. window的load事件：页面加载完成之后（所有元素创建完毕，引用的外部资源下载完毕）执行。可以让head标签中的js代码最后执行
2. 普通元素中的load事件，在这个对象加载完成后执行，例如img中可以让图片加载完成后变成另一张图片
```

```javascript
onload = function () {}	// 与window.onload等价
```

#### 1.3.2 unload事件

```
1. 页面卸载的时候执行
2. unload中window对象被冻结，所有对话框都无法使用
3. 可以做一些后台操作，例如清除数据
```

```javascript
onunload = function () {}	// 与window.onunload等价
```

#### 1.3.3 F5刷新操作

```
1. 卸载页面（所以unload事件会执行）
2. 重新加载页面
```

### 1.4 定时器

```javascript
setTimeout(function，timems)  隔一段时间执行，并且只会执行一次
    参数：函数（要执行的操作、时间（ms）），返回一个定时器ID————timerId（需用全局变量来储存）
clearTimeout(timerId)可以通过定时器ID找到定时器并取消
```

```javascript
setInterval(function，timems) 隔一段时间执行，并且会重复执行
	参数：函数（要执行的操作、时间（ms）），返回一个定时器ID————timerId（需用全局变量来储存）
clearInterval(timerId)可以通过定时器ID找到定时器并取消
```

### 1.5  location对象

浏览器地址对象，属于window

```
location.href是浏览器跳转地址，设置它的值可以实现跳转，记录历史可以后退
location.assign()委派，参数是浏览器跳转地址，作用和href一样，记录历史可以后退
location.replace()替换地址，不记录历史不能后退
location.reload()重新加载，和刷新一样，参数true强制从服务器获取页面(同Ctrl+F5)，false如果浏览器有缓存，直接从缓存获取页面(同F5)
```

### 1.6  URL及其location属性

```
scheme://host:port/path?query#fragment
http://www.itheima.com:80/a/b/index.html?name=zs&age=18#bottom
scheme:通信协议————location.protocol属性，字符串
	常用的http,ftp,maito等
host:主机
	服务器(计算机)域名系统 (DNS) 主机名或 IP 地址。
port:端口号
	整数，可选，省略时使用方案的默认端口，如http的默认端口为80。
path:路径————location.pathname属性，字符串
	由零或多个'/'符号隔开的字符串，一般用来表示主机上的一个目录或文件地址。
query:查询————location.search属性，字符串
	可选，用于给动态网页传递参数，可有多个参数，用'&'符号隔开，每个参数的名和值用'='符号隔开。例如：name=zs
fragment:信息片断————location.hash属性，字符串
	字符串，锚点.
```

### 1.7 history对象 

主要使用HTML5的pushState()和replaceState()这两个api来实现的,pushState()可以改变url地址且不会发送请求,replaceState()可以读取历史记录栈,还可以对浏览器记录进行修改

```
window.history.pushState(stateObject, title, URL)
window.history.replaceState(stateObject, title, URL)
```

记录页面历史，可以向前或向后跳转

```
history.forward()写在一个按钮的点击事件中，可以在点击按钮后向前跳转(前提是目标页面已经打开过)
history.back()写在一个按钮的点击事件中，可以在点击按钮后向后跳转
history.go(1)跳转，根据参数：1向前跳转1页；-1向后跳转1页
```

### 1.8 navigator对象 

```
记录了访问网页的设备信息（操作系统浏览器等等），给服务端判断使用
navigator.userAgent属性是一个保存了设备信息的字符串
```

## 2. 元素的大小和位置

### 2.1 offset

```
ele.offsetParent	ele距离当前元素最近的定位父元素，如果没有定位父元素就是body(其实是浏览器边缘)
// offset不支持translate移动的位置
ele.offsetLeft(只读)		ele距离offsetParent的横向偏移
ele.offsetTop(只读)		ele距离offsetParent的纵向偏移
ele.offsetWidth(只读)		ele的宽度，包括padding和border
ele.offsetHeight(只读)	ele的高度，包括padding和border
```

#### (1) ele.getBoundingClientRect()

* 此方法，可以获取到DOM元素4条边  距离页面边缘（视口）  左边和上边  的4个距离值：left、right、top、bottom
* 返回值：一个对象，此对象的属性就是left、right、top、bottom的值，还有元素的高度
  * left：元素左边（边框外侧）  距离  页面（可视区域）左侧的水平距离
  * right：元素右边（边框外侧）  距离  页面（可视区域）左侧的水平距离
  * top：元素上边（边框外侧）  距离  页面（可视区域）顶部的垂直距离
  * bottom：元素下边（边框外侧）  距离  页面（可视区域）顶部的垂直距离
  * height：元素的高度（带边框和padding）
  * width：元素的宽度（带边框和padding）
  * x：同left
  * y：同top

### 2.2 client

```
ele.clientLeft(只读)		ele的border-left的宽度
ele.clientTop(只读)		ele的border-top的宽度
ele.clientWidth(只读)		ele的宽度，包括padding不包括border，不包括(要减去)滚动条宽度
ele.clientHeight(只读)	ele的高度，包括padding不包括border，不包括(要减去)滚动条宽度
```

### 2.3 scroll

```
scroll事件，元素的滚动条被拖动时触发(拖动过程中不停地触发)
ele.scrollLeft(可以赋值)	ele的内容向左侧滚动出去的距离，配合scroll事件
ele.scrollTop(可以赋值)		ele的内容向上方滚动出去的距离，配合scroll事件
ele.scrollWidth(只读)		 ele的内容的宽度，包括padding和隐藏的内容，不包括(要减去)滚动条宽度
ele.scrollHeight(只读)	 ele的内容的高度，包括padding和隐藏的内容，不包括(要减去)滚动条宽度
```

* 页面滚动出去的距离

  ```javascript
  var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  ```

```javascript
// scrollLeft/Top兼容性问题
document.onclick = function () {
	console.log(getScrollDis().scrollLeft);
	console.log(getScrollDis().scrollTop);
}
function getScrollDis() {
	var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	return {
		scrollLeft: scrollLeft,
		scrollTop: scrollTop
	}
}
```

### 2.6 当盒子居中遇到js位置操作

1. 用定位 + **translate**控制盒子居中：

   这时用**offsetLeft**获取的盒子边缘依然是translate之前盒子的边缘线的位置(即offsetLeft的值是盒子中线的位置)

   再次使用定位box.style.left/top来改变盒子位置时：盒子边缘是盒子中线的位置

2. 用定位 + margin控制盒子居中：

   这时用offsetLeft获取的盒子边缘是正常的盒子border的位置

   再次使用定位box.style.left/top来改变盒子位置时：盒子边缘是盒子中线的位置

3. 盒子定位是相对于其自身的margin边缘的

```
css:
left: 50%;
margin-left: -160px;
js:
mvbox.style.left = mvboxPoX + 160 + 'px';
```

### 2.5 案例-弹出窗口和遮盖层

```
弹出登录窗口+遮盖层(遮盖层作用：1.突出显示窗口；2.挡住页面内容使之不可点击)
遮盖层设置固定定位fixed，并将宽高设为100%
样式中将弹出窗口的z-index设置为9999即可
遮盖层隐藏显示display：none;
```

## 3. 动画

### 3.1 动画封装

```
1.使用定时器实现动画效果
2.将实现动画效果的代码封装在函数中，可以给多个元素设置动画效果
3.在动画函数中为元素添加一个属性timeId，使每个元素有自己的定时器，互不干扰
```

```javascript
function animate(ele, steppx, dist) {
	// 有timeId，取消当前定时器,避免为一个元素设置多个定时器
	if (ele.timeId) {
		clearInterval(ele.timeId);
	}
	// 设置新的定时器
	ele.timeId = setInterval(function () {
		// 到达指定位置取消定时器,预定位置-当前位置 <= 步进距离
		if (dist - ele.offsetLeft <= steppx) {
			ele.style.left = dist + 'px';
			clearInterval(ele.timeId);
			return;
		}
		ele.style.left = ele.offsetLeft + steppx + 'px';
	}, 30);
}
```

### 3.2 案例-轮播图

#### 3.2.1 模拟点击函数

```
ele.click();相当于鼠标点击了一下ele
```

#### 3.2.2 图片无缝滚动

* 详见F:\WebFrontendRep\案例\WebAPI\案例2.2.1.5-图片滚动.html

```
把第一张克隆ele.cloneNode()并加到最后
点击下一张按钮时：{
  1.先检查当前图片(全局变量索引index)是否是克隆的最后一张(index就等于原有图片数量,即克隆的那张的索引)
  	如果是：把图片直接移动到真正的第一张，并把index设置为0(第一张)；
  	否则继续向下执行
  2.把index加1(此时的index就是下一张的索引)
  3.如果index小于原有图片数量(即index最大等于最后一张的索引，不带克隆的那张，它没有对应的序号)：
  	  则模拟点击index对应的序号，完成显示下一张
  	否则index就等于原有图片数量(即克隆的那张的索引，但它没有对应的序号，不能模拟点击序号)
  	  调用动画函数，将图片从最后一张移动到克隆的第一张
  	  让第一张的序号高亮显示(此时显示的图片实际上时克隆的第一张，所以下次点击下一张时先执行步骤1)
}
点击上一张按钮时：{
  1.先检查当前图片(全局变量索引index)是否是第一张
    如果是：把图片直接移动到克隆的的第一张，并把index设置为原有图片数量(克隆的第一张的索引)；
    否则继续向下执行
  2.把index减1(此时的index就是上一张的索引)
  3.则模拟点击index对应的序号，完成显示上一张
  由于第一张到最后一张的过渡，是通过跳转到最后一张(克隆的第一张)来实现的，所以上一张不存在没有序号的情况
}
```





























