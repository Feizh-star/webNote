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

##### 6.3 缩放

1. 利用js计算：直接对顶点坐标进行乘除

   * 代码：

     ```js
     var data=new Float32Array([
       -0.4, 0.0, 1.0,//三角形顶点1坐标
       -0.4, 1.0, 0.0,//三角形顶点2坐标
       0.6, 0.0, 0.0//三角形顶点3坐标
     ]);
     for(var i = 0; i<9; i += 3) {
       data[i] *= -0.4;
     }
     ```

2. 利用缩放矩阵

   * 原理：利用4×4的缩放矩阵，左乘顶点的齐次坐标，得到的列向量就是缩放后的结果。
     $$
     \left[\begin{matrix} s_x & 0 & 0 & 0 \\ 0 & s_y & 0 & 0 \\ 0 & 0 & s_z & 0 \\ 0 & 0 & 0 & 1\end{matrix}\right]\left[\begin{matrix}x \\ y \\ z \\ 1\end{matrix}\right]=\left[\begin{matrix}x*s_x \\ y*s_y \\ z*s_z \\ 1\end{matrix}\right]
     $$

   * 代码：

     ```glsl
     //attribute声明vec4类型变量apos
     attribute vec4 apos;
     void main() {
       //创建缩放矩阵(坐标扩大2倍/物体放大2倍)
       //2   0   0    0
       //0   2   0    0
       //0   0   2    0
       //0   0   0    1
       mat4 m4 = mat4(2,0,0,0,  0,2,0,0,  0,0,2,0,  0,0,0,1);
       // 缩放矩阵m4左乘顶点坐标(vec4类型数据可以理解为线性代数中的nx1矩阵，即列向量)
       // 逐顶点进行矩阵变换
       gl_Position = m4*apos;
     }
     ```

##### 6.4 模型矩阵

将（多个）以上三种矩阵依次相乘，共同决定顶点/物体在世界坐标系中的位置，称最终的这个矩阵为模型矩阵。
$$
<模型矩阵>=<平移矩阵>×<旋转矩阵>×<缩放矩阵>
$$
对于单个点的模型矩阵如何决定它的位置很好理解，关键是物体/模型的模型矩阵如何决定它在空间中的位置/姿态。可以认为每个物体内部都有一个内部坐标系。这个坐标系的建立方式不唯一，视问题的具体情况而定，例如想要实现物体绕其几何中心旋转，那设置其几何中心作为内部坐标系原点比较好，然而如果想要实现人物站立奔跑、机械臂首尾连接运转、风机/建筑立于地面，最好将物体/模型的底面中心点作为内部坐标系的原点。

下面以机械臂层次模型中的 第二段手臂（第3个立方体，用下角标表示） 为例，帮助理解模型矩阵决定物体姿态的过程。

1. 从模型在世界坐标系运动的角度理解模型矩阵：
   * 初始：一个单位立方体，底面中心位于世界坐标系原点，各个面垂直于穿过它的坐标轴
   * 第二段手臂-缩放-设置大小：由于单位立方体初始位置选择恰当，直接 $<缩放矩阵_3><立方体各个顶点坐标>$ （实际乘以坐标的过程在着色器中），即 从右向左 先乘缩放矩阵即可设置好立方体的大小。且其底面（内部坐标系）依然在 $zOx$ 平面
   * 第二段手臂-旋转-设置姿态：将立方体绕（世界坐标系）原点旋转一定角度 $α_3$，即可实现手臂绕上关节旋转，$<旋转矩阵_3><缩放矩阵_3>$ （乘以坐标的过程略）。其底面（旋转）中心（内部坐标系）依然在 $zOx$ 平面
   * 第二段手臂-平移-安装到上关节处：想象此时有一个虚拟半透明的 第一段手臂，需要将第二段手臂的底面连接到第一段手臂顶部形成关节，$<平移矩阵_3><旋转矩阵_3><缩放矩阵_3>$ ，$<平移矩阵_3>$ 描述的是第一段手臂底面到其顶面的位移 $h_2$，对于本例就是第一段手臂的高度。其底面（旋转）中心（内部坐标系）来到了第一段手臂顶面
     * 第一段手臂-旋转-设置姿态：想象此时有一个虚拟半透明的 第一段手臂 与 第二段手臂形成一个整体，带着第二段手臂旋转了一定角度 $α_2$ （由$<旋转矩阵_2>$ 描述）， $<旋转矩阵_2><平移矩阵_3><旋转矩阵_3><缩放矩阵_3>$。 此时第二段手臂内部坐标系也跟着（绕世界坐标系原点）旋转了 $α_2$
     * 第一段手臂-平移-安装到底座上：将 第二段手臂 和 第一段手臂 作为整体，向上移动一个底座高度的距离 $h_1$（由$<平移矩阵_2>$ 描述），$<平移矩阵_2><旋转矩阵_2><平移矩阵_3><旋转矩阵_3><缩放矩阵_3>$，想象塞入了一个虚拟半透明的底座，高为 $h_1$。此时第二段手臂内部坐标系也跟着（在世界坐标系中）竖直向上平移了 $h_1$
       * 底座-平移-决定整个手臂的位置：将 第二段手臂 和 第一段手臂 和 底座 作为整体，向下移动到 $(0,-12,0)$ 的位置（由$<平移矩阵_1>$ 描述），$<平移矩阵_1><平移矩阵_2><旋转矩阵_2><平移矩阵_3><旋转矩阵_3><缩放矩阵_3>$，第此时第二段手臂内部坐标系也跟着（在世界坐标系中）竖直向下平移了 $12$

**重要**：实际代码中初始模型矩阵是一个单位矩阵，运算过程中是拿 下一个矩阵 右乘 已有模型矩阵，所以最终的 第二段手臂 的模型矩阵如下：
$$
<单位矩阵><平移矩阵_1><平移矩阵_2><旋转矩阵_2><平移矩阵_3><旋转矩阵_3><缩放矩阵_3>
$$
同时在设置每一个立方体部件的缩放矩阵时，都保存了它的上一级（左侧）的模型矩阵，这样就可以避免自身的缩放矩阵影响到后续部件的模型矩阵。

2. 换个角度（这里并没有逆矩阵的过程，从数学原理上跟上面的理解是一样的），从局部坐标系的角度理解 第二段手臂 模型矩阵的构建过程：想象一下，初始有一个局部坐标系与世界坐标系重合，单位立方体与这个局部坐标系是一个整体，它俩一起运动
   * 底座（立方体1）：向下平移$12(<平移矩阵_1>)$，局部坐标系原点平移到$(0,-12,0)$ 。
     * $<单位矩阵><平移矩阵_1>$
     * *缩放此时的局部坐标系中的原始单位立方体，得到底座的 最终模型矩阵*
       * *$<单位矩阵><平移矩阵_1><缩放矩阵_1>$*
   * 第一段手臂（立方体2）：向上平移 底座高度 $h_1(<平移矩阵_2>)$，局部坐标系来到底座顶部平面。 
     * $<单位矩阵><平移矩阵_1><平移矩阵_2>$
   * 第一段手臂（立方体2）：旋转一定角度 $α_2<旋转矩阵_2>$，局部坐标系旋转了 $α_2$，局部坐标轴的方向已经不与世界坐标系平行。
     * $<单位矩阵><平移矩阵_1><平移矩阵_2><旋转矩阵_2>$
     * *缩放此时的局部坐标系中的原始单位立方体，得到第一段手臂的 最终模型矩阵*
       * *$<单位矩阵><平移矩阵_1><平移矩阵_2><旋转矩阵_2><缩放矩阵_2>$*
   * 第二段手臂（立方体3）：向上平移 第一段手臂高度 $h_2(<平移矩阵_3>)$，局部坐标系来到第一段手臂顶部平面，$zOx$平面与第一段手臂顶部平面平行。 
     * $<单位矩阵><平移矩阵_1><平移矩阵_2><旋转矩阵_2><平移矩阵_3>$
   * 第二段手臂（立方体3）：旋转一定角度 $α_3(<旋转矩阵_3>)$，局部坐标系旋转了 $α_3$，局部坐标轴的方向已经不与第一段手臂顶部平面平行。
     * $<单位矩阵><平移矩阵_1><平移矩阵_2><旋转矩阵_2><平移矩阵_3><旋转矩阵_3>$
     * *缩放此时的局部坐标系中的原始单位立方体，得到第二段手臂的 最终模型矩阵*
       * *$<单位矩阵><平移矩阵_1><平移矩阵_2><旋转矩阵_2><平移矩阵_3><旋转矩阵_3><缩放矩阵_3>$*

```js
/**
 * 完整可运行代码位于\webNote\note\12-graph\code\examples\ch09\MultiJointModel.js
 * 逐个绘制部件，且逐个积累部件的模型矩阵（旋转，平移）
 * 原始单位立方体长宽高都为1，且其底面中心刚好在原点，这是进行平移（上一个部件高度/长度）时不需要考虑缩放后的尺寸就可以使各个部件刚好收尾相连的基础
 * @param {*} gl 上下文
 * @param {*} n 单位立方体顶点数量，共4*6=24个
 * @param {*} viewProjMatrix 视图投影矩阵，在本例子中可以认为不变
 * @param {*} u_MvpMatrix 着色器中的模型视图投影矩阵全局变量的指针，对于同一个立方体/物体，mvp矩阵相同
 * @param {*} u_NormalMatrix 着色器中的法向量变幻矩阵全局变量的指针
 */
function draw(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix) {
  // 清除颜色和深度缓冲区
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // 绘制底座
  var baseHeight = 2.0; // 底座高度
  g_modelMatrix.setTranslate(0.0, -12.0, 0.0); // 底座：1-2.再平移-12.0（将单位阵设置为沿y轴向下平移12的平移矩阵）
  // 底座：1-1.单位立方体缩放到合适尺寸【在drawBox会copy后调用scale 右乘 缩放矩阵（xyz缩放10.0, baseHeight, 10.0），然后得到底座的完整模型矩阵】
  drawBox(gl, n, 10.0, baseHeight, 10.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
 
  // 从下向上，第一段手臂
  var arm1Length = 10.0; // 第一段手臂长度
  g_modelMatrix.translate(0.0, baseHeight, 0.0);     // 第一段手臂：2-3.再平移 底座高度，1-2.再平移-12.0，它的底面刚好位于底座的顶面
  g_modelMatrix.rotate(g_arm1Angle, 0.0, 1.0, 0.0);  // 第一段手臂：2-2.再绕 y 轴旋转
  // 第一段手臂：2-1.单位立方体缩放到合适尺寸
  drawBox(gl, n, 3.0, arm1Length, 3.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix); // 绘制

  // 从下向上，第二段手臂
  var arm2Length = 10.0; // 第二段手臂长度
  g_modelMatrix.translate(0.0, arm1Length, 0.0);       // 第二段手臂：3-3.再平移 第一段手臂高度，2-2.再绕 y 轴旋转（第一段手臂旋转，想象一个透明的第一段手臂），2-3.再平移 底座高度，1-2.再平移-12.0
  g_modelMatrix.rotate(g_joint1Angle, 0.0, 0.0, 1.0);  // 第二段手臂：3-2.再绕 z 轴旋转（自身旋转）
  // 第二段手臂：3-1.单位立方体缩放到合适尺寸
  drawBox(gl, n, 4.0, arm2Length, 4.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix); // 绘制

  // 手掌
  var palmLength = 2.0; // 手掌长度（y轴/上下方向的高度）
  g_modelMatrix.translate(0.0, arm2Length, 0.0);       // 手掌：4-3.再平移 第二段手臂高度，3-2.再绕 z 轴旋转（第二段手臂旋转），3-3.再平移 第一段手臂高度，2-2.再绕 y 轴旋转（第一段手臂旋转），2-3.再平移 底座高度，1-2.再平移-12.0
  g_modelMatrix.rotate(g_joint2Angle, 0.0, 1.0, 0.0);  // 手掌：4-2.再绕 y 轴旋转（自身旋转）
  // 手掌：4-1.单位立方体缩放到合适尺寸，手掌的宽是沿着z轴的（由于第一段手臂初始逆时针旋转了90度，才使得手掌的宽看起来像沿着x轴）
  drawBox(gl, n, 2.0, palmLength, 6.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);  // 绘制

  // 让手指在进行它自己的变换后，连接到手掌上
  g_modelMatrix.translate(0.0, palmLength, 0.0);

  // 第一根手指，初始位置位于z轴正半轴
  pushMatrix(g_modelMatrix); // 保证第二根手指的变换也是基于手掌的
    g_modelMatrix.translate(0.0, 0.0, 2.0);
    g_modelMatrix.rotate(g_joint3Angle, 1.0, 0.0, 0.0);  // 手指沿着x轴旋转
    drawBox(gl, n, 1.0, 2.0, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
  g_modelMatrix = popMatrix();

  // 第二根手指，初始位置位于z轴负半轴
  g_modelMatrix.translate(0.0, 0.0, -2.0);
  g_modelMatrix.rotate(-g_joint3Angle, 1.0, 0.0, 0.0);  // 手指沿着x轴旋转
  drawBox(gl, n, 1.0, 2.0, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
}
```



#### 7. 模型视图矩阵

$$
<摄像机空间坐标>=<视图矩阵>×<模型矩阵>×<点的原始坐标>
$$

##### 7.1 概念解释

1. 模型视图矩阵：$$<视图矩阵>×<模型矩阵>$$ 就是模型视图矩阵

2. 世界坐标系：被我们观察的三维空间的坐标系统，例如在纸上画出一个具有立体感的坐标系，就是世界坐标系

3. 原始坐标：点的原始坐标，可以看作将一个点从世界坐标系原点平移后的位置

4. 模型矩阵：将一个点从经旋转、平移、缩放（顺序不同，结果也不同）后，点所在的位置

   * 模型矩阵的旋转、缩放不是相对于物体中心的，而是相对于世界坐标原点的，所以只影响点的位置
   * 对于物体（模型），它也会有一个自己的内部坐标系，可以认为最初内部坐标系的原点在世界坐标系的原点（重合），组成这个物体的所有顶点从内部坐标系原点平移到这些顶点所在的坐标，然后所有顶点在内部坐标系利用内部的模型矩阵进行旋转缩放，最后再经世界坐标系的模型矩阵决定它在世界坐标系中的位置。

5. 世界坐标：$$<模型矩阵>×<点的原始坐标>$$ 得到的就是点在世界坐标系中的坐标

6. 视图矩阵：将点的世界坐标转换到摄像机空间坐标。

   * 可以把摄像机坐标系和世界坐标系都看作是一个物体，“将世界坐标系放在与摄像机坐标系重合的位置，先将世界坐标系原点平移到 $$-T$$ 的位置（矩阵 $$D$$ ），再把世界坐标系绕摄像机坐标系原点旋转（矩阵 $$S$$ ），就得到了世界坐标系中的点在摄像机坐标系中的坐标” 。 $$S*D$$ 就相当于 $$A*x=b$$ 中的 $$A$$ ，其中 $$x$$ 是世界坐标系中的坐标，$$b$$ 是摄像机坐标系中的坐标（如果只考虑原始空间到子空间的映射，不考虑摄像机平移，其实准确的说法是 $$S$$ 相当于 $$A$$ ）。
     $$
     A=S*D=\left[\begin{matrix} s_x & s_y & s_z & 0 \\ u_x & u_y & u_z & 0 \\ -f_x & -f_y & -f_z & 0 \\ 0 & 0 & 0 & 1\end{matrix}\right]\left[\begin{matrix} 1 & 0 & 0 & -T_x \\ 0 & 1 & 0 & -T_y \\ 0 & 0 & 1 & -T_z \\ 0 & 0 & 0 & 1\end{matrix}\right]
     $$
     T是从世界坐标系原点到视点（世界坐标描述 $(c_x,c_y,c_z)$ ）的向量 。行向量 $(s_x,s_y,s_z)$ 是摄像机坐标系的x轴单位向量（在世界坐标系中的描述，下同），行向量 $(u_x,u_y,u_z)$ 是摄像机坐标系的y轴单位向量，行向量 $(-f_x,-f_y,-f_z)$ 是摄像机坐标系的z轴单位向量（负值是因为 $\vec{f}$ 从视点指向目标，是 $z$ 轴的反方向），且相对于原点（未平移），其中 $(s_x,s_y,s_z)$ 指向摄像机右侧， $(u_x,u_y,u_z)$ 指向摄像机视线上方（注意计算时上方向需要重新定位以正交）， $(-f_x,-f_y,-f_z)$ 指向摄像机视线后方（计算时特别注意方向）。

     以上过程等价于坐标系变换 “把摄像机坐标系绕世界原点旋转指向与视线（$\vec{et}$）平行的方向，然后将它平移 $T$ 到视点所在位置（刚好可以位于视点 $e$，看向目标 $t$）”，坐标的变换是坐标系变换的反过程，即上述矩阵形式

> 模型视图矩阵总结：不考虑层次模型，只以单一立方体为例
>
> 假设有一个棱长为1的正方体，它内部的坐标系原点在其正中心位置，它的6个面刚好垂直于3个坐标轴。最初，摄像机坐标系、世界坐标系、正方体内部坐标系重合在一起。
>
> 正方体的8个顶点从其内部坐标系原点平移到各自的位置（缩放（决定大小）），再进行（可能的）旋转，得到点的原始坐标，然后与内部坐标系看作一个整体；
>
> 立方体内部坐标系（带着立方体的顶点）在世界坐标系中经过平移（至此为单个立方体的模型矩阵），各个顶点到达它在世界坐标系的位置，然后与世界坐标系看作一个整体；
>
> 世界坐标系（带着立方体的顶点）在摄像机坐标系中经过（视图矩阵）先平移、后旋转，各个顶点到达它在摄像机坐标系中的位置，然后与摄像机坐标系看作一个整体；
>
> 将摄像机坐标系（带着上述一切坐标系和顶点）放置在屏幕正中心（x轴向右，y轴向上，z轴指向屏幕外），形成看到的场景。

7. 为什么 $S$ （ $S$ 只负责旋转，原点是 $o$ ）由摄像机坐标系的三个轴的正方向单位向量作为行？

   * 先只考虑 $x$（$\vec{s}$） 轴，其单位向量$\vec{os}$ $(s_x,s_y,s_z)$，假设点坐标是 $p$ ，那么向量 $\vec{op}$ 在向量 $\vec{os}$ 上的投影就是 $\vec{op}·\vec{os}$ （点积的几何意义），那么这个投影就是点 $p$ 在摄像机 $x$ 轴上的分量坐标，由于点击满足交换律，可以写成 $\vec{os}·\vec{op}$ ，写成矩阵形式就是 $\left[\begin{matrix} s_x & s_y & s_z & 0 \end{matrix}\right]\left[\begin{matrix} p_x \\ p_y \\ p_z \\ 1 \end{matrix}\right]$，$y$（$\vec{u}$）、$z$（$-\vec{f}$） 轴同理，最终得到 $\left[\begin{matrix} s_x & s_y & s_z & 0 \\ u_x & u_y & u_z & 0 \\ -f_x & -f_y & -f_z & 0 \\ 0 & 0 & 0 & 1\end{matrix}\right]\left[\begin{matrix}  p_x \\ p_y \\ p_z \\ 1 \end{matrix}\right]$。
* **坐标系 $W$（世界坐标系，向量空间）在坐标系 $V$ （摄像机坐标系，子空间）中旋转，旋转矩阵 $S$ 是坐标系 $V$ 在 $W$ 中的标准正交基作为行向量组成的正交矩阵，可以将 $W$ 中的坐标变换到 $V$ 中**，反之，**矩阵 $S^{-1}$ 就是坐标系 $W$ 在 $V$ 中的标准正交基作为行向量组成的旋转矩阵，描述 $V$ 在 $W$ 中的旋转，可以将 $V$ 中的坐标变换到 $W$ 中**。即：要将一个坐标系中的坐标变换到另一个坐标系，用的是对方的标准正交基作为行向量组成的正交矩阵。

```js
/**
 * 初始化一个视图矩阵
 * @param eyeX, eyeY, eyeZ 视点坐标，即摄像机在世界坐标系中的位置
 * @param centerX, centerY, centerZ 视线方向上的一个点坐标，视线从摄像机看向这个点并无限延伸
 * @param upX, upY, upZ 向上的方向向量，用于确定 视线×向上方向 组成的平面
 * @return this
 */
Matrix4.prototype.setLookAt = function(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
  var e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;

  // 视线方向向量
  fx = centerX - eyeX;
  fy = centerY - eyeY;
  fz = centerZ - eyeZ;

  // 归一化视线方向向量，得到视线方向的单位向量，-f就是摄像机坐标系的z轴，指向摄像机后方
  rlf = 1 / Math.sqrt(fx*fx + fy*fy + fz*fz);
  fx *= rlf;
  fy *= rlf;
  fz *= rlf;

  // 视线方向向量与向上方向向量的 叉积，得到的s就是摄像机坐标系的x轴，指向摄像机右侧
  sx = fy * upZ - fz * upY;
  sy = fz * upX - fx * upZ;
  sz = fx * upY - fy * upX;

  // 归一化s，得到指向摄像机右侧的单位向量
  rls = 1 / Math.sqrt(sx*sx + sy*sy + sz*sz);
  sx *= rls;
  sy *= rls;
  sz *= rls;

  // 已知摄像机坐标系的z轴和x轴正方向的 单位向量，叉积得y轴正方向单位向量
  ux = sy * fz - sz * fy;
  uy = sz * fx - sx * fz;
  uz = sx * fy - sy * fx;
  // 至此，摄像机坐标系的三个坐标轴全部使用单位向量表示完毕
  // 将世界坐标 变换到 摄像机坐标，相当于先将世界坐标系与摄像机坐标系重合，然后摄像机不动，旋转世界坐标系
  // 以下就是在摄像机坐标系中 旋转世界坐标系的 旋转矩阵（只考虑一个维度就很好理解，一个点与一个单位向量的点积就是它在单位向量上的投影，即坐标）
  //  sx  sy  sz  0
  //  ux  uy  uz  0
  // -fx -fy -fz  0
  //   0   0   0  1

  // 这个函数是初始化一个视图矩阵，而不是把已有矩阵左乘视图矩阵
  e = this.elements;
  // 这是旋转矩阵的第一列，在数组中顺序排列时因为webgl的矩阵是列主序的，即数组的前4项是第一列
  e[0] = sx;
  e[1] = ux;
  e[2] = -fx;
  e[3] = 0;

  // 第二列
  e[4] = sy;
  e[5] = uy;
  e[6] = -fy;
  e[7] = 0;

  // 第三列
  e[8] = sz;
  e[9] = uz;
  e[10] = -fz;
  e[11] = 0;

  // 第四列
  e[12] = 0;
  e[13] = 0;
  e[14] = 0;
  e[15] = 1;

  // 先平移世界坐标系，然后才旋转，详见translate的定义
  return this.translate(-eyeX, -eyeY, -eyeZ);
};
/**
 * 右乘平移矩阵，即先平移再进行原来的操作
 * @param x 平移的x分量
 * @param y 平移的y分量
 * @param z 平移的z分量
 * @return this
 */
Matrix4.prototype.translate = function(x, y, z) {
  var e = this.elements;
  e[12] += e[0] * x + e[4] * y + e[8]  * z;
  e[13] += e[1] * x + e[5] * y + e[9]  * z;
  e[14] += e[2] * x + e[6] * y + e[10] * z;
  e[15] += e[3] * x + e[7] * y + e[11] * z;
  return this;
};
```



##### 7.2 正交投影

正交投影中定义组成可视空间的6个参数分别是：$left、right、bottom、top$ 是左、右、下、上4个裁剪平面的坐标（有符号），$far、near$ 是视点到远、近2个裁剪平面的距离，正交投影矩阵如下：
$$
\left[\begin{matrix} \frac{2}{right-left} & 0 & 0 & -\frac{right+left}{right-left} \\ 0 & \frac{2}{top-bottom} & 0 & -\frac{top+bottom}{top-bottom} \\ 0 & 0 & -\frac{2}{far-near} & -\frac{far+near}{far-near} \\ 0 & 0 & 0 & 1 \end{matrix}\right]
$$
考虑正交投影后的坐标变换：
$$
<摄像机空间坐标>=<正交投影矩阵>×<视图矩阵>×<模型矩阵>×<点的原始坐标>
$$
理解正交投影矩阵：

* 考虑 $x$ 轴，在数轴上假设 $right$ 一定在 $left$ 右侧，正交投影矩阵第一行 点乘 点的列向量，分子上其实是 $(x-left)+(x-right)$，而 $right-left$ 就是左右裁剪平面的距离。
  * 当 $x$ 在 $right$ 右侧（$x>right$），$x-left>right-left$ 且 $x-right>0$ ，所以 $\frac{(x-left)+(x-right)}{right-left}>1$，超出webgl默认裁剪空间右裁剪平面，不再渲染；
  * 当 $x$ 在 $left$ 左侧（$x<left$），$x-left<0$ 且 $x-right<left-right$（$=-(right-left)$） ，所以 $\frac{(x-left)+(x-right)}{right-left}<-1$，超出webgl默认裁剪空间左裁剪平面，不再渲染；
  * 当 $x$ 在 $left$ 和 $right$ 之间（包含两端），$|x-left|+|x-right|=right-left$，$|x-left+x-right|\leq right-left$，所以$-1\leq\frac{(x-left)+(x-right)}{right-left}\leq1$，在webgl默认裁剪空间之内，且变换是线性的。
* 其他轴同理。webgl中默认裁剪空间是左手系（$z$ 轴向里），但是我们（习惯）想要构造的坐标系是右手系（$z$ 轴向外），所以$far$、$near$ 用距离表示，矩阵第三行与坐标点积后得到 $\frac{(-z-far)+(-z-near)}{far-near}$ ，这个线性关系刚好把 $z=-far$ （右手系中的远裁剪平面处）映射到 1（默认裁剪空间最远处），$z=-near$ （右手系中的近裁剪平面处）映射到 -1（默认裁剪空间最近处），符合右手系的习惯。

代码实现：

```ts
/**
 * 设置正交投影矩阵
 * @param left 左侧裁剪平面坐标
 * @param right 右侧裁剪平面坐标
 * @param bottom 底部裁剪平面坐标
 * @param top 顶部裁剪平面坐标
 * @param near 近处裁剪平面到视点的距离
 * @param far 远处裁剪平面视点的距离
 * @return this
 */
Matrix4.prototype.setOrtho = function(left, right, bottom, top, near, far) {
  var e, rw, rh, rd;

  if (left === right || bottom === top || near === far) {
    throw 'null frustum';
  }

  rw = 1 / (right - left);
  rh = 1 / (top - bottom);
  rd = 1 / (far - near);

  e = this.elements;
  // 列主序，第一列
  e[0]  = 2 * rw;
  e[1]  = 0;
  e[2]  = 0;
  e[3]  = 0;
  // 列主序，第二列
  e[4]  = 0;
  e[5]  = 2 * rh;
  e[6]  = 0;
  e[7]  = 0;
  // 列主序，第三列
  e[8]  = 0;
  e[9]  = 0;
  e[10] = -2 * rd;
  e[11] = 0;
  // 列主序，第四列
  e[12] = -(right + left) * rw;
  e[13] = -(top + bottom) * rh;
  e[14] = -(far + near) * rd;
  e[15] = 1;

  return this;
};
```

##### 7.3 Clip Space和NDC

* Clip Space（裁剪空间）：是一个顶点乘以MVP（Model、View、Projection）矩阵之后所在的空间，**Vertex Shader的输出就是在Clip Space上**，接着由GPU自己做**透视除法**将顶点转换成NDC（标准化设备坐标）。

* 透视除法：将Clip Space坐标的4个分量都除以w分量，就从Clip Space坐标转换到了NDC了。

* NDC空间：标准化设备坐标，是一个长宽高取值范围为[-1,1]的立方体，超过这个范围的顶点，会被GPU剪裁。webgl的NDC空间z轴指向屏幕内部。

Clip Space和NDC是理解透视投影的基础。

##### 7.4 透视投影

透视投影中定义视椎体的垂直视角$fov$（弧度，代码参数是角度，内部转为弧度），近裁剪平面宽高比 $aspect$ （代码中就是绘图区域的宽高比），近裁剪平面到视点的距离 $near$，远裁剪平面到视点的距离 $far$，透视投影矩阵如下：
$$
\left[\begin{matrix}\frac{1}{aspect*tan(\frac{fov}{2})} & 0 & 0 & 0 \\ 0 & \frac{1}{tan(\frac{fov}{2})} & 0 & 0 \\ 0 & 0 & -\frac{far+near}{far-near} & -\frac{2*far*near}{far-near} \\ 0 & 0 & -1 & 0\end{matrix}\right]
$$


真正的透视效果经历了2步：1.将摄像机空间坐标（经MV矩阵变换后的坐标）经透视投影矩阵转换为裁剪空间坐标，此时 $w$ 分量是 $-z$（由透视投影矩阵第四行的`-1`产生）；2.GPU进行透视除法将裁剪空间坐标转换为NDC。

> 在透视投影中：
>
> 视点在 人眼/摄像机 位置，再向前延伸是近裁剪平面，远处是远裁剪平面。从视点（人眼/摄像机）到远裁剪平面形成一个四棱锥。近裁剪平面到远裁剪平面之间的截头锥体，经透视投影和透视除法，被压缩/拉伸到规范立方体（NDC空间），屏幕（或绘图区域）是观察平面，

* 考虑 $x$ 轴，原坐标$(x,y,z,1)$ 中的 $x$ 经过透视矩阵和透视除法得到NDC的 $x^{'}=\frac{x}{(-z)*aspect*tan(\frac{fov}{2})}$，其中 $aspect*tan(\frac{fov}{2})$ 是右裁剪平面与视线方向夹角的正切值，$-z$ 是点的 $z$ 分量到视点的距离，$d_x=(-z)*aspect*tan(\frac{fov}{2})$ 就是 $-z$处垂直于$z$轴的平面$P_z$与$z$轴交点 到 $P_z$与右裁剪平面交点 的距离（俯视图下就是一个相似三角形问题）。那么 $z$ 一定时，$x$ 在 $[-d_z,d_z]$ 之间移动，$x^{'}$ 刚好被线性变换到NDC空间（$[-1,1]$之间）
* $y$ 轴同理，$y^{'}=\frac{y}{(-z)*tan(\frac{fov}{2})}$。只不过 $\frac{fov}{2}$ 本来就是上裁剪平面与视线方向夹角，所以计算正切时不需要乘以 $aspect$，这是一个左视图下的相似三角形问题。
* $z$ 轴是非线性变换，$z^{'}=\frac{\frac{2*far*near}{far-near}}{z}+\frac{far+near}{far-near}$ 是一个反比例函数的第三象限向上平移跨过横轴的图像，$z^{'}∈[-1,1]$ 随着 $z$ （负数）的减小（变远）而增大，且在距离 $-near$ 越远的位置增幅越小，即 $z$ 越小（由近到远）， $z^{'}$ 值越大（越接近1）但是 $z^{'}$ 变化越小（这样确实比线性变换更符合人眼的视觉效果，例如马路中间的隔离栅栏）。

```js
/**
 * 生成透视投影矩阵
 * @param fovy 截头锥体（frustum）上斜面和下斜面形成的垂直夹角
 * @param aspect 截头锥体截面的宽高比 (width/height)
 * @param near 近裁剪平面到视点的距离
 * @param far 远裁剪平面到视点的距离
 * @return this
 */
Matrix4.prototype.setPerspective = function(fovy, aspect, near, far) {
  var e, rd, s, ct;

  if (near === far || aspect === 0) {
    throw 'null frustum';
  }
  if (near <= 0) {
    throw 'near <= 0';
  }
  if (far <= 0) {
    throw 'far <= 0';
  }

  fovy = Math.PI * fovy / 180 / 2;
  s = Math.sin(fovy);
  if (s === 0) {
    throw 'null frustum';
  }

  rd = 1 / (far - near);
  ct = Math.cos(fovy) / s; // 1/tan(fovy/2)

  e = this.elements;

  e[0]  = ct / aspect; // 1/(aspect*tan(fovy/2))
  e[1]  = 0;
  e[2]  = 0;
  e[3]  = 0;

  e[4]  = 0;
  e[5]  = ct; // 1/tan(fovy/2)
  e[6]  = 0;
  e[7]  = 0;

  e[8]  = 0;
  e[9]  = 0;
  e[10] = -(far + near) * rd; // 和p34、透视除法一起构造z轴反比例映射关系
  e[11] = -1; // 构造齐次分量w=-z，用于GPU透视除法

  e[12] = 0;
  e[13] = 0;
  e[14] = -2 * near * far * rd; // 和p33、透视除法一起构造z轴反比例映射关系
  e[15] = 0;

  return this;
};
```

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

### 四、基础光照

​		光源有很多种，主要包括：平行光、点光源、环境光等，还有聚光灯、车前灯等（暂不考虑的）。反射主要有漫反射、环境反射



















