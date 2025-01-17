### 一、基本概念

#### 1. 概念

##### 1.1 缓冲区目标类型

1. gl.ARRAY_BUFFER

   * 作用：主要用于管理顶点缓冲区数据，如顶点坐标、法线、颜色、纹理坐标等。

2. gl.ELEMENT_ARRAY_BUFFER

   * 作用：主要用于存储顶点索引缓冲区数据。

   * 索引：是以`gl.vertexAttribPointer`规定的偏移量开始，跳过间隔字节，以选择单元为数据单位的索引，而不是数组索引，例如下例，顶点位置索引是从第`0字节`开始，每隔`5个数字*4字节=20字节`取`2个数字`为一个顶点坐标；颜色索引是从第`2个数字*4字节=8字节`开始，每隔`5个数字*4字节=20字节`取`3个数字`为一个顶点颜色；

     ```js
     const data=new Float32Array([
         -0.5,0.5,
         0,0,1,
         0.5,0.5,
         1,0,0,
         0.5,-0.5,
         0,1,0
     ]);
     // 绘制两个线段组成折线段，-0.5,0.5 到 0.5,0.5；0.5,0.5 到 0.5,-0.5，颜色 蓝渐变到红；红渐变到绿
     const indices = new Uint8Array([
       0, 1, 1, 2
     ]);
     var buffer=gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
     gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
     //顶点位置索引是从第`0字节`开始，每隔`5个数字*4字节=20字节`取`2个数字`为一个顶点坐标
     gl.vertexAttribPointer(aposLocation,2,gl.FLOAT,false,4*5,0);
     //颜色索引是从第`2个数字*4字节=8字节`开始，每隔`5个数字*4字节=20字节`取`3个数字`为一个顶点颜色；
     gl.vertexAttribPointer(colorLocation,3,gl.FLOAT,false,4*5,4*2);
     gl.enableVertexAttribArray(aposLocation);
     gl.enableVertexAttribArray(colorLocation);
     
     const indexBuffer = gl.createBuffer();
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
     
     gl.clearColor(0, 0, 0, 1);
     gl.clear(gl.COLOR_BUFFER_BIT);
     // 绘制indices指定的4个点，两两成线段
     gl.drawElements(gl.LINES, 4, gl.UNSIGNED_BYTE, 0);
     ```

   * 注意：根据索引绘制时（调用gl.drawElements），一般不需要对索引缓冲区进行配置，也不需要在着色器中接收索引数据，只需将索引数据传到索引缓冲区。webgl会根据索引去各个顶点缓冲区中找到对应的点绘制图形（一组索引是对多个顶点缓冲区的）

------

#### 2. 着色器变量

1. 属性（Attributes）和缓冲

   缓冲是发送到GPU的一些二进制数据序列，通常情况下缓冲数据包括位置，法向量，纹理坐标，顶点颜色值等。 可以存储任何数据。

   属性用来指明怎么从缓冲中获取所需数据并将它提供给**顶点着色器**。 例如你可能在缓冲中用三个32位的浮点型数据存储一个位置值。 对于一个确切的属性你需要告诉它从哪个缓冲中获取数据，获取什么类型的数据（三个32位的浮点数据）， 起始偏移值是多少，到下一个位置的字节数是多少。

   缓冲不是随意读取的。事实上顶点着色器运行的次数是一个指定的确切数字， 每一次运行属性会从指定的缓冲中按照指定规则依次获取下一个值。

2. 全局变量（Uniforms）

   全局变量在着色程序运行前赋值，在运行过程中全局有效。

3. 可变量（Varyings）

   可变量是一种顶点着色器给片段着色器传值的方式，依照渲染的图元是点， 线还是三角形，顶点着色器中设置的可变量会在片段着色器运行中获取不同的插值。

   * Varyings变量并不是在顶点着色器中赋值后，原封不动传递给片段着色器了，而是在光栅化阶段，GPU 会根据顶点属性对这些数据进行插值。
   * 例如，当一个三角形的三个顶点通过Varyings变量设置了三个不同的颜色值，光栅化时，GPU会对这三个顶点的Varyings颜色变量，进行插值，把插值的结果一一传递给相应的片段着色器中的同名Varyings变量，最终将形成渐变色效果

4. 纹理（Textures）

   纹理是一个数据序列，可以在着色程序运行中随意读取其中的数据。 大多数情况存放的是图像数据，但是纹理仅仅是数据序列， 你也可以随意存放除了颜色数据以外的其它数据。

------

#### 3. 各个概念存储位置

**（1）`gl.ARRAY_BUFFER`**

- 本质：`gl.ARRAY_BUFFER` 是一个绑定点（binding point）。
- 位置：这是 WebGL 的状态机中的概念，存储在主存（CPU 内存）中。
- 作用：它是一个抽象标识，代表当前操作的缓冲区。当一个缓冲区被绑定到 `gl.ARRAY_BUFFER` 后，所有针对顶点数据的操作（如 `gl.bufferData`）都会应用到这个缓冲区。

**（2）缓冲区**

- 本质：缓冲区是显存中的一块内存，用来存储顶点数据、索引数据或其他相关数据。
- 位置：缓冲区数据最终存储在显存 (GPU 内存) 中。
- 作用：
  - 缓冲区通过 `gl.bufferData` 从主存中上传数据到显存。
  - 一旦数据上传到显存，CPU 不再直接访问它，而是由 GPU 使用。

**（3）属性（如 `a_position`）**

- 本质：属性是顶点着色器中的变量，定义了如何从缓冲区读取数据。
- 位置：
  - 属性变量本身存在于 GPU 中（着色器程序的一部分）。
  - 属性与缓冲区的关联（通过 `gl.vertexAttribPointer`）是存储在 WebGL 的状态机中。
- 作用：GPU 在运行着色器时，根据属性的配置，从显存中的缓冲区读取数据并传递到着色器。

##### 3.1 数据的流转过程

以下是数据如何从主存转移到显存，并供 GPU 使用的流程：

1. **主存中创建数据**

   - 在 JavaScript 中定义顶点数据、颜色数据等，存储在 CPU 的内存中。

     ```
     const positions = [0.0, 0.5, -0.5, -0.5, 0.5, -0.5];
     const positionData = new Float32Array(positions); // 主存中
     ```

2. **生成缓冲区对象**

   - 调用 

     ```
     gl.createBuffer()
     ```

      创建缓冲区对象，缓冲区对象在 GPU 中分配显存。

     ```
     const positionBuffer = gl.createBuffer(); // 显存中的缓冲区对象
     ```

3. **绑定缓冲区到绑定点**

   - 调用，将缓冲区与绑定点关联。

     ```
     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
     ```

     此时，WebGL 的状态机记录了当前绑定点（`gl.ARRAY_BUFFER`）指向 `positionBuffer`。

4. **数据上传到显存**

   - 调用

     ```
     gl.bufferData(gl.ARRAY_BUFFER, positionData, gl.STATIC_DRAW)
     ```

     WebGL 将 `positionData` 从主存传输到绑定的缓冲区（`positionBuffer`）所在的显存区域。

5. **配置属性**

   - 调用 `gl.vertexAttribPointer` 配置属性（如 `a_position`的索引），将显存中的缓冲区数据与顶点着色器的属性关联。

6. **GPU 读取显存数据**

   - 当调用 `gl.drawArrays` 或类似绘制命令时，GPU 会根据属性配置，从显存中的缓冲区读取数据，传递到顶点着色器中。

##### 3.2 存储位置一览表

| **概念**                        | **存储位置**        | **说明**                                               |
| ------------------------------- | ------------------- | ------------------------------------------------------ |
| **`gl.ARRAY_BUFFER`**           | 主存 (CPU 内存)     | WebGL 状态机的绑定点，用于管理缓冲区的绑定关系。       |
| **缓冲区对象**                  | 显存 (GPU 内存)     | 存储顶点数据、颜色数据等，供 GPU 使用。                |
| **顶点数据**                    | 主存 → 显存         | 初始存储在主存中，通过 `gl.bufferData` 上传到显存。    |
| **顶点属性（如 `a_position`）** | 显存 + WebGL 状态机 | 属性在显存中定义，通过状态机关联到显存中的缓冲区数据。 |
| **着色器程序**                  | 显存                | 顶点着色器和片元着色器都在显存中运行，由 GPU 执行。    |

##### 3.3 总结

- **WebGL 是基于显存的 API**，大多数缓冲区数据和着色器程序都存储在显存中，由 GPU 使用。
- 主存与显存的协作：
  - JavaScript 中的数据存在于主存，需要通过 API 上传到显存。
- 绑定点与属性关联：
  - 绑定点（如 `gl.ARRAY_BUFFER`）管理缓冲区，属性通过绑定点配置，从而关联到显存中的缓冲区数据。

#### 4. 渲染管线

<img src=".\images\渲染管线.png" style="zoom:80%;" />

##### 4.1 着色器

###### 4.1.1 顶点着色器

顶点着色器的作用是计算顶点的位置。根据计算出的一系列顶点位置，WebGL可以对点， 线和三角形在内的一些图元进行光栅化处理。

1.运行阶段

* 顶点着色器是渲染流水线的第一个可编程阶段，主要用于处理每个顶点的数据。

2.主要任务

* 接收顶点属性（如位置、颜色、法线等），通常由缓冲区提供。

* 对顶点进行变换（如模型变换、视图变换、投影变换）。

* 计算并输出顶点在裁剪空间的坐标。

* 传递与顶点相关的插值数据给片段着色器（如颜色、纹理坐标）。

3.运行次数

* **每个顶点运行一次**： 每个顶点都会调用一次顶点着色器，因此顶点着色器的运行次数等于绘制中提交的顶点数。

###### 4.1.2 片段着色器

当对上述图元进行光栅化处理时需要使用片段着色器方法。 片段着色器的作用是计算出当前绘制图元中每个像素的颜色值。

1.运行阶段

* 片段着色器在顶点着色器之后运行，用于计算屏幕上的像素颜色，是渲染流水线中光栅化后的阶段。

2.主要任务

* 接收由顶点着色器输出并经过光栅化阶段插值的数据（如颜色、纹理坐标等）。

* 使用插值后的数据计算片段（像素）的最终颜色。

* 可以进行纹理采样、光照计算或其他复杂的颜色计算。

* 输出片段颜色供帧缓冲使用。

3.运行次数

* **每个片段运行一次**： 片段着色器的运行次数等于光栅化生成的片段数（像素数）。
  - 片段数由屏幕分辨率和几何体的覆盖范围决定。
  - 边缘抗锯齿、多重采样等设置可能增加片段数。

###### 4.1.3 两种着色器的通信

* 插值机制： 顶点着色器通过 `varying`（或 WebGL2 的 `out`）变量将数据传递给片段着色器。
  - 在光栅化阶段，GPU 会根据顶点属性对这些数据进行插值。
  - 例如，顶点颜色和纹理坐标通常会在片段之间进行线性插值。

- 数据传递过程：
  1. 顶点着色器输出每个顶点的 `varying` 数据。
  2. 光栅化阶段根据顶点数据计算片段的位置，并对 `varying` 数据进行插值。
  3. 片段着色器接收插值后的数据作为输入。

##### 4.2 深度测试

深度测试，可以把z轴理解为深度，即相对于人眼的远近，深度测试关闭时，webgl绘制的图形遵循后来居上原则，即后渲染的图形会覆盖之前的图形，这在绘制立方体时就会出现本该被遮住的背面把该显示的正面覆盖的情况（假如背面的顶点的渲染次序靠后）。

在渲染管线中，深度测试是可以开启或关闭的，默认关闭。

在绘制之前调用`gl.enable(gl.DEPTH_TEST)`打开深度测试，GPU就会根据坐标的深度（前后）关系，将背面的片元隐藏。

------

#### 5. 坐标系

webgl的坐标系是右手系：右手大拇指指向z轴方向,其余四指由x轴握向y轴方向,如果成功,那么判定为*右手系*

1. 相对坐标：无论canvas尺寸是多少，webgl的坐标系范围都是`[-1, 1]`，对于x轴而言，画布左右边缘对应-1和1；对于y轴而言，画布下上边缘对应-1和1；z轴朝向人眼，范围也是`[-1, 1]`。画布的中心就是`[0, 0, 0]`

#### 6. 坐标变换

##### 6.1 平移

1. 利用js计算：直接对顶点坐标进行加减

   * 代码：

     ```js
     var data=new Float32Array([
       -0.4, 0.0, 1.0,//三角形顶点1坐标
       -0.4, 1.0, 0.0,//三角形顶点2坐标
       0.6, 0.0, 0.0//三角形顶点3坐标
     ]);
     for(var i = 0; i<9; i += 3) {
       data[i] += -0.4;
     }
     ```

2. 利用平移矩阵

   * 原理：利用4×4的平移矩阵，左乘顶点的齐次坐标，得到的列向量就是平移后的结果。多次平移可以多个平移矩阵相乘后再左乘顶点坐标
     $$
     \left[\begin{matrix} 1 & 0 & 0 & T_x \\ 0 & 1 & 0 & T_y \\ 0 & 0 & 1 & T_z \\ 0 & 0 & 0 & 1\end{matrix}\right]\left[\begin{matrix}x \\ y \\ z \\ 1\end{matrix}\right]=\left[\begin{matrix}x+T_x \\ y+T_y \\ z+T_z \\ 1\end{matrix}\right]
     $$

   * 代码：

     ```glsl
     //attribute声明vec4类型变量apos
     attribute vec4 apos;
     void main() {
       //创建平移矩阵(沿x轴平移-0.4)
       //1   0   0  -0.4
       //0   1   0    0
       //0   0   1    0
       //0   0   0    1
       mat4 m4 = mat4(1,0,0,0,  0,1,0,0,  0,0,1,0,  -0.4,0,0,1);
       //平移矩阵m4左乘顶点坐标(vec4类型数据可以理解为线性代数中的nx1矩阵，即列向量)
       // 逐顶点进行矩阵变换
       gl_Position = m4*apos;
     }
     ```

##### 6.2 旋转

计算旋转时，是针对3个坐标轴分别旋转，且旋转的顺序不同，结果也不同，多次旋转可以多个旋转矩阵相乘后再左乘顶点坐标。假设绕各个轴旋转角度都是α，三个轴的旋转矩阵分别是：

1. 绕z轴旋转：
   $$
   \left[\begin{matrix} cosα & -sinα & 0 & 0 \\ sinα & cosα & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1\end{matrix}\right]\left[\begin{matrix}x \\ y \\ z \\ 1\end{matrix}\right]=\left[\begin{matrix}xcosα-ysinα \\ xsinα+ycosα \\ z \\ 1\end{matrix}\right]
   $$
   
2. 绕x轴旋转：
   $$
   \left[\begin{matrix} 1 & 0 & 0 & 0 \\ 0 & cosα & -sinα & 0 \\ 0 & sinα & cosα & 0 \\ 0 & 0 & 0 & 1\end{matrix}\right]\left[\begin{matrix}x \\ y \\ z \\ 1\end{matrix}\right]=\left[\begin{matrix}x \\ ycosα-zsinα \\ ysinα+zcosα \\ 1\end{matrix}\right]
   $$
   
3. 绕y轴旋转：
   $$
   \left[\begin{matrix} cosα & 0 & sinα & 0 \\ 0 & 1 & 0 & 0 \\ -sinα & 0 & cosα & 0 \\ 0 & 0 & 0 & 1\end{matrix}\right]\left[\begin{matrix}x \\ y \\ z \\ 1\end{matrix}\right]=\left[\begin{matrix}xcosα+zsinα \\ y \\ -xsinα+zcosα \\ 1\end{matrix}\right]
   $$

记忆：4阶方阵，主对角线不是三角就是1，绕哪个轴转哪个轴在主对角线上就是1，另外俩轴主对角线都是cos，sin左下正右上负，绕y轴时反一下（左下负右上正），剩余位置都是0

### 二、基本渲染过程（代码）

#### 1. 准备画布

使用webgl渲染画面需要一个canvas，在一切开始之前，需要设置一些基本设定：

* 获取*webgl上下文*
* *设置canvas渲染区域的宽高*
* *设置最终绘制的画布尺寸，将据此把裁剪空间的空间坐标换算成像素坐标*
* *清空画布*

```ts
const gl = canvas?.getContext('webgl')
if (!gl) {
  return
}
// 设置canvas渲染区域的宽高
setCanvasToDisplaySize(canvas)

// 设置最终绘制的画布尺寸，将据此把裁剪空间的空间坐标换算成像素坐标
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

// 清空画布
gl.clearColor(0, 0, 0, 0)
gl.clear(gl.COLOR_BUFFER_BIT)
```

#### 2. 加载着色器

着色器代码是字符串，可以放在特定的script标签中，可以直接使用模板字符串，也可以在独立的文件中写好导入（需vite等工程化环境），以下是两段简单的着色器代码

* 顶点着色器：`rectangle.vert`

```glsl
attribute vec2 a_position; // 属性 接收从缓冲中传递过来的顶点数据
attribute vec4 a_color; // 属性 接收从缓冲中传递过来的颜色数据
varying vec4 v_color; // 每一次运行顶点着色器，都会将这个值传递给片元着色器
uniform vec2 u_resolution; // 全局变量 用于存储画布的宽高，计算坐标变换

void main() {
  v_color = a_color; // 后续光栅化时，将利用顶点颜色进行插值计算，得到片元颜色，传递给片元着色器
  vec2 zeroToOne = a_position / u_resolution; // 将顶点坐标转换到 0.0 -> 1.0 的范围内

  vec2 zeroToTwo = zeroToOne * 2.0; // 将顶点坐标转换到 0.0 -> 2.0 的范围内

  vec2 clipSpace = zeroToTwo - 1.0; // 将顶点坐标转换到 -1.0 -> +1.0 的范围内

  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1); // 将y轴翻转，得到最终的裁剪空间坐标
}
```

* 片段着色器：`rectangle.frag`

```glsl
precision mediump float; // 将浮点数的默认精度设置为中等精度
varying vec4 v_color; // 用于接收从顶点着色器传递过来的颜色值（光栅化插值后的）

void main() {
  gl_FragColor = v_color; // 将片段颜色传递给管线的下一阶段
}
```

* 加载着色器

```ts
/**
 * 编译着色器
 * @param {WebGLRenderingContext} gl webgl上下文
 * @param {string} shaderSource 着色器代码
 * @param {number} shaderType 着色器类型
 * @return {WebGLShader} 编译完成的着色器
 */
function loadShader(
  gl: WebGLRenderingContext,
  shaderSource: string,
  shaderType:
    | WebGLRenderingContextBase['VERTEX_SHADER']
    | WebGLRenderingContextBase['FRAGMENT_SHADER']
) {
  // 创建着色器对象
  const shader = gl.createShader(shaderType)
  if (!shader) {
    throw new Error(`Error createShader shader ${shaderType}`)
  }

  // 加载着色器代码
  gl.shaderSource(shader, shaderSource)

  // 编译着色器
  gl.compileShader(shader)

  // 错误处理
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!compiled) {
    // 获取错误
    const lastError = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(
      `Error compiling shader ${shader}: ${lastError}\n${shaderSource
        .split('\n')
        .map((l, i) => `${i + 1}: ${l}`)
        .join('\n')}`
    )
  }

  return shader
}
```

* **使用加载器创建着色器**

```ts
import vertexShaderSource from './shader/rectangle.vert?raw' // 顶点着色器代码
import fragmentShaderSource from './shader/rectangle.frag?raw' // 片元着色器代码

// 其他代码...

// 创建顶点着色器
const vertexShader = loadShader(gl, vertexShaderSource, gl.VERTEX_SHADER)
// 创建片元着色器
const fragmentShader = loadShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER)
```

#### 3. 创建着色程序

* 着色程序创建器

```ts
/**
 * 创建一个着色程序，附加着色器，绑定属性位置，链接程序到webgl上下文
 * @param {WebGLRenderingContext} gl webgl上下文
 * @param {WebGLShader[]} shaders 着色器数组
 * @param {string[]} [opt_attribs] 一个可选的字符串数组，包含顶点属性的名称，用于绑定顶点属性位置。
 * @param {number[]} [opt_locations] 一个可选的数字数组，与 opt_attribs 对应，用于指定顶点属性的位置。
 */
function createProgram(
  gl: WebGLRenderingContext,
  shaders: WebGLShader[],
  opt_attribs?: string[],
  opt_locations?: number[]
) {
  // 创建一个着色程序
  const program = gl.createProgram()
  if (!program) {
    throw new Error(`Error createShader program`)
  }
  // 附加着色器
  shaders.forEach(function (shader) {
    gl.attachShader(program, shader)
  })
  if (opt_attribs) {
    opt_attribs.forEach(function (attrib, ndx) {
      gl.bindAttribLocation(program, opt_locations ? opt_locations[ndx] : ndx, attrib)
    })
  }
  // 链接程序到webgl上下文
  gl.linkProgram(program)

  // 检查链接是否成功
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!linked) {
    // something went wrong with the link
    const lastError = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error(`Error in program linking: ${lastError}`)
  }
  return program
}
```

* **创建并使用着色程序**

```ts
// 创建着色程序
const program = createProgram(gl, [vertexShader, fragmentShader])
// 使用程序
gl.useProgram(program)
```

#### 4. 传递全局变量（可选）

全局变量（Uniforms）可在**创建着色程序后**的任意环节传递，并且是可选的。

```ts
// 找到全局变量u_resolution的位置，用于将分辨率传递给顶点着色器，进行坐标转换
const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
// 设置分辨率
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
```

#### 5. 传递缓冲区数据

传递缓冲区数据一般需要：

* 创建一个缓冲区（在显存中）
* 将缓冲区绑定到绑定点（在内存中），绑定点同时描述了对应缓冲区的*数据的用途*
* 通过绑定点传递数据到缓冲区
* 设置顶点着色器运行时，属性如何从缓冲区接收数据
  * `gl.vertexAttribPointer`用于配置属性，它会使用**属性的索引**，将**属性**与**当前绑定点ARRAY_BUFFER绑定的缓冲区**关联起来
  * 最后一个参数表示偏移量

```ts
// 生成50个矩形的顶点数据
const points: number[] = new Array(50).fill(0).map(() => setRectangle(gl.canvas.width, gl.canvas.height)).flat()
// 创建一个缓冲区，用于存放三个2d裁剪空间点（一个三角形），positionBuffer只是一个引用，实际的缓冲区在GPU中
const positionBuffer = gl.createBuffer()
// 将缓冲区绑定到ARRAY_BUFFER，表示这个缓冲区是用来存放顶点数据的。向GPU传递数据时，就是通过这个绑定点，明确数据的用途，并将数据传递到ARRAY_BUFFER绑定的缓冲区中
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
// 将50个矩形的数据 2个数 * 6个点 * 50 上传到缓冲区中，gl.STATIC_DRAW表示这些数据不会经常改变（一次修改多次使用）
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW)
// 找到顶点着色器中的a_position属性的索引
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
// 启用属性（a_position）
gl.enableVertexAttribArray(positionAttributeLocation)
const size = 2 // 每次迭代运行提取两个单位数据
const type = gl.FLOAT // 数据类型是32位浮点型
const normalize = false // 不要归一化数据
const stride = 0 // 跨步，每次迭代移动stride * sizeof(type)以获得下一个位置
// gl.vertexAttribPointer会把第一个参数的索引对应的属性关联到当前绑定点gl.ARRAY_BUFFER对应的缓冲区，即positionBuffer，并配置如何从positionBuffer中获取数据
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, 0)

// 创建一个颜色数组，包含50个矩形的颜色数据，随机渐变色
const getRandomColor = () => [Math.random(), Math.random(), Math.random(), 1]
const colors: number[] = new Array(50).fill(0).map(() => [getRandomColor(), ...new Array(4).fill(getRandomColor()), getRandomColor()]).flat(2)
// 创建一个缓冲区，用于存放颜色数据
const colorBuffer = gl.createBuffer()
// 将缓冲区绑定到ARRAY_BUFFER，表示这个缓冲区是用来存放颜色数据的
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
// 将颜色数据上传到缓冲区中
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)
// 找到顶点着色器中的a_color属性的索引
const colorAttributeLocation = gl.getAttribLocation(program, 'a_color')
// 启用属性（a_color）
gl.enableVertexAttribArray(colorAttributeLocation)
const colorSize = 4 // 每次迭代运行提取四个单位数据
const colorType = gl.FLOAT // 数据类型是32位浮点型
const colorNormalizeColor = false // 不要归一化数据
const colorStride = 0 // 跨步，每次迭代移动colorStride * sizeof(type)以获得下一个位置
// gl.vertexAttribPointer会把第一个参数的索引对应的属性关联到当前绑定点gl.ARRAY_BUFFER对应的缓冲区，即colorBuffer，并配置如何从colorBuffer中获取数据
gl.vertexAttribPointer(colorAttributeLocation, colorSize, colorType, colorNormalizeColor, colorStride, 0)
```

#### 6. 绘制

* 调用`gl.drawArrays`方法，按照设定从缓冲区取出数据进行绘制
  * 参数1：绘制图元的方式，决定了每几个点形成一个图元
  * 参数2：从哪个点开始绘制
  * 参数3：指定绘制需要使用到多少个点

```ts
// 绘制矩形，gl.TRIANGLES代表绘制模式（每三个点绘制一个三角形），0代表从第0个点开始绘制，6 * 50代表绘制每6个点一个矩形（两个三角形），共50个矩形
gl.drawArrays(gl.TRIANGLES, 0, 6 * 50)
```

#### 7. 完整示例

详见`./基础示例代码.md`

### 三、加载纹理

```glsl
// TexturedQuad.js (c) 2012 matsuda and kanda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Set the vertex information
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Set texture
  if (!initTextures(gl, n)) {
    console.log('Failed to intialize the texture.');
    return;
  }
}

function initVertexBuffers(gl) {
  var verticesTexCoords = new Float32Array([
    // Vertex coordinates, texture coordinate
    -0.5,  0.5,   0.0, 1.0,
    -0.5, -0.5,   0.0, 0.0,
     0.5,  0.5,   1.0, 1.0,
     0.5, -0.5,   1.0, 0.0,
  ]);
  var n = 4; // The number of vertices

  // Create the buffer object
  var vertexTexCoordBuffer = gl.createBuffer();
  if (!vertexTexCoordBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

  var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
  //Get the storage location of a_Position, assign and enable buffer
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
  gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object

  // Get the storage location of a_TexCoord
  var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  if (a_TexCoord < 0) {
    console.log('Failed to get the storage location of a_TexCoord');
    return -1;
  }
  // Assign the buffer object to a_TexCoord variable
  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
  gl.enableVertexAttribArray(a_TexCoord);  // Enable the assignment of the buffer object

  return n;
}

function initTextures(gl, n) {
  var texture = gl.createTexture();   // 创建一个纹理对象
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
  if (!u_Sampler) {
    console.log('Failed to get the storage location of u_Sampler');
    return false;
  }
  var image = new Image();
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }
  image.onload = function(){ loadTexture(gl, n, texture, u_Sampler, image); };
  image.src = '../resources/sky.jpg';

  return true;
}

function loadTexture(gl, n, texture, u_Sampler, image) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // 对纹理图像进行y轴反转，详见 WebGL编程指南 194页
  // 开启0号纹理单元：下方的配置都不能直接操作纹理对象，只能通过激活的纹理单元来操作
  gl.activeTexture(gl.TEXTURE0);
  // 向target绑定纹理对象，同时将纹理对象绑定到 当前激活的纹理单元 上
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // 配置纹理参数：纹理图像映射到图形上的方式，详见 WebGL编程指南 198页
  // 这里是重置了一下图形小于纹理的情况下使用gl.LINEAR（映射位置附近4个像素的加权平均）方式映射
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // 配置纹理图像：image图片的格式，详见 WebGL编程指南 202页
  // gl.TEXTURE_2D：目标纹理对象
  // 0：mipmap等级，0表示基本图像级别（非金字塔纹理固定0即可）
  // gl.RGB：图像的内部格式，即纹理图片的颜色格式，这里是RGB格式（jpg图像）
  // gl.RGB：纹理数据的格式，要跟上一个相同
  // gl.UNSIGNED_BYTE：纹理数据的类型，每个颜色分量占用一个字节
  // image：包含纹理图像的Image对象
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // 将0号纹理传递给着色器
  gl.uniform1i(u_Sampler, 0);
  
  gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
}

```





















