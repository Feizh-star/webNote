// MultiJointModel.js (c) 2012 matsuda and itami
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  // Shading calculation to make the arm look three-dimensional
  '  vec3 lightDirection = normalize(vec3(0.0, 0.5, 0.7));\n' + // Light direction
  '  vec4 color = vec4(1.0, 0.4, 0.0, 1.0);\n' +  // Robot color
  '  vec3 normal = normalize((u_NormalMatrix * a_Normal).xyz);\n' +
  '  float nDotL = max(dot(normal, lightDirection), 0.0);\n' +
  '  v_Color = vec4(color.rgb * nDotL + vec3(0.1), color.a);\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
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

  // Set the clear color and enable the depth test
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Get the storage locations of uniform variables
  var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  var u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
  if (!u_MvpMatrix || !u_NormalMatrix) {
    console.log('Failed to get the storage location');
    return;
  }

  // Calculate the view projection matrix
  var viewProjMatrix = new Matrix4();
  viewProjMatrix.setPerspective(50.0, canvas.width / canvas.height, 1.0, 100.0);
  viewProjMatrix.lookAt(20.0, 10.0, 30.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

  // Register the event handler to be called on key press
  document.onkeydown = function(ev){ keydown(ev, gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix); };

　draw(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix); // Draw the robot arm
}

var ANGLE_STEP = 3.0;     // The increments of rotation angle (degrees) 逆时针
var g_arm1Angle = 90.0;   // The rotation angle of arm1 (degrees)逆时针
var g_joint1Angle = 45.0; // The rotation angle of joint1 (degrees) 逆时针
var g_joint2Angle = 0.0;  // The rotation angle of joint2 (degrees) 逆时针
var g_joint3Angle = 0.0;  // The rotation angle of joint3 (degrees) 逆时针

function keydown(ev, gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix) {
  switch (ev.keyCode) {
    case 40: // Up arrow key -> the positive rotation of joint1 around the z-axis
      if (g_joint1Angle < 135.0) g_joint1Angle += ANGLE_STEP;
      break;
    case 38: // Down arrow key -> the negative rotation of joint1 around the z-axis
      if (g_joint1Angle > -135.0) g_joint1Angle -= ANGLE_STEP;
      break;
    case 39: // Right arrow key -> the positive rotation of arm1 around the y-axis
      g_arm1Angle = (g_arm1Angle + ANGLE_STEP) % 360;
      break;
    case 37: // Left arrow key -> the negative rotation of arm1 around the y-axis
      g_arm1Angle = (g_arm1Angle - ANGLE_STEP) % 360;
      break;
    case 90: // 'ｚ'key -> the positive rotation of joint2
      g_joint2Angle = (g_joint2Angle + ANGLE_STEP) % 360;
      break; 
    case 88: // 'x'key -> the negative rotation of joint2
      g_joint2Angle = (g_joint2Angle - ANGLE_STEP) % 360;
      break;
    case 86: // 'v'key -> the positive rotation of joint3
      if (g_joint3Angle < 60.0)  g_joint3Angle = (g_joint3Angle + ANGLE_STEP) % 360;
      break;
    case 67: // 'c'key -> the nagative rotation of joint3
      if (g_joint3Angle > -60.0) g_joint3Angle = (g_joint3Angle - ANGLE_STEP) % 360;
      break;
    default: return; // Skip drawing at no effective action
  }
  // Draw the robot arm
  draw(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
}

function initVertexBuffers(gl) {
  // 顶点坐标（这是一个单位立方体，棱长为1，底部中心位于坐标系原点（能够使用scale控制大小并定位的关键），各个面垂直于穿过它的坐标轴
  var vertices = new Float32Array([
    0.5, 1.0, 0.5, -0.5, 1.0, 0.5, -0.5, 0.0, 0.5,  0.5, 0.0, 0.5, // v0-v1-v2-v3 front
    0.5, 1.0, 0.5,  0.5, 0.0, 0.5,  0.5, 0.0,-0.5,  0.5, 1.0,-0.5, // v0-v3-v4-v5 right
    0.5, 1.0, 0.5,  0.5, 1.0,-0.5, -0.5, 1.0,-0.5, -0.5, 1.0, 0.5, // v0-v5-v6-v1 up
   -0.5, 1.0, 0.5, -0.5, 1.0,-0.5, -0.5, 0.0,-0.5, -0.5, 0.0, 0.5, // v1-v6-v7-v2 left
   -0.5, 0.0,-0.5,  0.5, 0.0,-0.5,  0.5, 0.0, 0.5, -0.5, 0.0, 0.5, // v7-v4-v3-v2 down
    0.5, 0.0,-0.5, -0.5, 0.0,-0.5, -0.5, 1.0,-0.5,  0.5, 1.0,-0.5  // v4-v7-v6-v5 back
  ]);

  // 顶点法向量，与上面的顶点一一对应
  var normals = new Float32Array([
    0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0, // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0, // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0, // v0-v5-v6-v1 up
   -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0, // v7-v4-v3-v2 down
    0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0  // v4-v7-v6-v5 back
  ]);

  // Indices of the vertices
  var indices = new Uint8Array([
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
  ]);

  // Write the vertex property to buffers (coordinates and normals)
  if (!initArrayBuffer(gl, 'a_Position', vertices, gl.FLOAT, 3)) return -1;
  if (!initArrayBuffer(gl, 'a_Normal', normals, gl.FLOAT, 3)) return -1;

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Write the indices to the buffer object
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl, attribute, data, type, num) {
  // Create a buffer object
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  // Assign the buffer object to the attribute variable
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);

  return true;
}

// g_modelMatrix存放模型矩阵；g_mvpMatrix用来设置模型视图投影矩阵
var g_modelMatrix = new Matrix4(), g_mvpMatrix = new Matrix4();

/**
 * 逐个绘制部件，且逐个积累部件的模型矩阵（旋转，平移）
 * 原始单位立方体长宽高都为1，且其底面中心刚好在原点，这是进行平移（上一个部件高度/长度）时不需要考虑缩放后的尺寸就可以使各个部件刚好收尾相连的基础
 * @param {*} gl 
 * @param {*} n 
 * @param {*} viewProjMatrix 
 * @param {*} u_MvpMatrix 
 * @param {*} u_NormalMatrix 
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

var g_matrixStack = []; // 一个用于暂存模型矩阵的栈
function pushMatrix(m) { // 入栈，拷贝原来的矩阵
  var m2 = new Matrix4(m);
  g_matrixStack.push(m2);
}

function popMatrix() { // 弹出最后一个入栈的模型矩阵
  return g_matrixStack.pop();
}

var g_normalMatrix = new Matrix4();  // 暂存顶点法向量的变换矩阵

/**
 * 绘制 长方体 形状的立方体
 * 所有部件都基于顶点缓冲区中的顶点坐标 左乘 模型矩阵（缩放，旋转，平移）得到
 * 巧妙利用了栈，使得每次绘制都只积累部件的旋转和平移，而不会让缩放影响到角度和位置
 * @param {*} gl 
 * @param {*} n 要绘制的box立方体顶点个数
 * @param {*} width 
 * @param {*} height 
 * @param {*} depth 
 * @param {*} viewProjMatrix 
 * @param {*} u_MvpMatrix 着色器程序中的模型视图投影矩阵指针
 * @param {*} u_NormalMatrix  着色器程序中的法向量变换矩阵指针
 */
function drawBox(gl, n, width, height, depth, viewProjMatrix, u_MvpMatrix, u_NormalMatrix) {
  pushMatrix(g_modelMatrix);   // 暂存包含了前置部件非缩放变换的模型矩阵
    // 将单位立方体以它的底面中心为中心缩放至指定的大小
    g_modelMatrix.scale(width, height, depth);
    // 设置视图投影矩阵，并右乘部件的模型矩阵，得到其模型视图投影矩阵，写入uniform变量
    g_mvpMatrix.set(viewProjMatrix);
    g_mvpMatrix.multiply(g_modelMatrix);
    gl.uniformMatrix4fv(u_MvpMatrix, false, g_mvpMatrix.elements);
    // 根据部件当前的模型矩阵，计算其逆转置矩阵，得到顶点法向量变换矩阵，写入uniform变量
    g_normalMatrix.setInverseOf(g_modelMatrix);
    g_normalMatrix.transpose();
    gl.uniformMatrix4fv(u_NormalMatrix, false, g_normalMatrix.elements);
    // 根据索引绘制图形
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
  g_modelMatrix = popMatrix();   // 恢复包含了前置部件非缩放变换的模型矩阵
}
