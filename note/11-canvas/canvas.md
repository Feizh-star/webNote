### 1. API

#### 1.1 canvas元素的API

1.属性

* width：canvas元素绘图表面的宽度
* height：canvas元素绘图表面的高度
  * 默认情况下，浏览器会将canvas元素的尺寸设置为与width、height一致，但如果css中指定了宽高，绘图表面会被缩放。

2.方法

* getContext(type: string)：获取绘图环境
  * type：获取绘图环境的类型
    * ‘2d’：2d绘图环境
    * ‘webgl’：3d绘图环境
* toDataUrl(type: string, quality: number)：获取canvas图像的数据地址，base64图像
  * type: 类型，例如：‘image/jpeg’，‘image/png’，默认格式（未指定或不支持）为 `image/png`。
  * quality：数字，0 ~ 1.0，图像的质量
* toBlob(callback, type, quality)
  * callback：回调函数，可获得一个单独的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象参数。如果图像未被成功创建，可能会获得 `null` 值。
  * type: 类型，例如：‘image/jpeg’，‘image/png’，默认格式（未指定或不支持）为 `image/png`。
  * quality：数字，0 ~ 1.0，图像的质量

### 1.2 绘图环境的属性

绘图环境，可以通过`ctx.save()`和`ctx.restore()`保存和恢复，其实就是保存和恢复以下属性

