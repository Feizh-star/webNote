### 一、基本概念

#### 1. 着色器

##### 1.1 顶点着色器

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

##### 1.2 片段着色器

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

##### 1.3 两种着色器的通信

* 插值机制： 顶点着色器通过 `varying`（或 WebGL2 的 `out`）变量将数据传递给片段着色器。
  - 在光栅化阶段，GPU 会根据顶点属性对这些数据进行插值。
  - 例如，顶点颜色和纹理坐标通常会在片段之间进行线性插值。

- 数据传递过程：
  1. 顶点着色器输出每个顶点的 `varying` 数据。
  2. 光栅化阶段根据顶点数据计算片段的位置，并对 `varying` 数据进行插值。
  3. 片段着色器接收插值后的数据作为输入。

------

#### 2. 着色器获取数据

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























