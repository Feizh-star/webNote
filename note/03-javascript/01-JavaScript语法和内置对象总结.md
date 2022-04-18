# JavaScript语法和内置对象总结

## 〇、基础知识

### 1. JavaScript介绍

​	JavaScript  运行在客户端(浏览器)的编程语言

> JavaScript是一种运行在***客户端*** 的***脚本语言*** 
> JavaScript的解释器被称为JavaScript引擎，为浏览器的一部分，广泛用于客户端的脚本语言，最早是在HTML（标准通用标记语言下的一个应用）网页上使用，用来给HTML网页增加动态功能。

### 2. JavaScript的应用场景

​	JavaScript 发展到现在几乎无所不能。

1. 网页特效
2. 服务端开发(Node.js)
3. 命令行工具(Node.js)
4. 桌面程序(Electron)
5. App(Cordova)
6. 控制硬件-物联网(Ruff)
7. 游戏开发(cocos2d-js)

### 3. JavaScript和HTML、CSS的区别

1. HTML：提供网页的结构，提供网页中的内容
2. CSS: 用来美化网页
3. JavaScript: 可以用来控制网页内容，给网页增加动态的效果

### 4. JavaScript的组成

![](../../image/js/js组成.png)

#### 4.1 ECMAScript - JavaScript的核心

* ECMA 欧洲计算机制造联合会
* 网景：JavaScript
* 微软：JScript

  定义了JavaScript的语法规范，是JavaScript的核心，描述了语言的基本语法和数据类型，ECMAScript是一套标准，定义了一种语言的标准，与具体实现无关。

#### 4.2 BOM - 浏览器对象模型

  一套操作浏览器功能的API。通过BOM可以操作浏览器窗口，比如：弹出框、控制浏览器跳转、获取分辨率等。

#### 4.3 DOM - 文档对象模型

  一套操作页面元素的API。DOM可以把HTML看做是文档树，通过DOM提供的API可以对树上的节点进行操作。

### 5. JavaScript的书写位置

- 写在行内

```html
<input type="button" value="按钮" onclick="alert('Hello World')" />
```

- 写在script标签中，可以写在<head> 标签里，也可以写在<body> 标签里。

```html
<head>
  <script>
    alert('Hello World!');
  </script>
</head>
```

- 写在外部js文件中，在页面引入，可以写在<head> 标签里，也可以写在<body> 标签里。

```html
<script src="main.js"></script>
```

- 注意点

  ***引用外部js文件的script标签中不可以写JavaScript代码***

## 一、变量和数据类型

### 1.变量 

#### 1.1 什么是变量

* 变量是计算机内存中存储数据的标识符，根据变量名称可以获取到内存中存储的数据

#### 1.2 为什么使用变量

* 使用变量可以方便的获取或者修改内存中的数据

#### 1.3 如何使用变量

1. var声明变量

   ```javascript
   var age;
   ```

2. 变量的赋值

   ```javascript
   var age;
   age = 18;
   ```

3. 同时声明多个变量

   ```javascript
   var age, name, sex;
   age = 10;
   name = 'zs';
   ```

4. 同时声明多个变量并赋值

   ```
   var age = 10, name = 'zs';
   ```

5. 变量在内存中的存储

   ```javascript
   var age = 18, name = 'zs';
   ```

   ![](../../image/js/变量.png)

#### 1.4 JS中变量的命名规范

- 规则 - 必须遵守的，不遵守会报错
  - 由字母、数字、下划线、$符号组成，不能以数字开头
  - 不能是关键字和保留字，例如：for、while。
  - 区分大小写
- 规范 - 建议遵守的，不遵守不会报错
  - 变量名必须有意义
  - 遵守驼峰命名法。首字母小写，后面单词的首字母需要大写。例如：userName、userPassword

### 2. 数据类型

#### 2.1 （简）Number

  JS中数值类型Number包括**整数**和**浮点数** 。

1. 数值范围

   > 最小值：Number.MIN_VALUE，这个值为： 5e-324
   >
   > 最大值：Number.MAX_VALUE，这个值为： 1.7976931348623157e+308
   >
   > 无穷大：Infinity
   >
   > 无穷小：-Infinity
   >
   > isFinity(Infinity)：判断参数是否是有限值，除了有限的数值外，都返回false

2. 浮点数的精度问题

   > 浮点数值的最高精度是 17 位小数
   >
   > ```
   > var result = 0.1 + 0.2;    // 结果不是 0.3，而是：0.30000000000000004
   > ```
   >
   > **不要判断两个浮点数是否相等**

3. 数值判断

   > NaN：not a number
   >
   > NaN 与任何值都不相等，包括他本身
   >
   > isNaN(NaN): is not a number，只要不是数值，就为true

##### (1) 交换变量的值

```javascript
// 定义Number变量
var n1 = 5;
var n2 = 6;
console.log(n1, n2)
// 交换变量的值
n1 = n1 + n2;
n2 = n1 - n2;
n1 = n1 - n2;
console.log(n1, n2);
```

#### 2.2 （简）String

  JS中字符串**字面量**使用'单引号'或"双引号"都可以。

##### (1) 转义字符![](../../image/js/转义字符.png)

##### (2) 字符串长度length

```javascript
var str = '黑马程序猿 Hello World';
console.log(str.length);
```

##### (3) 字符串拼接

  JS中字符串拼接使用 + 连接：

* 两边只要有一个是字符串，那么+就是字符串拼接功能；
* 两边如果都是数字，那么就是算术功能。

```javascript
console.log(11 + 11);	//算数
console.log('hello' + ' world');	//字符串拼接
console.log('100' + '100');	//字符串拼接
console.log('11' + 11);	//字符串拼接
console.log('male:' + true);	//字符串拼接
```

##### (4) 空字符串运算

* `''`空字符串是可以进行++或--运算的，++运算后得1，--运算后得-1
* 当然也可以 + 或 -

#### 2.3 （简）Boolean

  JS中Boolean是布尔类型，用于逻辑判断。

- Boolean字面量：  true和false，区分大小写
- 计算机内部存储：true为1，false为0

#### 2.4 （简）Undefined

  undefined表示一个**声明**了但**没有赋值**的变量，变量**只声明**的时候值默认是undefined。

#### 2.5 （简）Null

  null表示一个空，变量的值如果想为null，必须手动设置。

#### 2.6 复杂数据类型

* Object
* 数组
* 等等

##### (1) 简单类型和复杂类型的区别

Tips：JS中没有堆和栈的概念，但这样表达易于理解。

* 简单类型

  > 简单类型（基本类型）又叫做值类型，在存储时，变量中存储的是值本身，因此叫做值类型。

![](../../image/js/简单类型.png)

* 复杂类型

  > 复杂类型又叫做引用类型，在存储时，变量中存储的仅仅是地址（引用），因此叫做引用数据类型。

![](../../image/js/复杂类型.png)

* 作为函数参数时

  > 简单类型按值传递参数

  > 复杂类型按引用传递参数

#### 2.7 typeof获取变量的类型

* typeof age
* typeof(isTrue + "")

```javascript
var age = 18;
var isTrue = true;
console.log(typeof age);  // 'number'
console.log(typeof(isTrue + ""));
```

##### (1) 判断参数类型

```
// 判断参数类型(简单类型)
var qqq = 1;
console.log('boolean' === typeof qqq);	//false
console.log('number' === typeof qqq);	//true
console.log('string' === typeof qqq);	//false
```

#### 2.8 数据类型转换

##### (1) 转换成String

###### 1) var.toString()

```javascript
var num = 5;
console.log(typeof num.toString());
```

###### 2) String(var)

```javascript
// undefined和null没有toString()方法，可以使用String()方法
var undef;
var nu_ll = null;
console.log(typeof String(undef));
console.log(typeof String(nu_ll));
```

###### 3) “+”连接空字符串

* isTrue + ""

```javascript
var isTrue = true;
// 变量用“+”连接一个空字符串，即可完成转换
console.log(typeof(isTrue + ""));
```

##### (2) 转换成Number

###### 1) Number(var)

* 纯数字(int/float)字符串

  ```javascript
  var strf = '123.5';
  var numstr = '123';
  console.log(Number(numstr));	// 123
  console.log(Number(strf));	// 123.5
  ```

* 布尔类型

  ```javascript
  var isTrue1 = true;
  console.log(Number(isTrue1));	// 1
  ```

* 除以上两种之外,返回NaN

  ```
  var numAndStr = '123abc';
  console.log(Number(numAndStr));	// NaN
  ```

###### 2) parseInt(var)

* 以整数(int)开头/纯整数(int)的字符串

  ```javascript
  var numAndStr = '123abc';
  console.log(parseInt(numAndStr));	// 123
  ```

* 其他（布尔、字母开头字符串...），返回NaN

###### 3) parseFloat(var)

* 数字(int/float)开头/纯数字(int/float)的字符串

  ```javascript
  var numf = '123.55';
  console.log(parseFloat(numf));	// 123.5
  var numfStr = '123.55.ab';
  console.log(parseFloat(numfStr));	// 123.5
  ```

* 其他（布尔、字母开头字符串...），返回NaN

###### 4) +，-，-0等运算

* 纯数字(int/float)字符串

  ```javascript
  var numstr = '123.5';
  console.log(+numstr);	// 123.5
  console.log(-numstr);	// -123.5
  console.log(numstr - 0);// 123.5
  ```

  

* 布尔类型

  ```javascript
  var isTrue1 = true;
  console.log(+isTrue1);	// 1
  console.log(isTrue1 - 0);// 1
  ```

##### (3) 转换成Boolean

###### 1) Boolean(var)

* 以下值，属于falsy值（虚值），在条件语句中 会转换成false

  * false
  * 0 ——零
  * -0 —— -零
  * 0n —— 零n
  * "", '', `` —— 空字符串、空模板字符串
  * null —— null- 缺少值
  * undefined —— undefined - 原始值
  * NaN —— NaN - 非数值

  ```javascript
  var numm = 0;
  console.log(Boolean(numm));	// false
  ```

* 其他

  ```javascript
  var numm = 1;
  console.log(Boolean(numm));	// true
  ```

### 3. 操作符

#### 3.1 算数运算符

##### (1) +   -   *   /   %

* +

  > 加法运算

* -

  > 减法运算

* *

  > 乘法运算

* /

  > 除法运算，由于JS中不分整形和浮点型，所以“/”全部是浮点运算，两个除不尽的整数相除，会得到会得到浮点数 。例如`5 / 3` 得到`1.6666666666666667` 。

* %

  > 取余运算，整数取余：`5 % 3` 得到 `2` ；浮点数取余`6.3 % 3.1` 得到`0.09999999999999964` (0.1)。

#### 3.2 一元运算符

##### (1) ++   --

* 前置++：变量先自增+1，再返回变量的值
* 后置++：先返回变量的值，再将变量自增+1
* --同理

#### 3.3 逻辑运算符(布尔运算符) 

##### (1) &&   ||   !

* &&

  > 与  两个操作数同时为true，结果为true，否则都是false

* ||

  > 或  两个操作数有一个为true，结果为true，否则为false

* !

  > 非  取反，原本为true，取反后为false；原本为false，取反后为true；

##### (2) &&和||运算的过程

  在js的&&和||运算中，如果表达式不是布尔类型，会对第一个表达式结果进行转换，并遵循以下规则：

1. &&
   * 如果**第一个**表达式  转换成布尔类型  结果是**false**, 直接**返回第一个表达式的值**(此时逻辑运算结果与第一个表达式的布尔值相同)；
   * 如果**第一个**表达式  转换成布尔类型  结果是**true**, 直接**返回第二个表达式的值**(此时逻辑运算结果与第二个表达式的布尔值相同)；
2. ||
   * 如果**第一个**表达式  转换成布尔类型  结果是**ture**, 直接**返回第一个表达式的值**(此时逻辑运算结果与第一个表达式的布尔值相同)；
   * 如果**第一个**表达式  转换成布尔类型  结果是**false**, 直接**返回第二个表达式的值**(此时逻辑运算结果与第二个表达式的布尔值相同)；

**Tips**：利用上述特点可以将符合以下格式的**条件语句**简化为&&和||运算：

* 如果表达式1为假，返回表达式1的值（实际值而非布尔值），否则（表达式1为真），返回表达式2的值

  `变量 = 表达式1 && 表达式2`

* 如果表达式1为真，返回表达式1的值，否则（表达式1为假），返回表达式2的值

  `变量 = 表达式1 || 表达式2`

#### 3.4 关系运算符

##### (1) <   >   >=   <=

* 数值 与 字符串（纯数字）比较：先把数字字符串转换成数值，再比较数值大小
* 数值 与 字符串（非纯数字）比较：先把数字字符串转换成NaN，NaN与任何数值比较都为false
* 字符串比较：比较首字符的编码（ASCII或utf-8）

##### (2) ==   !=   ===   !==

* ==只比较值（类型可以不同）；

* ===类型和值同时相等，才相等

* !=只要值不等，就返回true，值相等，返回false；

  `5 != '1'` 返回`true` ，`5 != '5'` 返回`false`

* !==要**类型**和**值**都**相同**才返回false，否则（只要有一个不同）返回true

  `5 !== 5` 返回`false` ，`5 !== '5'` 返回`true`

#### 3.5 赋值运算符

##### (1) =   +=   -=   *=   /=   %=

```javascript
// 例如：
var num = 0;
num += 5;	//相当于  num = num + 5;
```

#### 3.6 运算符的优先级

1. ()  优先级最高
2. 一元运算符  ++   --   !
3. 算数运算符  先*  /  %   后 +   -
4. 关系运算符  >   >=   <   <=
5. 相等运算符   ==   !=    ===    !==
6. 逻辑运算符 先&&   后||
7. 赋值运算符

**Tips**：括一算关等逻赋

### 4. 表达式和语句

#### 4.1表达式/语句 ? 

1. 表达式

   > 一个表达式可以产生一个值，有可能是运算、函数调用、有可能是字面量。表达式可以放在任何需要值的地方。

2. 语句

   > 语句可以理解为一个行为，循环语句和判断语句就是典型的语句。一个程序有很多个语句组成，一般情况下;分割一个一个的语句

#### 4.2 流程控制

1. 顺序结构
2. 分支结构if
3. 循环结构for、while、do while

#### 4.3 if语句

  格式：

```javascript
if (/* 条件表达式 */) {
  // 执行语句
}

if (/* 条件表达式 */){
  // 成立执行语句
} else {
  // 否则执行语句
}

if (/* 条件1 */){
  // 成立执行语句
} else if (/* 条件2 */){
  // 成立执行语句
} else if (/* 条件3 */){
  // 成立执行语句
} else {
  // 最后默认执行语句
}
```

##### (1) 布尔类型的隐式转换

  流程控制语句会把后面表达式的值隐式转换成布尔类型

* 转换为true：非空字符串  非0数字  true 任何对象
* 转换成false：0  空字符串 null  undefined NaN

##### (2) 找闰年

```javascript
// 找闰年
for (var year = 0; year <= 2020; year++) {
// 判断闰年的条件:能被4整除 且 不能被100整除；或者能被400整除
	if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)){
		console.log('公元' + year + '年是闰年。');
	} else {
		console.log('公元' + year + '年不是闰年。');
	}
}
```

#### 4.4 三元运算符

  若条件成立，返回表达式1的值，不成立，返回表达式2的值。

```
条件 ? 表达式1 : 表达式2;
```

#### 4.5 switch语句

  用条件表达式的值与case后面的值比较，若相等则执行相应case下方的代码，直至遇到break。

```javascript
switch (expression) {
  case 常量1:
    语句;
    break;
  case 常量2:
    语句;
    break;
  case 常量3:
    语句;
    break;
  default:
    语句;
    break;
}
```

* 没有匹配到则执行default
* break可以省略，如果省略，代码会继续执行下一个case
* switch 语句在比较值时使用的是全等操作符, 因此不会发生类型转换（例如，字符串'10' 不等于数值 10）

#### 4.6循环结构

* while和do...while一般用来解决无法确认次数的循环
* for循环一般在循环次数确定的时候比较方便。
* do...while可以用来解决至少要执行一次的循环

##### (1) for

  基本语法：

```javascript
// for循环的表达式之间用的是;号分隔的，千万不要写成,
for (初始化表达式1; 判断表达式2; 自增表达式3) {
  // 循环体4
}
```

##### (2) while

  基本语法：

```javascript
// 当循环条件为true时，执行循环体，
// 当循环条件为false时，结束循环。
while (循环条件) {
  //循环体
}
```

##### (3) do while

  基本语法：

```javascript
do {
  // 循环体;
} while (循环条件);
```

##### (4) continue和break

* break:立即跳出整个循环，即循环结束，开始执行循环后面的内容（只能跳一层）
* continue:立即跳出本次循环，继续下一次循环

#### 4.* 实例

##### (1) 九九乘法表

```javascript
var strSquare = '';
for (var i = 1; i < 10; i++) {
	for (var j = i; j < 10; j++) {	//只要条件 - 初始变量 = 10 - i就可以,var j = i; j < 10;也可以
		strSquare += (i + ' * ' + j + ' = ' + i*j + '\t');
	}
	strSquare += '\n';
}
console.log(strSquare);
```

##### (2) 斐波那契数列

  斐波那契数列：1，1，2，3，5，8，13，......

```javascript
// 斐波那契数列求和
var llMonth = 0;
var lMonth = 1;
var sum = 0;
for (var m = 1; m <= 12; m++){
	console.log(lMonth);
	sum += lMonth;
	var temp = lMonth;
	lMonth += llMonth;	//得到的是下一个数
	llMonth = temp;
}
console.log(sum);
```

### 5. 调试

#### 5.1 根据输出内容调试

  可以在程序中的某个位置把需要的变量的值打印出来，判断程序是否正常执行：

- alert()
- console.log()

#### 5.2 断点调试

  断点调试是指自己在程序的某一行设置一个断点，调试时，程序运行到这一行就会停住，然后你可以一步一步往下调试，调试过程中可以看各个变量当前的值，出错的话，调试到出错的代码行即显示错误，停下。

1. 调试步骤

   >  浏览器中按F12-->sources-->找到需要调试的文件-->在程序的某一行设置断点

2. Watch: 监视，通过watch可以监视变量的值的变化。

3. F10: 程序单步执行，让程序一行一行的执行，这个时候，观察watch中变量的值的变化。

4. F8：跳到下一个断点处，如果后面没有断点了，则程序执行结束。

Tips: **监视变量，不要监视表达式，因为监视了表达式，那么这个表达式也会执行。**

### 6. 数组

  所谓数组，就是将多个元素（通常是同一类型）按一定顺序排列放到一个集合中，那么这个集合我们就称之为数组。数组是一个有序的列表，可以在数组中存放任意的数据，并且数组的长度可以动态的调整。

* JavaScript中数组元素的类型可以不同

  ```javascript
  // 合法
  var arr2 = [1, 'a', 4]; 
  ```

#### 6.1 创建数组

```javascript
// 创建一个空数组
var arr1 = []; 
// 创建一个包含3个数值的数组，多个数组项以逗号隔开
var arr2 = [1, 3, 4]; 
// 创建一个包含2个字符串的数组
var arr3 = ['a', 'c']; 
// 创建一个含有undefined类型arr[1]的数组
var arr = ['red', , 'green', 'blue'];
```

##### (1) length属性

* 可以通过数组的length属性获取数组的长度
* 可以设置length属性改变数组中元素的个数，甚至清空数组

```javascript
var arr3 = ['a', 'c']; 
// 可以通过数组的length属性获取数组的长度
console.log(arr3.length);
// 可以设置length属性改变数组中元素的个数
arr3.length = 0;
```

##### (2) 获取数组元素

* 格式：数组名[索引]，索引从0开始

```javascript
// 格式：数组名[下标]	下标又称索引
// 功能：获取数组对应下标的那个值，如果下标不存在，则返回undefined。
var arr = ['red', 'green', 'blue'];
arr[0];	// red
arr[2]; // blue
arr[3]; // 这个数组的最大下标为2,因此返回undefined
```

##### (3) 遍历数组

```javascript
for(var i = 0; i < arr.length; i++) {
	// 数组遍历的固定结构
}
```

##### (4) 修改或新增元素

* 可以对数组元素像普通变量那样赋值：数组名[索引] = 值

```javascript
// 格式：数组名[下标/索引] = 值;
// 如果下标有对应的值，会把原来的值覆盖，如果下标不存在，会给数组新增一个元素。
var arr = ["red", "green", "blue"];
// 把red替换成了yellow
arr[0] = "yellow";
// 给数组新增加了一个pink的值
arr[3] = "pink";
```

#### 6.* 实例

##### (1) 冒泡排序

* 时间复杂度：O(n^2)
* 空间复杂度：O(1)

```javascript
/**冒泡排序算法：外层循环与选择排序一样，从第一个遍历到倒数第二个元素
内层循环：
1. 从第1个元素开始与后续元素两两比较，比较到numbers.length - 1 - i（i是已经排好序的元素个数=外层循环变量）
2. 这样，每一轮内层循环，都把（除去i个已经排好序的）所有元素两两比较，把大的往后移动（交换）
3. 这样就保证，一轮内层循环结束，都会多一个已经排好的较大元素放在数组靠后的位置
*/
var numbers = [12, 58, 3, 69, 24, 19, 42];
for (var i = 0; i < numbers.length - 1; i++){
	for ( var j = 0; j < numbers.length - 1 - i; j++){
		if (numbers[j] > numbers[j + 1]){
			var temp = numbers[j];
			numbers[j] = numbers[j + 1];
			numbers[j + 1] = temp;
		}
	}
}
console.log(numbers);
```

* 冒泡排序优化

```javascript
// 冒泡排序优化
var numbers = [12, 58, 3, 69, 24, 19, 42];
var count = 0;
for (var i = 0; i < numbers.length - 1; i++){
	count++;
	var isSort = true;	//记录是否排好，假设为true，排好了
	for ( var j = 0; j < numbers.length - 1 - i; j++){
		count++;
		if (numbers[j] > numbers[j + 1]){	//这里用“<”就是把小的往后排，“>”就是把大的往后排
			isSort = false;	//如果执行了这里，就说明没有排好，设为false
			var temp = numbers[j];
			numbers[j] = numbers[j + 1];
			numbers[j + 1] = temp;
		}
	}
	if (isSort){	//如果这一轮比较没有执行上面的“变量交换”，则说明上一轮结束后已经完成了排序，无需再往下执行
		break;		//这种优化方式会在排好的那一轮之后,再排一轮才能判断知否排好了
	}
}
console.log(numbers);
console.log(count);
```

##### (2) 选择排序

* 时间复杂度：O(n^2)
* 空间复杂度：O(1)

```javascript
/**选择排序算法：外层循环与冒泡排序一样，从第一个遍历到倒数第二个元素
内层循环：
1. 假定每次外层循环指向的元素arr[i]是从它开始到最后一个元素的最小值（所以从i+1遍历到最后一个元素）
2. 拿arr[i]与其后面的元素依次比较，若发现一个比arr[i]还小的元素，则把它们两个交换，
3. 这样就保证，一轮内层循环结束，arr[i]就是是[i ~ length-1]中最小的
*/
function chooseSort(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[i]) {
				let temp = arr[i]
				arr[i] = arr[j]
				arr[j] = temp
			}
		}
	}
	console.log(arr)
}
```

##### (3) 插入排序

* 时间复杂度：O(n^2)
* 空间复杂度：O(1)

```javascript
/**插入排序算法：外层循环从第二个元素开始，直至最后一个元素
 * 1.把当前外层元素暂存到key中，用于和前面的元素比较；并作为备份，因为在找到key的插入位置之前，前面的每一个比key大的元素，都会向后移动（key原本的位置当然被覆盖了）
内层循环：
1. 从当前key的索引的前一个开始，从后向前遍历；直至：找到比key小的元素 或 到达数组第一个元素（说明key比第一个元素还小，就被key放在第一个位置）
2. 在满足 找到比key小的元素 或 到达数组第一个元素 之前，总是把前面的元素向后移动一个位置
3. 找到key要插入的位置之后，把key放在当前j的后面一个位置（key要放在比它小的元素后面）
*/
function insertionSort(arr) {
	for (var i = 1; i < arr.length; i++) {
		let key = arr[i]
		let j = i - 1
		while(j >= 0 && arr[j] > key) {
			arr[j + 1] = arr[j]
			j--
		}
		arr[j + 1] = key
	}
	console.log(arr)
}
```

##### (4) 希尔排序

* 时间复杂度：O(n log n)
* 空间复杂度：O(1)

```javascript
/**希尔排序算法：就是插入排序的升级版，先进行稀疏的插入排序（间隔较大）
 * 再进行间隔较小的排序方式的时候，大多数元素已经在合适的位置上了，所以可以大幅减少元素的移动次数
1. 比插入排序多了一层循环用于分配 间隔
2. 内部两层循环跟插入排序的结构完全一样，只是把间隔（插入排序为1）改为step（外层循环分配的间隔）
3. 可以先写内层插入排序，再把1改成间隔变量即可
*/
function shellsort(arr) {
	let gaps = [5,3,1]
	for (var g = 0; g < gaps.length; ++g) {
		let step = gaps[g]
		// 这里其实就是插入排序
		for (var i = step; i < arr.length; ++i) {
			var key = arr[i];
			let j = i - step
			while (j >= 0 && arr[j] > key) {
				arr[j + step] = arr[j];
				j -= step
			}
			arr[j + step] = key
		}
	}
	console.log(arr)
}
```

###### 4-1 动态计算间隔的希尔排序

* 实测1亿个 [0, 1000000]的随机数，77s排完

```javascript
function shellsort(arr) {
	let N = arr.length
	let h = 1
	/*
	1. h就是动态计算的间隔，先使用一个while循环，计算出h的最大值（一定是3的倍数加1）
	2. 在希尔排序的过程中，将用过的h - 1(一定得到1个3的倍数)，然后再除以3，得到下一个更小的间隔
	3. 最终h一定会回到1（即选择排序）
	*/
	// 这个循环中的计算h = 3 * h + 1近似于 3^n（实际上并不是指数函数，但比指数函数增长更快），所以即使N的值达到几十亿，这个循环也不过执行了几十次
	while(h < N / 3) {
		h = 3 * h + 1
	}
	while(h >= 1) {
		for (var i = h; i < arr.length; ++i) {
			var key = arr[i];
			let j = i - h
			while (j >= 0 && arr[j] > key) {
				arr[j + h] = arr[j];
				j -= h
			}
			arr[j + h] = key
		}
        // 缩小h（间隔）
		h = (h - 1) / 3
	}
}
```

##### (5) 快速排序

* 时间复杂度：O(n log n)
* 空间复杂度：O(log n)

* 待补充

### 7. 函数

  在JS中，函数(函数的声明)也是一种数据类型（复杂数据类型）。

#### 7.1 函数声明

  格式：

```javascript
function 函数名() {
  // 函数体
}
```

* 函数表达式

```javascript
var fn = function () {
  // 函数体
}
```

##### (1) 函数调用

* 调用函数的语法：

```
函数名();
```

##### (2) 函数的参数 

  函数内部是一个封闭的环境，可以通过参数的方式，把外部的值传递给函数内部。带参数的函数声明：

```javascript
// 带参数的函数声明
function 函数名(形参1, 形参2, 形参3...) {
  // 函数体
}

// 带参数的函数调用
函数名(实参1, 实参2, 实参3); 
```

##### (3) 参数传递

* 简单数据类型：传递值，即相当于赋值（形参 = 实参）
* 复杂数据类型：传递引用，即形参和实参指向同一个数据

##### (4) 函数的返回值

* 返回值（简单复杂类型均可）语法：

```javascript
//声明一个带返回值的函数
function 函数名(形参1, 形参2, 形参3...) {
  //函数体
  return 返回值;
}

//可以通过变量来接收这个返回值
var 变量 = 函数名(实参1, 实参2, 实参3...);
```

函数的调用结果就是返回值，因此我们可以直接对函数调用结果进行操作。

1. 如果函数没有显示的使用 return语句 ，那么函数有默认的返回值：undefined
2. 如果函数使用 return语句，那么跟再return后面的值，就成了函数的返回值
3. 如果函数使用 return语句，但是return后面没有任何值，那么函数的返回值也是：undefined
4. 函数使用return语句后，这个函数会在执行完 return 语句之后停止并立即退出，也就是说return后面的所有其他代码都不会再执行。

#### 7.2 arguments

  JS中，arguments对象是比较特别的一个对象，实际上是当前函数的一个内置属性。也就是说所有函数都内置了一个arguments对象，arguments对象中存储了传递的所有的实参。arguments是一个伪数组，因此可以像数组一样进行遍历。

* 可以利用arguments定义可变参数得函数。可以向函数传递多于**函数声明中的形参格式**的**实参** ，然后用arguments[i]来访问这些参数。
* 若实参个数多于形参个数，则多出的参数在arguments中，函数可以正常执行
* 若实际参数少于形参个数，则缺少的参数是undefined

```javascript
// 变参数(参数个数不固定)求和
function sumOfNums() {
	var sum = 0;
	for (var i = 0; i < arguments.length; i++) {
		sum += arguments[i];	//arguments是一个函数的参数列表，可以像数组一样获取每一个元素
	}
	return sum;
}
//javascript中函数调用时的参数个数，可以与函数定义时不同，传入的实参储存在arguments对象中
console.log(sumOfNums(1, 2, 3, 4, 5, 6, 7, 8))
```

##### (1) 判断参数类型 

```javascript
// 利用arguments对象可以判断传入的参数的类型
function argum() {
	console.log(typeof arguments[0]);
}
var array = [1, 2, 3, 4, 5];
console.log(typeof array);
argum(array)
```

#### 7.3 匿名函数

  匿名函数：没有名字的函数

* 将匿名函数赋值给一个变量，这样就可以通过变量进行调用匿名函数自调用

```javascript
var fn = function () {
  console.log('匿名函数')
};
// 可以这样调用
fn();
```

##### (1) 自调用函数

  匿名函数不能通过直接调用来执行，因此可以通过匿名函数的自调用的方式来执行。

```javascript
(function () {	//括号括起来相当于一个值（function类型），值后面跟括号代表调用
  alert(123);
})();
```

#### 7.4 函数是一种数据类型

* 函数作为参数

  > 因为函数也是一种类型，可以把函数作为两一个函数的参数，在另一个函数中调用

- 函数做为返回值

  > 因为函数是一种类型，所以可以把函数可以作为返回值从函数内部返回。

```
function fn(b) {
  var a = 10;
  return function () {
    alert(a+b);
  }
}
fn(15)();	//fn(15)是一个函数，即return后面的函数
```

#### 7.* 实例

##### (1) 判断素数

```javascript
// 判断素数
function jdugePrimeNumber(num) {
	var isPrime = true;	//若没有这样一个变量，则很难证明一个数是素数(for执行完num-1次才能知道)
	for (var i = 2; i < num; i++) {
		if (num % i === 0){
			isPrime = false;	//此判断只要执行到这里一次，就说明不是素数
			break;	
		}
	}
	//若for循环没有break，则isPrime = true表明num是素数
	if (isPrime) {
		console.log(num + '是素数！');
	} else {
		console.log(num + '不是素数！');
	}
}
// jdugePrimeNumber(31);
for (var i = 2; i < 100; i++) {
	jdugePrimeNumber(i);
}
```

##### (2) 求阶乘的和 

```javascript
// 求阶乘的和(只求阶乘太简单)：1! + 2! + 3! + ... + n!
function factorial(n) {
	var sum = 0;	//记录阶乘累加的和
	var product = 1;	//计算阶乘的乘积
	for (var i = 1; i <= n; i++) {
		product *= i;	//i的阶乘就是(i-1)!再乘以i
		sum += product;	//对每一个阶乘进行累加
	}
	return sum;
}
console.log(factorial(5));
```

##### (3) 计算日期天数

```javascript
// 计算某日期是当年的第几天
function getDaysFromDate(year, month, day) {
	var days = day;
	// 遍历month月份之前的每个月，利用switch判断各个月的天数
	for (var i = 1; i < month; i++) {
		switch (i) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				days += 31;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				days += 30;
				break;
			case 2: 	//二月比较特殊，先判断是否为闰年
				if (isRun(year)){	//直接调用函数判断闰年
					days += 29;
				} else {
					days += 28;
				}
				break;
		}
	}
	return days;
}
// 测试
console.log(getDaysFromDate(2020, 5, 1));
```

### 8. 作用域

  作用域：变量可以起作用的范围。

#### 8.1 全局变量（全局作用域）

* 在任何地方都可以访问到的变量就是全局变量，对应全局作用域
* 在函数外部使用var声明的、在函数内部不使用var声明的（不推荐）是全局变量

#### 8.2 局部变量（函数作用域）

* 只在固定的代码片段内可访问到的变量，最常见的例如函数内部。对应局部作用域(函数作用域)
* **es5之前** JS中没有块级作用域（用{}包起来的代码块）

#### 8.3 作用域链

* 只有函数可以制造作用域结构， 那么只要是代码，就至少有一个作用域，即全局作用域。凡是代码中有函数，那么这个函数就构成另一个作用域。如果函数中还有函数，那么在这个作用域中就又可以诞生一个作用域。
* 将这样的所有的作用域列出来，可以有一个结构: 函数内指向函数外的链式结构。就称作作用域链。
* 在函数中访问一个变量，它从自己所处的作用域开始 沿着作用域链向上找，直至找到最近的同名变量。

```javascript
// 案例
function f1() {
    var num = 123;
    function f2() {
        console.log(num); 
    }
    f2();
}
var num = 456;
f1();	// 123
```

![](../../image/js/06-2.png)

### 9. 预解析

  JavaScript代码的执行是由浏览器中的JavaScript解析器来执行的。JavaScript解析器执行JavaScript代码的时候，分为两个过程：预解析过程和代码执行过程。

预解析过程：

1. 把**变量的声明**提升到**当前作用域**的最前面，只会提升声明，不会提升赋值。
2. 把**函数的声明**提升到**当前作用域**的最前面，只会提升声明，不会提升调用。
3. 先提升var，在提升function。
4. 在预解析的过程中如果未赋值变量和函数名字相同，在使用这个名字时，函数优先(变量赋值之前)

```javascript
// 4、-----------------------------------
console.log(a);
function a() {	//预解析时函数定义提前
  console.log('aaaaa');
}
var a = 1;	//预解析时变量声明提前，变量赋值不提前
console.log(a);
//预解析后
var a;//预解析时变量声明提
function a() {	//预解析时函数定义提前
  console.log('aaaaa');
}
console.log(a);	//变量与函数同名，变量未赋值，此时a是函数名
a = 1;
console.log(a);	//此时a是变量
```

### 10. 对象

  JavaScript的对象是无序属性的集合。其属性可以包含基本值、对象或函数。对象就是一组没有顺序的值。我们可以把JavaScript中的对象想象成键值对，其中值可以是数据和函数。

  对象的行为和特征：

* 特征---属性（变量）

  > 如果一个变量属于一个对象所有，那么该变量就可以称之为该对象的一个属性，属性一般是名词，用来描述事物的特征

* 行为---方法（函数）

  > 如果一个函数属于一个对象所有，那么该函数就可以称之为该对象的一个方法，方法是动词，描述事物的行为和功能

#### 10.1 对象字面量

  如下就是JavaScript中的对象字面量：

* 花括号{}
* 键值对，用“:”分隔（键: 值）
* 键值对之间用“,”分隔

```javascript
var o = {
  name: 'zs,
  age: 18,
  sex: true,
  sayHi: function () {
    console.log(this.name);
  }
};
```

#### 10.2 创建对象的方式

##### (1)对象字面量 

```javascript
// 创建一个空对象
var o = {};
```

##### (2) new Object()

* `var person = new Object();` 创建一个空对象；
* 为空对象添加属性和方法

```
var person = new Object();
person.name = 'lisi';
person.age = 35;
person.job = 'actor';
person.sayHi = function() {
  console.log('Hello,everyBody');
}
```

##### (3) 工厂函数创建对象

  可以把new Object()创建对象的方式写在一个函数中，这个函数就成为工厂函数：

* 参数：要为新对象添加的属性和方法；
* 函数体：和new Object()创建对象的方式一样；
* 返回值：创建的对象

```javascript
function createPerson(name, age, job) {
  var person = new Object();
  person.name = name;
  person.age = age;
  person.job = job;
  person.sayHi = function(){
    console.log('Hello,everyBody');
  }
  return person;
}
var p1 = createPerson('张三', 22, 'actor');
```

##### (4) 自定义构造函数

  构造函数 ，是一种特殊的函数。主要用来在创建对象时初始化对象， 即为对象成员变量赋初始值，总与new运算符一起使用在创建对象的语句中。构造函数的写法：

* 函数名：首字母大写
* 使用 **this.属性/方法** 为即将创建的对象添加属性
* 使用new调用构造函数，会返回一个对象

```javascript
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayHi = function(){
  	console.log('Hello,everyBody');
  }
}
var p1 = new Person('张三', 22, 'actor');
```

#### 10.3 new 关键字

  new在执行时会做四件事情：

1. new会在内存中创建一个新的空对象
2. new 会让this指向这个新的对象
3. 执行构造函数  目的：给这个新对象加属性和方法
4. new会返回这个新对象

**Tips**：创指执返

#### 10.4 this详解

  函数在定义的时候this是不确定的，只有在调用的时候才可以确定

1. **普通函数**中的this-------->指向window

2. **构造函数**中的this-------->指向new创建的新的空对象

   > 构造函数中的this其实是一个隐式对象，类似一个初始化的模型，所有方法和属性都挂载到了这个隐式对象身上，后续通过new关键字来调用，从而实现实例化

3. **方法**中的this ----------->指向方法所属的对象（调用方法的对象）

4. **事件处理函数**中的this---->事件源，即指向注册该事件的元素对象

#### 10.5 访问对象的属性

  访问对象的属性有两种形式：

1. 对象.属性名
2. 对象['属性名']

##### (1) 添加/修改属性

* 直接使用`对象.新属性 = 值` 即可添加属性
* 使用`对象.属性 = 值` 即可修改属性

##### (2) for in 遍历对象的属性

  通过for..in语法可以遍历一个对象：

* key是一个String变量，它的值就是对象的属性名

```javascript
var obj = {
  name: 'zs,
  age: 18,
  sex: true,
  sayHi: function () {
    console.log(this.name);
  }
};
for(var key in obj) {
  console.log(obj[key]);
}
```

##### (3) delete 删除对象的属性

* delete 对象.属性;

```javascript
function Fun() { 
  this.name = 'mm';
}
var obj = new Fun(); 
console.log(obj.name); // mm 
delete obj.name;
console.log(obj.name); // undefined
```

### 11. 内置对象

  JavaScript中的对象分为3种：内置对象、自定义对象、浏览器对象。

#### 11.1 Math对象

```javascript
Math.PI						// 圆周率
Math.random()				// 生成随机数,返回一个浮点, 伪随机数，范围[0, 1)
Math.floor()/Math.ceil()	 // 向下取整/向上取整
Math.round()				// 取整，四舍五入
Math.abs()					// 绝对值
Math.max()/Math.min()		 // 求最大和最小值
Math.sin()/Math.cos()		 // 正弦/余弦
Math.power()/Math.sqrt()	 // 求指数次幂/求平方根
```

#### 11.2 Date对象

  创建 `Date` 实例用来处理日期和时间。Date 对象基于1970年1月1日（世界标准时间）起的毫秒数。

##### (1) Date()构造函数

  Date的成员是实例成员，需先new。

```javascript
// 1.不传参数, 得到当前标准时间
var datenow = new Date();
console.log(datenow);
// 2.传入毫秒值（距1970-01-01 00：00:00的毫秒数）,得到与之对应的标准时间
var dateFromMilli = new Date(1654891354796);
console.log(dateFromMilli);
// 3.传入常见的日期格式字符串,转换为标准时间
var dateFromStrDate = new Date('2020-08-06 12:10');
console.log(dateFromStrDate);
// 4.传入数字序列(年，月，日，时，分，秒，毫秒)，返回标准时间
// 这里的月份是从0月开始，实际月份=月+1
var dateFromValue = new Date(2020, 9, 31);
console.log(dateFromValue);
```

##### (2) 获取日期对象的毫秒值

```javascript
// 获取日期对象的毫秒值
// 1.date.valueOf(),一般不显式调用
var dateMs1 = new Date();
console.log(dateMs1.valueOf());
// 2.date.getTime()，较常用
var dateMs2 = new Date();
console.log(dateMs2.getTime());
// 3.使用'+'正号使日期对象转换成数值,较常用(隐式调用valueOf())
var dateMs3 = + new Date();
console.log(dateMs3);
// 4.使用静态成员Date.now()函数，需浏览器支持HTML5，有兼容性问题，不常用
var dateMs4 = Date.now();
console.log(dateMs4);
```

##### (3) 将Date实例转换成字符串

```javascript
var date1 = new Date();
console.log(date1);	//打印时会调用toString()进行隐式转换
// date.toString()将日期对象转换成字符串
console.log(date1.toString());
// date.toDateString()将星期 月 日 年转换成字符串(美式)，有兼容性问题
console.log(date1.toDateString());
// date.toTimeString()将时分秒转换成字符串(美式)，有兼容性问题
console.log(date1.toTimeString());
// date.toLocaleDateString()获取本地化的日期字符串，有兼容性问题
console.log(date1.toLocaleDateString());
// date.toLocaleTimeString()获取本地化的时间字符串，有兼容性问题
console.log(date1.toLocaleTimeString());
```

##### (4) 获取日期的指定部分

```javascript
getTime()  	  // 返回毫秒数和valueOf()结果一样
getMilliseconds() 
getSeconds()  // 返回0-59
getMinutes()  // 返回0-59
getHours()    // 返回0-23
getDay()      // 返回星期几 0周日   6周6
getDate()     // 返回当前月的第几天
getMonth()    // 返回月份，***从0开始***
getFullYear() //返回4位的年份  如 2016
```

##### (5) 实例

###### 1) 格式化日期

```javascript
// 格式化日期：将日期转换成'yyyy-mm-dd hh:mm:ss'的形式
// 使用'实例 instanceof 构造函数名'判断参数类型
// 使用三元运算符把一位数字补0
function formatDate(myDate) {
	// 判断参数类型
	if (!(myDate instanceof Date)) {
		console.error(myDate + '不是一个日期对象！');
		return;
	}
	// 自动获取的当前时间，月份从0开始，需要把月份+1显示
	// 设置的月份会直接储存在Date对象中(符合用户感知)，所以不需要+1;实际上Date对象还是从0开始，所以某年12月的年份会+1，月份变成0，需要(后面的三元运算符)特殊处理
	var month = (Math.abs((+ new Date()) - (+ myDate)) < 100) ? (myDate.getMonth() + 1) : (myDate.getMonth() === 0 ? 12 : myDate.getMonth());
	// 如果是自己设置的日期，而月份有恰好设置为12月，则在Date对象中会被转换为下一年0月，需要将年份减一
	var year = (Math.abs((+ new Date()) - (+ myDate)) < 100) ? myDate.getFullYear() : (myDate.getMonth() === 0 ? myDate.getFullYear() - 1 : myDate.getFullYear());
	// 获取年月日时分秒
	var date = myDate.getDate(),
		hour = myDate.getHours(),
		minute = myDate.getMinutes(),
		second = myDate.getSeconds();
	month = month < 10 ? ('0'+ month) : month;
	date = date < 10 ? ('0'+ date) : date;
	hour = hour < 10 ? ('0'+ hour) : hour;
	minute = minute < 10 ? ('0'+ minute) : minute;
	second = second < 10 ? ('0'+ second) : second;

	return (year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second);
}
for (i = 1; i <= 12; i++) {
	var formatDateStr = formatDate(new Date(2020, i));
	console.log(formatDateStr);
}
```

###### 2) 倒计时

```javascript
// 计算时间差(天-小时-分钟-秒 倒计时)
function getInterval(start, end) {
	if (end - start < 0) {
		console.error('请检查输入的时间顺序!');
		return;
	}
	// 日期对象直接相减即可得出相差的毫秒数，直接除以1000得到秒数(浮点值)
	var intervalSec = (end - start) / 1000;
	// 得到天数，取整，舍去的部分是小时数
	var day = Math.floor(intervalSec / (60 * 60 * 24));
	// 得到除去天数后剩余的小时数，取整，舍去的小数部分是分钟数
	var hour = Math.floor(intervalSec / (60 * 60) % 24);
	// 得到除去小时数后剩余的分钟数，取整，舍去的小数部分是秒数
	var minute = Math.floor(intervalSec / 60 % 60);
	// 得到除去分钟数后剩余的秒数，取整，舍去的小数部分是毫秒数
	var second = Math.floor(intervalSec % 60);

	return {
		day: day,
		hour: hour,
		minute: minute,
		second: second
	}
}
var dd1 = new Date(2020, 4, 25);
var dd2 = new Date(2020, 4, 26, 22);
console.log(getInterval(dd1, dd2));
```

#### 11.3 Array对象

  **约定以下方法改变原数组的用“ * ”标记** 。

##### (1) 判断是否为数组类型

1. `arr instanceof Array`
2. `Array.isArray(arr)`

```javascript
var arr = [1, 2];
// 方式1常用
console.log(arr instanceof Array);
// 方式2不常用
console.log(Array.isArray(arr));
```

##### *(2) 清空数组

1. 赋值为[]：`array = [];`
2. length为0： `array.length = 0;`
3. splice()删除：`array.splice(0, array.length);`

```javascript
// 清空数组
var array = [1, 2, 23, 4, 6];
// 方法1
array = [];
// 方法2
array.length = 0;
// 方法3
array.splice(0, array.length);
```

##### *(3) push()和pop()栈操作

1. `array.push(2, 3)`

   * push()作用：在数组末尾(栈顶)压入数据
   * push()参数：一个或多个数组元素
   * push()返回值：返回压入数据后数组长度

   ```javascript
   var array = [5, 6, 1];
   var valueOfPush = array.push(2, 3);
   console.log(valueOfPush);	// 输出数组长度5
   console.log(array);			// 输出[5, 6, 1, 2, 3]
   ```

2. `array.pop()`

   * pop()作用：将数组末尾(栈顶)数据弹出
   * pop()参数：无
   * pop()返回值：返回弹出的数据

   ```javascript
   var array = [5, 6, 1];
   var valueOfPop = array.pop();
   console.log(valueOfPop);		//输出1
   console.log(array);			//输出[5, 6]
   ```

##### *(4) shift()和unshift()队列操作

1. `array.shift()`

   * shift()作用：取出数组的第一个元素，修改length属性
   * shift()参数：无
   * shift()返回值：取出的数据

   ```javascript
   var array = [5, 6, 1, 2, 3];
   var valueOfShift = array.shift();
   console.log(valueOfShift);		//输出5
   console.log(array);				//输出[6, 1, 2, 3]
   ```

2. `array.unshift(8, 'a')`

   * unshift()作用：将一个或多个元素添加到数组的开头
   * unshift()参数：要插入的元素(一个或多个)
   * unshift()返回值：插入后数组长度

   ```javascript
   var array = [5, 6, 1, 2, 3];
   var valueOfUnshift = array.unshift(8, 'a');
   console.log(valueOfUnshift);		//输出7
   console.log(array);				//输出[8, 'a', 5, 6, 1, 2, 3]
   ```

##### *(5) reverse()翻转数组

* reverse()作用：翻转数组本身(原数组已改变)
* reverse()参数：无
* reverse()返回值：颠倒后的新数组(会返回一个新数组)


* `array.reverse()`

  ```javascript
  var array = [5, 6, 1, 2, 3];
  var resultOfReverse = array.reverse();
  console.log(array);				//原数组也是颠倒的,[3, 2, 1, 6, 5]
  console.log(resultOfReverse);	//[3, 2, 1, 6, 5]
  array.push('a');				//返回值是直接对原数组变量的复制，二者指向同一个数组字面量
  console.log(array);				//[3, 2, 1, 6, 5, "a"]
  console.log(resultOfReverse);	//[3, 2, 1, 6, 5, "a"]
  ```

##### *(6) sort()排序

* ！！！！！注意：sort()默认不是对数字大小排序！！！！！

  ```
  // sort()的实现原理:
  // sort()可以理解为就是 把冒泡排序中的，判断 相邻两个元素大小的 逻辑运算 换成一个函数;
  // 这个函数接收 要比较的两个元素，根据 设定的规则 比较两个元素的量化属性(如数值大小、字符串长度、字符串字典顺序等等);
  // 一对元素的若符合这种规则，可将结果返回为一个正数(由程序员决定)，sort()会交换这对元素的位置；
  // 一对元素的若不符合这种规则，可将结果返回为一个负数(由程序员决定)，sort()不会交换这对元素的位置；
  ```

* sort()作用：(不带参数时)按Unicode字符顺序，对数组进行原地排序(原数组已改变)

* sort()参数：一个函数compare(a, b)，指明排序的规则, 数组中任意相邻的两个元素传给形参 a和b

* sort()返回值：排序后的新数组(会返回一个新数组)


* `array.sort()`


* ```javascript
  array.sort(function (a, b) {
  	return a - b;
  });
  array.sort(fn);
  ```

  ```javascript
  var array = [21, 30, 19, 20, 'vdf', 'adf', 'abf'];
  var resultOfSort = array.sort();
  console.log(array);				//[19, 20, 21, 30, "abf", "adf", "vdf"]
  console.log(resultOfSort);		//[19, 20, 21, 30, "abf", "adf", "vdf"]
  array.push('a');				//返回值是直接对原数组变量的复制，二者指向同一个数组字面量
  console.log(array);				//[19, 20, 21, 30, "abf", "adf", "vdf", "a"]
  console.log(resultOfSort);		//[19, 20, 21, 30, "abf", "adf", "vdf", "a"]
  ```

* 实例

  ```javascript
  // 1.比较数字大小
  var array = [102, 36, 21, 89, 64, 33];
  array.sort(function (a, b) {
  	return a - b;	// 若a<b结果为负,顺序不变;若a>b结果为正,顺序颠倒,保证小数在前(反之则保证大数在前)
  });
  console.log(array);

  // 2.比较字符串长短，相同长度的不会按照字典排序
  var array = ['abfee', 'adfe', 'vdf', 'cd', 'asdg', 'd'];
  array.sort(function (a, b) {
  	return a.length - b.length;
  });
  console.log(array);

  // 3.比较字符串长短，相同长度的按照字典排序
  var array = ['abfee', 'adfe', 'vdf', 'cd', 'asdg', 'd', 'adfd', 'adfc', 'adfb', 'adfe'];
  array.sort(function (a, b) {
  	// 长度不同的按照长度排序
  	if (a.length != b.length) {
  		return a.length - b.length;
  	} else {
  		// 长度相同的按照字典顺序排序
  		for (i = 0; i < a.length; i++) {
  			if (a.charAt(i) < b.charAt(i)) {
  				return -1;	//发现前面的字符<后面，为使编码小的排前面，返回-1，顺序不变
  			} else if (a.charAt(i) > b.charAt(i)) {
  				return 1;	//发现前面的字符>后面，为使编码小的排前面，返回1，顺序颠倒
  			} else {
  				continue;	//当前比较字符相同，继续比较下一个，直至最后一个
  			}
  		}
  		return -1;	//字符全部相同，则a，b顺序不变
  	}
  });
  console.log(array);
  ```


##### (7) concat()拼接数组

* concat()作用：合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
* concat()参数：一个或多个数组
* concat()返回值：拼接后的新数组


* `array.concat(array2, array3)`

  ```javascript
  var array1 = [1, 2, 3];
  var array2 = [4, 5, 6];
  var array3 = [7, 8, 9];
  var array4 = array1.concat(array2, array3);
  console.log(array1);	// [1, 2, 3]
  console.log(array4);	// [1, 2, 3, 4, 5, 6, 7, 8, 9]
  ```

##### (8) slice()截取数组

* slice()作用：从数组中截取一段返回一个新数组，此方法不会更改现有数组
* slice()参数1：开始索引begin(包含)
* slice()参数2：结束索引end(不包含,即截取到end - 1),得到个数 = end - begin
* slice()返回值：截取的新数组


* `array.slice(3, 6)`

  ```javascript
  var array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var array2 = array1.slice(3, 6);
  console.log(array1);	//[1, 2, 3, 4, 5, 6, 7, 8, 9]
  console.log(array2);	//[4, 5, 6]
  ```

##### *(9) splice()替换元素

* splice()作用：从指定位置start开始，先删除指定个数deleteCount的元素(可选)，再插入指定的元素item1, item2, ...(可选)。会改变原数组
* splice()参数1：start指定修改的开始位置（从0计数）;
* splice()参数2：deleteCount整数，表示要移除的数组元素的个数；
* splice()参数3：item1, item2等要添加进数组的元素,从start位置开始
* splice()返回值：被删除的元素组成的新数组，没有删除则返回空数组


* `array.splice(2, 1, 5, 6)`

  ```javascript
  var array1 = ['a', 'b', 'c', 'd', 'e', 'f'];
  // 从索引2（'c'）开始，删除1个元素，再放入5, 6这两个元素
  var array2 = array1.splice(2, 1, 5, 6);
  console.log(array1);	//["a", "b", 5, 6, "d", "e", "f"]
  console.log(array2);	//["c"]
  ```

* `array.splice(0, array.length);` 

  > 从0开始删除array.length个元素，即清空数组

##### (10) indexOf()位置查找

* indexOf()作用：找到然后返回指定元素(第一次出现位置)的索引，从前往后找，没找到返回-1，此方法不会更改现有数组
* indexOf()参数1：要查找的元素；
* indexOf()参数2：查找的起始位置(可选)，-n代表从倒数第n个元素开始向后查找
* indexOf()返回值：返回指定元素(第一次出现位置)的索引，没找到返回-1


* `array.indexOf('g')`

  ```javascript
  var array1 = ['a', 'b', 'c', 'd', 'e', 'f'];
  var element = array1.indexOf('e', -3);	//从倒数第三个位置'd'往后找
  console.log(array1);			// ["a", "b", "c", "d", "e", "f"]
  console.log(element);			// 4
  element = array1.indexOf('g');	// 没找到返回-1
  console.log(element);			// -1
  ```

##### (11) lastIndexOf() 位置查找

* lastIndexOf()作用：找到然后返回指定元素(最后一次出现位置)的索引，从后往前找，没找到返回-1，此方法不会更改现有数组
* lastIndexOf()参数1：要查找的元素；
* lastIndexOf()参数2：查找的起始位置(可选)，从起始位置往前查找，-n代表从倒数第n个元素开始向前查找
* lastIndexOf()返回值：返回指定元素(最后一次出现位置)的索引，没找到返回-1


* `array.lastIndexOf('e', 3)`

  ```javascript
  var array1 = ['a', 'e', 'c', 'd', 'e', 'f'];
  var element = array1.lastIndexOf('e', 3);	//从'd'开始往前找'e'
  console.log(array1);		// ["a", "e", "c", "d", "e", "f"]
  console.log(element);		// 1
  element = array1.lastIndexOf('e', -1);	//从'f'开始往前找'e'
  console.log(array1);		// ["a", "e", "c", "d", "e", "f"]
  console.log(element);		// 4
  ```

##### (12) join()数组连成字符串

* join()作用：数组的所有元素连接成一个字符串并返回这个字符串
* join()参数：指定的分隔符，若没有默认用“，”，若使用空字符串""则没有分隔符
* join()返回值：返回一个字符串


* `array.join('||')`

  ```javascript
  var array1 = ['孙猴子', '猪八戒', '沙和尚', 'Michael'];
  var name = array1.join('||');
  console.log(array1);		// ["孙猴子", "猪八戒", "沙和尚", "Michael"]
  console.log(name);			// 孙猴子||猪八戒||沙和尚||Michael
  ```

##### (13) 迭代方法

  迭代方法every()、filter()、forEach()、map()、some()等方法均有以下特性(下面的callback函数就是参数中被调用的函数)：

1. 如果已访问(包含正在访问的)的元素在迭代时被删除了，则当前索引的后一个元素将被跳过，因为后面元素整体前移了1位
2. 如果未访问的元素被删除，则仅仅是不访问这个元素
3. **遍历范围在一开始就定了**[0, array.length - 1]，只是索引范围定了(新加的不会被访问，替换的可以访问)
4. 不改变原数组(callback函数可以)

##### (14) every()迭代(逻辑与)

* every()作用：callback函数对每一个数组元素进行某种判断(返回bool值)，全部符合返回true，只要有一个不符合就返回false（逻辑与）
* every()参数：一个函数callback(element(当前传入的元素), index(当前传入元素的索引，可选), array(当前数组，可选))，thisArg(还没学，详见MDN)
* every()返回值：全部符合返回true，只要有一个不符合就返回false，若收到一个空数组，此方法在一切情况下都会返回true


* `array.every((element, index, array) => element >= 10)`

  ```javascript
  var array1 = [13, 46, 102, 100, 53, 64];
  // 使用了箭头函数
  console.log(array1.every((element, index, array) => element >= 10));	//true
  console.log(array1.every((element, index, array) => element >= 20));	//false
  console.log(array1);	//every()不改变原数组
  console.log(array1.every((element, index, array) => {
  	if (index === 1) {
  		array.splice(2, 1, 5);		//替换的元素可以访问
  		array.splice(6, 0, 103);	//这时添加的元素不会被every访问
  	}
  	return element <= 100;
  }));
  console.log(array1);	//array1已经改变
  ```

##### (15) some()迭代(逻辑或)

* some()作用：callback函数对每一个数组元素进行某种判断(返回bool值)，至少有一个符合返回true，全部不符合就返回false（逻辑或）

* some()参数：一个函数(element(当前传入的元素), index(当前传入元素的索引，可选), array(当前数组，可选))，thisArg(还没学，详见MDN)

* some()返回值：==callback函数只要返回一次true，some就立即返回true（循环终止）==，全部false就返回false。如果用一个空数组进行测试，在任何情况下它返回的都是false

* `array1.some((element, index, array) => element <= 10)`

  ```javascript
  var array1 = [13, 46, 102, 100, 53, 64];
  // 使用了箭头函数
  console.log(array1.some((element, index, array) => element <= 10));	//callback函数全部返回false，some返回false
  console.log(array1.some((element, index, array) => element <= 20));	//callback函数返回一个true(13)，some返回true
  ```

##### (16) filter()迭代(过滤器)

* filter()作用：callback函数对每一个数组元素进行某种判断(返回bool值)，把符合条件的元素（返回true的元素）放入一个新的数组，并返回这个数组
* filter()参数：一个函数callback(element(当前传入的元素), index(当前传入元素的索引，可选), array(当前数组，可选))，thisArg(还没学，详见MDN)
* filter()返回值：一个新数组，包含符合条件的元素


* `array.filter((element, index, array) => element <= 10)`

  ```javascript
  var array1 = [13, 46, 92, 100, 53, 64];
  // 使用了箭头函数
  console.log(array1.filter((element, index, array) => element <= 10));	//没有元素符合条件，返回[]
  console.log(array1.filter((element, index, array) => {
  	if (index === 1) {
  		array.splice(2, 1, 5);	//替换的元素可以访问，添加的不能
  	}
  	return element <= 10;
  }));					//[5]
  console.log(array1);	//array1已经改变[13, 46, 5, 100, 53, 64]
  console.log(array1.filter((element, index, array) => element <= 20));	//[13]
  console.log(array1);	//filter()不改变原数组
  ```

##### (17) forEach()迭代(操作元素)

* forEach()作用：遍历数组，对每个元素执行指定操作，forEach()会跳过undefined元素

* forEach()参数：一个函数(element(当前传入的元素), index(当前传入元素的索引，可选), array(当前数组，可选))，thisArg(还没学，详见MDN)

* forEach()返回值：undefined

* ```javascript
  array.forEach((nowele, ind, arr) => {
  	arr[ind] += 5;
  	numCallbackRuns++;
  });
  ```

  ```javascript
  var array = [10, 20, 30, 40, , 50];
  var numCallbackRuns = 0;
  array.forEach((nowele, ind, arr) => {
  	arr[ind] += 5;
  	numCallbackRuns++;
  });		//forEach()跳过了undefined元素
  console.log(array);	//[15, 25, 35, 45, empty, 55]
  console.log(numCallbackRuns);	//5
  ```

##### (18) map()迭代(映射)

* map()作用：遍历数组，根据callback函数返回值组成一个新的数组并返回，map()不会处理undefined元素

* map()参数：一个函数(element(当前传入的元素), index(当前传入元素的索引，可选), array(当前数组，可选))，thisArg(还没学，详见MDN)

* map()返回值：一个新数组，根据callback函数返回值组成一个新的数组（若某些原数组中的元素没有对应的callback函数返回值，新数组中对应的位置是undefined）

* ```javascript
  array.map((nowele, ind, arr) => {
  	nowele += 5;
  	numCallbackRuns++;
  	return nowele;
  }));
  ```

  ```javascript
  var array = [10, 20, 30, 40, , 50];
  var numCallbackRuns = 0;
  console.log(array.map((nowele, ind, arr) => {
  	nowele += 5;
  	numCallbackRuns++;
  	return nowele;
  }));				// 返回新数组[15, 25, 35, 45, empty, 55]
  console.log(array);	// [10, 20, 30, 40, empty, 50]，原数组没变
  console.log(numCallbackRuns);	// 5
  ```

##### (19) findIndex()迭代(查找索引)

* arr.findIndex(callback)：对数组中的每一项执行callback，直到callback返回true，迭代结束，findIndex返回callback结果是true的元素索引
  * 参数：回调函数，接收每次迭代的数组元素，应在数组元素符合某一条件时返回true以终止迭代
    * 参数：数组元素
  * 返回值：callback返回true时的数组元素的索引
    * 直到遍历完毕，callback也没有返回true，则返回-1

##### (20) 实例

###### 1) 过滤数组元素 

* 使用every()检查每一个元素的类型（检查参数类型）
* 使用filter()将每一个符合条件的元素挑选出来组成新的数组

```javascript
// 把数组中部分符合条件的元素(数值类型)删除
function delElement(arr) {
	if (!arr.every((element_1, index_1, array_1) => 'number' === typeof array_1[index_1])) {
		console.error(arr + '不全是数值类型！');
		return;
	}
	return arr.filter((element_2) => element_2 <= 2000);
}
var array1 = [1800, 2200, 1200, 1500, 3600, 1600, 1900, 2000];
console.log(delElement(array1));	// [1800, 1200, 1500, 1600, 1900, 2000]
var array2 = [1800, 2200, 1200, 1500, 'abc', 3600, 1600, 1900, 2000];
console.log(delElement(array2));	// 1800,2200,1200,1500,abc,3600,1600,1900,2000不全是数值类型！
```

###### 2) 查找某元素的全部索引 

1. 方法1：map()和filter()

* 使用map()把出现目标元素（'x'）的索引放入新数组，没有出现目标元素的什么也不做（默认把undefined放入新数组中的对应位置）：[undefined, undefined, 2, undefined, undefined, 5, undefined];
* 使用filter()把数值类型过滤出来形成一个新的数值数组。

```javascript
// 找到数组中每一个'x'出现的位置
function findX(arr) {
	if (!(arr instanceof Array)) {
		console.error(arr + '不是一个数组！');
		return;
	}
	var tempArr =  arr.map((element_1, index_1, array_1) => {
		if ('x' === element_1) {
			return index_1;
		}
	});
	return tempArr.filter((element_2) => 'number' === typeof element_2);
}
var char1 = ['a', 'b', 'x', 'y', 'xx', 'x', 'g'];
console.log(findX(char1));	// [2, 5]
```

2. 方法2：indexOf()和push()

* 初始数据：索引index = -1; 保存找到的目标的索引的空数组indexs[];
* 利用 indexOf('a', index + 1) ，每次都从已找到的'a'的下一个开始找
* 如果找到了(index != -1)，就把它的索引压入(push)数组indexs
* 令循环条件为(index >= 0)，直到某一次没找到时，index是-1，结束循环

```javascript
var array =  ['a', 'a', 'z', 'a', 'x', 'a'];
function findInedxOfEle(arr) {
	var index = -1;
	var indexs = [];
	do {
	  index = array.indexOf('a', index + 1);	// 每次都从已找到的'a'的下一个开始找
      // 如果找到了，就把它的索引压入数组indexs
	  if (index != -1) {
	  	indexs.push(index);
	  }
	} while (index >= 0);	// 直到某一次没找到时，index是-1，结束循环
  
	return indexs;
}
console.log(findInedxOfEle(array));
```

###### 3) 数组元素去重(统计出现次数) 

* 遍历数组，将数组元素作为一个对象的属性，利用对象的属性存在为真（对其累加），对象的属性不存在为假（将其添加为属性，并初始化为1），保证重复的数组元素只会在对象中出现1次。（统计出现次数完成）
* 把统计完数组元素出现次数得到的的对象的属性取出放入一个新数组（去重完成）

```javascript
var array1 =  ['c', 'a', 'z', 'a', 'x', 'a'];
function clear(array) {
  	var o = {};
  	for (var i = 0; i < array.length; i++) {	//此循环还可用来统计数组中元素出现的次数
    	var item = array[i];
    	if (o[item]) {// 当一个元素第一次出现时,o对象的相应属性为undefined,条件为false,执行o[item]=1;
      		o[item]++;// 当一个元素多次出现时，o对象的相应属性为一个Number，条件为true，执行o[item]++;
    	}else{		  // 这样就保证了数组中重复的元素在o中只会有一个，相应o属性的值是它出现的次数
      		o[item] = 1;
    	}
  	}
  	var tmpArray = [];
  	for(var key in o) {
      	tmpArray.push(key);
  	}
  	return tmpArray;
}
console.log(clear(array1));
```

###### 4) 创建二维数组 

```javascript
// 创建二维数组
// 参数为：行数，列数，初始值
function twoDimensionalArray(rows, cols, value) {
	// 外层数组，二维数组
	var outerArr = [];
	// 为添加每一个行数组
	for (var i = 0; i < rows; i++) {
		// 行数组
		var innerArr = [];
		// 为每一个行添加列元素
		for (var j = 0; j < cols; j++) {
			innerArr[j] = value;
		}
      	// 把每一个行数组作为二维数组的一个元素
		outerArr[i] = innerArr;
	}
	return outerArr;
}
```

#### 11.4 基本包装类型

##### (1) String()

  简单类型字符串调用length时发生了：

1. 隐式地创建一个临时字符串对象；
2. 使用临时对象调用length；
3. 销毁临时对象(设为null，失去引用的对象会被浏览器回收)

```javascript
var str_o = new String('qwer');	// 使用new，是构造函数。字符串对象，包含PrimitiveValue(原始值):"qwer"(原字符串)
var str = String(123);			// 不使用new，类型转换函数
console.log(str_o);	
console.log(typeof str);		// String
str_o = null;	// 销毁对象
```

##### (2) Number()

  Number()数值包装类型不常用。

```javascript
var num_o = new Number('123'); 	// 使用new，是构造函数。数值对象，包含PrimitiveValue(原始值):123
var num = Number('123');		// 不使用new，类型转换函数
console.log(num_o);	
console.log(typeof num);		// Number
```

##### (3) Boolean()

  Boolean()布尔包装类型不常用。容易发生歧义：

* false被包装成对象后，由于这个对象真实存在，在逻辑表达式中它会被隐式转换为true

```javascript
var s1 = new Boolean(false);	// 使用new，是构造函数。s1是一个具体的对象
var s2 = s1 && true;			// s1是一个具体的对象，在隐式类型转换中会转换成true
console.log(s2);	// true
var s3 = Boolean('abc');		// 不使用new，类型转换函数
console.log(s3);	// true
```

#### 11.5 String对象

  字符串方法：把字符串隐式转化成对象，用完再销毁，**一律不会改变原字符串** 。

##### (1) charAt()获取字符

* charAt()作用：获取指定位置的字符，类似于数组

* charAt()参数：索引(类似于数组),如果没有提供索引，charAt() 将使用0

* charAt()返回值：返回一个字符（字符串类型），参数超过length - 1，返回空字符串

* `str.charAt(3)`

  ```javascript
  var str = 'abcdefg';
  console.log(str.charAt(3));	// d
  ```

##### (2) str[ i ]

* 类似数组，作用和charAt()作用一样，更简洁

  ```javascript
  var str = 'abcdefg王';
  console.log(str[7]);	// 29579------'王'的Unicode编码
  ```

  

##### (3) charCodeAt()字符编码

* charCodeAt()作用：获得索引处字符的Unicode编码

* charCodeAt()参数：索引(类似于数组)。如果不是一个数值，则默认为 0

* charCodeAt()返回值：返回值是一表示给定索引处字符的 UTF-16 代码单元值的数字；如果索引超出范围，则返回 NaN

* `str.charCodeAt(7)`

  ```javascript
  var str = 'abcdefg王';
  console.log(str.charCodeAt(7));	// 29579 '王'的Unicode编码,只能匹配 Unicode 代理对的第一个编码单元
  ```

##### (4) concat()拼接字符串

* 两边只要有一个是字符串，那么+就是字符串拼接功能；
* concat()作用：拼接字符串，等效于+，+=, +更常用,返回拼接后的字符串
* concat()参数：一个或多个要拼接的字符串
* concat()返回值：拼接后的字符串
* `str.concat("Kevin", " have a nice day.")`

```javascript
var hello = "Hello, ";
console.log(hello.concat("Kevin", " have a nice day.")); /* Hello, Kevin have a nice day. */
```

##### (5) slice()截取字符串

* slice()作用：截取字符串

* slice()参数：start开始位置；end截取到end-1位置，end取不到

* slice()返回值：返回截取后得到的字符串

* `str.slice(4, 6)`

  ```javascript
  var str = 'The morning is upon us.';
  console.log(str.slice(4, str.indexOf('g') + 1));     // 返回 morning.
  ```

##### (6) substring()截取字符串

- substring()作用：截取字符串

- substring()参数：start开始位置；end截取到end-1位置，end取不到

- substring()返回值：返回截取后得到的字符串

- `str.substring(4, 6)`

  ```javascript
  var str = 'The morning is upon us.';
  console.log(str.substring(4, 11));     // 返回 morning.
  ```

##### (7) substr()截取字符串

* **少用**

- substr()作用：截取字符串

- substr()参数：start开始位置；截取length个字符

- substr()返回值：返回截取后得到的字符串

- `str.substr(4, 7)`

  ```javascript
  var str = 'The morning is upon us.';
  str.substr(4, 7);     // 返回 morning.
  ```

##### (8) indexOf()位置查找

- indexOf()作用：找到然后返回指定字符串(第一次出现位置)的索引(子字符串的首字符索引)，从前往后找，没找到返回-1
- indexOf()参数1：要查找的字符串；被查找的值是空值时，Javascript将直接返回指定的索引值。
- indexOf()参数2：查找的起始位置(可选)，起始位置为空，则默认从0开始。起始位置小于 `0`，等同于为空情况；起始位置大于 `str.length` ，那么结果会直接返回 `-1` 。
- indexOf()返回值：返回指定字符串(第一次出现位置)的索引，没找到返回-1


- `str.indexOf('world', 2)`

  ```javascript
  var str = 'hello world';
  var index = str.indexOf('world', 2);	// 从第一个位置'l'往后找
  console.log(index);						// 返回6
  console.log(str.indexOf('', 2));		// 返回2
  ```

##### (9) lastIndexOf()位置查找

- lastIndexOf()作用：找到然后返回指定字符串(最后一次出现位置)的索引(子字符串的首字符索引)，从后往前找，没找到返回-1
- lastIndexOf()参数1：要查找的字符串；被查找的值是空值时，Javascript将直接返回指定的索引值。
- lastIndexOf()参数2：查找的起始位置(可选)，默认值是 `+Infinity` （默认从最后length-1开始）。起始位置大于 `str.length` ，等同于为空情况；起始位置小于 `0`，那么结果会直接返回 `-1` 。
- lastIndexOf()返回值：返回指定字符串(最后一次出现位置)的索引(该索引仍是以从左至右0开始记数的)，没找到返回-1


- `str.lastIndexOf('world', 2)`

  ```javascript
  var str = 'hello world';
  var index = str.lastIndexOf('world', 7);	// 从第一个位置'l'往后找，index是6
  console.log(index);							// 返回6
  console.log(str.lastIndexOf('', 2));		// 返回2
  ```


##### (10) trim()去除空白

* trim()作用：去除字符串前后的空白，包括所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR等）。

* trim()参数：无

* trim()返回值：去掉前后的空白之后的新字符串

* `str.trim()`

  ```javascript
  var str = '   	\nThe morning is upon us.  ';
  console.log(str);	// 换行后打印The morning is upon us.  
  console.log(str.trim());	// The morning is upon us.
  ```

##### (11) 大小写转换

###### 1) toUpperCase()

* toUpperCase()作用：将调用该方法的字符串转为大写形式并返回（如果调用该方法的值不是字符串类型会被强制转换）。

* toUpperCase()参数：无

* toUpperCase()返回值：一个新的字符串，表示转换为大写的调用字符串。

* `str.toUpperCase()`

  ```javascript
  var str = '5.The morning is upon us.';
  console.log(str.toUpperCase());	// 5.THE MORNING IS UPON US.
  console.log(str.toUpperCase().toLowerCase());// 5.the morning is upon us.
  ```

* **toLocaleUpperCase()** ：根据本地主机语言环境把字符串转换为大写格式，并返回转换后的字符串。

###### 2) toLowerCase()

- toLowerCase()作用：将调用该方法的字符串转为小写形式并返回（如果调用该方法的值不是字符串类型会被强制转换）。

- toLowerCase()参数：无

- toLowerCase()返回值：一个新的字符串，表示转换为小写的调用字符串。

- `str.toLowerCase()`

  ```javascript
  var str = '5.The morning is upon us.';
  console.log(str.toUpperCase());	// 5.THE MORNING IS UPON US.
  console.log(str.toUpperCase().toLowerCase());// 5.the morning is upon us.
  ```

- **toLocaleLowerCase()** ：根据本地主机语言环境把字符串转换为大写格式，并返回转换后的字符串。

##### (12) replace()字符串替换

* replace()作用：根据给定的**字符串/正则表达式**，在原字符串中查找**匹配的子串**并将其替换为**新字符串** 。

* replace()参数1：匹配规则，可以是一个**字符串**或**正则表达式** 。如果是字符串，则仅替换第一个匹配项。

* replace()参数2：新字符串，可以是一个**字符串**或一个**每次匹配都要调用的回调函数** （一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。如果第一个参数是正则表达式，并且其为全局匹配模式，那么这个方法将被多次调用，每次匹配都会被调用。详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) ）。

* replace()返回值：一个部分或全部匹配子串由替代字符串所取代的新的字符串。没找到参数1指定的字符串则返回原字符串

* `str.replace('5', '!')`

  ```javascript
  var str = 'Apples are round, and apples are juicy.';
  console.log(str.replace('5', '!'));	//没找到'5'返回原字符串
  var str1 = str.replace('a', '!');	// 这种情况只替换第一个
  console.log(str1);	// Apples !re round, and apples are juicy.
  ```

1. **全部替换**方法1：正则表达式，/g是全局,/i忽略大小写

   ```javascript
   var str = 'Apples are round, and apples are juicy.';
   str1 = str.replace(/a/g, '!');
   console.log(str1);	// Apples !re round, !nd !pples !re juicy.
   ```

2. **全部替换**方法2：循环

   ```javascript
   var str = 'Apples are round, and apples are juicy.';
   while (str.indexOf('a') !== -1) {
   	str = str.replace('a', '!');
   }
   console.log(str);
   ```

3. **去除字符串中的空格** （或其他内容）

   ```javascript
   var str = '  Apples     are  round  ';
   console.log(str.replace(/ /g, ''));	// Applesareround	一行搞定
   ```

##### (13) split()字符串分割

* split()作用：按照指定的分割符分割字符串

* split()参数1：指定的分隔符(字符串)/正则表达式；

* split()参数2：分割片段数量。限制分割段数为n段，则从n + 1段开始被抛弃。设m为最大可分割数量，n > m，则最终被分割为m段。

* split()返回值：一个由分割后的子字符串作为元素的数组

* **无参数/没找到分割符**，返回一个**只有原字符串一个元素**的数组；

* 分隔符在原字符串中连续出现的话，会被分割成一个一个的空字符串

  ```javascript
  var str = 'AaaaaA';
  console.log(str.split('a'));	// ["A", "", "", "", "A"]
  ```

* 原字符串和分割符都是空字符串，返回空数组；

* `str.split('a', 3)`

  ```javascript
  // 去除字符串中的空格：
  var str = '  Apples     are  round  ';
  var arr = str.split(' ');	// ["", "", "Apples", "", "", "", "", "are", "", "round", "", ""]
  console.log(arr);
  console.log(arr.join(''));	// 数组元素加入空字符串，join()返回一个字符串，这些空字符串自然消失，返回"Applesareround"
  ```

##### (14) 实例

###### 1) 统计字符个数(找到出现频次最高的字符)

* 在for循环中使用`str.charAt(i)`或者`str[i]` 遍历字符串
* 将字符作为一个对象的属性，利用对象的属性存在为真（对其累加），对象的属性不存在为假（将其添加为属性，并初始化为1），保证重复的字符只会在对象中出现1次。（统计字符个数完成）
* 遍历对象属性，找到最大值及其对应的属性（找到出现频次最高的字符）
* 还可以将上文中的对象属性取出放入数组，再使用join()方法即可对字符串进行去重

```javascript
// 找出字符串中出现次数最多的字符
// 1.找到每个字符出现的次数，使用对象
// 2.找到最大值
var str1 = 'abcbaopxayaxyzza';
function findMostTimesCh(str) {
	var chObj = {};
	for (var i = 0; i < str.length; i++) {
		if (chObj[str.charAt(i)]) {
			// 如果属性已经存在，则字符已出现过,次数增加
			chObj[str.charAt(i)]++;
		} else {
			// 如果属性不存在，则字符第一次出现，值设为1
			chObj[str.charAt(i)] = 1;
		}
	}
	// 通过循环查找属性值最大的属性，假设初始最大值是1
	var mostTimes = 1;
	var mostTimesCh;
	for (var key in chObj) {
		if (mostTimes < chObj[key]) {
			// 当前最大次数
			mostTimes = chObj[key];
			// 当前最大次数的字符，即对象的属性
			mostTimesCh = key;
		}
	}
	// for循环结束后即得到最大次数及其字符
	// 返回一个对象
	return {
		mostTimesCh: mostTimesCh,
		mostTimes: mostTimes
	}
}
console.log(findMostTimesCh(str1));
```



###### 2) 获取url中的属性和值

> URL由协议、主机、端口、路径 组成；
>
> 一般格式为：`protocol://hostname[:port]/path/;parameters?query#fragment`
>
> 即：`协议://主机名[:端口号]/路径/;参数?查询#信息片断`
>
> **parameters（参数）** ：可选，这是用于指定特殊参数的可选项。
>
> **query(查询)** ：可选，用于给动态网页（如使用CGI、ISAPI、PHP/JSP/ASP/ASP.NET等技术制作的网页）传递参数，可有多个参数，用“&”符号隔开，每个参数的名和值用“=”符号隔开。
>
> **fragment（信息片断）** ：字符串，用于指定网络资源中的片断。例如一个网页中有多个名词解释，可使用fragment直接定位到某一名词解释。
>
> 例子：`https://developer.mozilla.org/login?name=张三&age=25&sex=男`

1. 先取到'?'后面的内容(字符串)
2. 再用'&'分割字符串
3. 最后用'='分割每一个子字符串，将分割的到的两个元素作为键值对存入一个对象中

```javascript
function getParams(url) {
	// 这里应该检查url：是字符串&&是有效url
	// 1.先取到'?'后面的内容(字符串)
	var paramStr = (url.split('?'))[1];	// name=张三&age=25
 	// 2.再用'&'分割字符串
	var paramArr = paramStr.split('&');	//["name=张三", "age=25"]
 	// 3.最后用'='分割每一个子字符串，将分割的到的两个元素作为键值对存入一个对象中
	var paramObj = {};
	for (var i = 0; i < paramArr.length; i++) {
		var tempArr = paramArr[i].split('=');	// ["name", "张三"](i = 0)......
		paramObj[tempArr[0]] = tempArr[1];
	}
	return paramObj;
}
var myMrl = 'https://developer.mozilla.org/login?name=张三&age=25&sex=男';
console.log(getParams(myMrl));	// {name: "张三", age: "25", sex: "男"}
```

###### 3) 汉字转拼音首字母

* 工具1：汉字Unicode => 首字母对照表

  ```
  // 汉字拼音首字母列表 本列表包含了20902个汉字,用于配合 ToChineseSpell
  // 函数使用,本表收录的字符的Unicode编码范围为19968至40869, XDesigner 整理
  // 说明：下方字符串，第一个字符“Y”对应的是Unicode编码为19968的汉字“一”的首字母，以此类推
  // 只需获取汉字的Unicode编码（十进制即可），减去19968，即得到那个汉字在下方字符串中的索引，就可以拿到他的首字母了
  var strChineseFirstPY = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY";
  ```

* 工具2：多音字Unicode => 多音首字母

  ```
  // 此处收录了375个多音字,数据来自于http://www.51window.net/page/pinyin
  // 说明：第一个"19969":"DZ"是指汉字“丁”，有[ding][zheng]两个读音
  var oMultiDiff = {"19969":"DZ", "19975":"WM", "19988":"QJ", "20048":"YL", "20056":"SC", "20060":"NM", "20094":"QG", "20127":"QJ", "20167":"QC", "20193":"YG", "20250":"KH", "20256":"ZC", "20282":"SC", "20285":"QJG", "20291":"TD", "20314":"YD", "20340":"NE", "20375":"TD", "20389":"YJ", "20391":"CZ", "20415":"PB", "20446":"YS", "20447":"SQ", "20504":"TC", "20608":"KG", "20854":"QJ", "20857":"ZC", "20911":"PF", "20504":"TC", "20608":"KG", "20854":"QJ", "20857":"ZC", "20911":"PF", "20985":"AW", "21032":"PB", "21048":"XQ", "21049":"SC", "21089":"YS", "21119":"JC", "21242":"SB", "21273":"SC", "21305":"YP", "21306":"QO", "21330":"ZC", "21333":"SDC", "21345":"QK", "21378":"CA", "21397":"SC", "21414":"XS", "21442":"SC", "21477":"JG", "21480":"TD", "21484":"ZS", "21494":"YX", "21505":"YX", "21512":"HG", "21523":"XH", "21537":"PB", "21542":"PF", "21549":"KH", "21571":"E", "21574":"DA", "21588":"TD", "21589":"O", "21618":"ZC", "21621":"KHA", "21632":"ZJ", "21654":"KG", "21679":"LKG", "21683":"KH", "21710":"A", "21719":"YH", "21734":"WOE", "21769":"A", "21780":"WN", "21804":"XH", "21834":"A", "21899":"ZD", "21903":"RN", "21908":"WO", "21939":"ZC", "21956":"SA", "21964":"YA", "21970":"TD", "22003":"A", "22031":"JG", "22040":"XS", "22060":"ZC", "22066":"ZC", "22079":"MH", "22129":"XJ", "22179":"XA", "22237":"NJ", "22244":"TD", "22280":"JQ", "22300":"YH", "22313":"XW", "22331":"YQ", "22343":"YJ", "22351":"PH", "22395":"DC", "22412":"TD", "22484":"PB", "22500":"PB", "22534":"ZD", "22549":"DH", "22561":"PB", "22612":"TD", "22771":"KQ", "22831":"HB", "22841":"JG", "22855":"QJ", "22865":"XQ", "23013":"ML", "23081":"WM", "23487":"SX", "23558":"QJ", "23561":"YW", "23586":"YW", "23614":"YW", "23615":"SN", "23631":"PB", "23646":"ZS", "23663":"ZT", "23673":"YG", "23762":"TD", "23769":"ZS", "23780":"QJ", "23884":"QK", "24055":"XH", "24113":"DC", "24162":"ZC", "24191":"GA", "24273":"QJ", "24324":"NL", "24377":"TD", "24378":"QJ", "24439":"PF", "24554":"ZS", "24683":"TD", "24694":"WE", "24733":"LK", "24925":"TN", "25094":"ZG", "25100":"XQ", "25103":"XH", "25153":"PB", "25170":"PB", "25179":"KG", "25203":"PB", "25240":"ZS", "25282":"FB", "25303":"NA", "25324":"KG", "25341":"ZY", "25373":"WZ", "25375":"XJ", "25384":"A", "25457":"A", "25528":"SD", "25530":"SC", "25552":"TD", "25774":"ZC", "25874":"ZC", "26044":"YW", "26080":"WM", "26292":"PB", "26333":"PB", "26355":"ZY", "26366":"CZ", "26397":"ZC", "26399":"QJ", "26415":"ZS", "26451":"SB", "26526":"ZC", "26552":"JG", "26561":"TD", "26588":"JG", "26597":"CZ", "26629":"ZS", "26638":"YL", "26646":"XQ", "26653":"KG", "26657":"XJ", "26727":"HG", "26894":"ZC", "26937":"ZS", "26946":"ZC", "26999":"KJ", "27099":"KJ", "27449":"YQ", "27481":"XS", "27542":"ZS", "27663":"ZS", "27748":"TS", "27784":"SC", "27788":"ZD", "27795":"TD", "27812":"O", "27850":"PB", "27852":"MB", "27895":"SL", "27898":"PL", "27973":"QJ", "27981":"KH", "27986":"HX", "27994":"XJ", "28044":"YC", "28065":"WG", "28177":"SM", "28267":"QJ", "28291":"KH", "28337":"ZQ", "28463":"TL", "28548":"DC", "28601":"TD", "28689":"PB", "28805":"JG", "28820":"QG", "28846":"PB", "28952":"TD", "28975":"ZC", "29100":"A", "29325":"QJ", "29575":"SL", "29602":"FB", "30010":"TD", "30044":"CX", "30058":"PF", "30091":"YSP", "30111":"YN", "30229":"XJ", "30427":"SC", "30465":"SX", "30631":"YQ", "30655":"QJ", "30684":"QJG", "30707":"SD", "30729":"XH", "30796":"LG", "30917":"PB", "31074":"NM", "31085":"JZ", "31109":"SC", "31181":"ZC", "31192":"MLB", "31293":"JQ", "31400":"YX", "31584":"YJ", "31896":"ZN", "31909":"ZY", "31995":"XJ", "32321":"PF", "32327":"ZY", "32418":"HG", "32420":"XQ", "32421":"HG", "32438":"LG", "32473":"GJ", "32488":"TD", "32521":"QJ", "32527":"PB", "32562":"ZSQ", "32564":"JZ", "32735":"ZD", "32793":"PB", "33071":"PF", "33098":"XL", "33100":"YA", "33152":"PB", "33261":"CX", "33324":"BP", "33333":"TD", "33406":"YA", "33426":"WM", "33432":"PB", "33445":"JG", "33486":"ZN", "33493":"TS", "33507":"QJ", "33540":"QJ", "33544":"ZC", "33564":"XQ", "33617":"YT", "33632":"QJ", "33636":"XH", "33637":"YX", "33694":"WG", "33705":"PF", "33728":"YW", "33882":"SR", "34067":"WM", "34074":"YW", "34121":"QJ", "34255":"ZC", "34259":"XL", "34425":"JH", "34430":"XH", "34485":"KH", "34503":"YS", "34532":"HG", "34552":"XS", "34558":"YE", "34593":"ZL", "34660":"YQ", "34892":"XH", "34928":"SC", "34999":"QJ", "35048":"PB", "35059":"SC", "35098":"ZC", "35203":"TQ", "35265":"JX", "35299":"JX", "35782":"SZ", "35828":"YS", "35830":"E", "35843":"TD", "35895":"YG", "35977":"MH", "36158":"JG", "36228":"QJ", "36426":"XQ", "36466":"DC", "36710":"JC", "36711":"ZYG", "36767":"PB", "36866":"SK", "36951":"YW", "37034":"YX", "37063":"XH", "37218":"ZC", "37325":"ZC", "38063":"PB", "38079":"TD", "38085":"QY", "38107":"DC", "38116":"TD", "38123":"YD", "38224":"HG", "38241":"XTC", "38271":"ZC", "38415":"YE", "38426":"KH", "38461":"YD", "38463":"AE", "38466":"PB", "38477":"XJ", "38518":"YT", "38551":"WK", "38585":"ZC", "38704":"XS", "38739":"LJ", "38761":"GJ", "38808":"SQ", "39048":"JG", "39049":"XJ", "39052":"HG", "39076":"CZ", "39271":"XT", "39534":"TD", "39552":"TD", "39584":"PB", "39647":"SB", "39730":"LG", "39748":"TPB", "40109":"ZQ", "40479":"ND", "40516":"HG", "40536":"HG", "40583":"QJ", "40765":"YQ", "40784":"QJ", "40840":"YK", "40863":"QJG"};
  ```

#### 11.5 Object常用方法

##### (1) Object.keys()

* Object.keys(对象实例)：用于获取对象的属性名称，把这些名称放在一个数组中，返回
  * 参数：对象
  * 返回值：数组，包含参数对象中的所有 属性名







