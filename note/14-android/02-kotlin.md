#### 99. 临时记录

##### 1. class构造函数

关于构造函数：

* 主要构造函数：紧跟在类声明后面的，只有形参列表，没有函数体。
  * 自动赋值：如果形参有`val`关键字，表名这里声明的是实例属性，形参会被自动初始化为实例属性
  * 普通形参：没有`val`关键字，不是实例属性，可以作为变量传给父类
* 辅助构造函数：在类主体中可以声明多个（其实就是重载）
  * 参数兼容：多个辅助构造函数形参类型必须与主要构造函数兼容，即前几个形参必须跟主要构造函数一样
  * 手动赋值：比主要构造函数多出来的形参不会被初始化为实例属性，需要手动处理
  * 初始化主：必须初始化主要构造函数（形式类似于返回值声明）：相当于在辅助构造函数运行之后调用主要构造函数，`this`就是主要构造函数的别名，实参可以使用辅助构造函数作用域的任意符合要求的变量

```kotlin
// class SmartDevice constructor(val name: String, val category: String) {
class SmartDevice(val name: String, val category: String) {
    var deviceStatus = "online"
    var brandName = "unknown"

    constructor(name: String, category: String, statusCode: Int) : this(name, category) {
        deviceStatus = when (statusCode) {
            0 -> "offline"
            1 -> "online"
            else -> "unknown"
        }
    }
    constructor(name: String, category: String, brand: String) : this(name, category) {
        brandName = brand
    }
    
    fun printCate() {
        println(category)
    }
}

fun main() {
    val test = SmartDevice("Android TV", "television", "xiaomi")
    println(test.deviceStatus) // online
    println(test.name) // Android TV
    println(test.brandName) // xiaomi
    test.printCate() // television
    
    val test1 = SmartDevice("Apple TV", "game tv", 0)
    println(test1.deviceStatus) // offline
    println(test1.name) // Apple TV
    println(test1.brandName) // unknown
    test1.printCate() // game tv
}
```

##### 2. 继承的语法

`SmartTvDevice`继承`SmartDevice`，其形参无法在类中使用，只能将其传递给父类构造函数（然后当然可以使用父类中的属性名来使用）。

```kotlin
class SmartTvDevice(deviceName: String, deviceCategory: String) :
    SmartDevice(name = deviceName, category = deviceCategory) {
	// speakerVolume是子类SmartTvDevice的可变属性
    var speakerVolume = 2
        set(value) {
            if (value in 0..100) {
                field = value
            }
        }
}
```

##### 3. 属性委托

用于约束某个类的对象的属性行为，类似于`js`中的属性描述符

* `ReadWriteProperty<Any?, Int>`用于定义属性委托类的接口，`RangeRegulator`实现了它
  * `Any?`表示属性所属对象本身的类型可以是任意，也可以是`null`
  * `Int`表示属性值是`Int`类型
* `thisRef`：当然就是指向属性所属对象
* `property: KProperty<*>`：`property`就是属性元信息对象，包含属性名、是否 `lateinit`、是否 `var / val`、注解、`visibility`、`getter / setter`是否存在 等等
  * `KProperty<*>`就是`property`就是属性元信息对象的类型接口，\*代表我不知道，也不关心这个属性的返回类型
* `getter / setter `则不在元信息对象中定义，而是覆写`getValue`、`setValue`来定义

```kotlin
class RangeRegulator(
    initialValue: Int,
    private val minValue: Int,
    private val maxValue: Int
) : ReadWriteProperty<Any?, Int> {

    var fieldData = initialValue

    override fun getValue(thisRef: Any?, property: KProperty<*>): Int {
        return fieldData
    }

    override fun setValue(thisRef: Any?, property: KProperty<*>, value: Int) {
        if (value in minValue..maxValue) {
            fieldData = value
        }
    }
}
```

