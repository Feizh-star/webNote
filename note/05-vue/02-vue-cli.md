## Vue-cli 项目脚手架

### 1. 安装和初始化

#### 1.1 安装 

1. 先准备好 node环境 和 npm，npm设置为淘宝镜像，安装cnpm
2. 全局安装vue-cli：`cnpm i @vue/cli -g`

#### 1.2 创建项目

* 创建项目的过程中：
  * 上下箭头移动选择目标
  * 空格键选中，取消
  * 回车，下一个问题

1. 在要放置项目的目录1，开启终端，执行vue create 项目目录名称（最好不要有中文）

   * 项目目录会作为 目录1的子目录被创建

2. 选择模板：一般选择Manually select features（自己选择功能）

   ```bash
   ? Please pick a preset: (Use arrow keys)
   > Default ([Vue 2] babel, eslint)
     Default (Vue 3 Preview) ([Vue 3] babel, eslint) 
     Manually select features
   ```

3. 选择初始化时安装的功能

   ```bash
   ? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
   >(*) Choose Vue version	// 选择vue版本
    (*) Babel	// 使用babel转换es6语法
    ( ) TypeScript	// 支持typescript扩展语法
    ( ) Progressive Web App (PWA) Support	// 渐进式web app支持
    ( ) Router	// 安装vue-router插件
    ( ) Vuex	// 安装vuex插件
    ( ) CSS Pre-processors	// 安装css、scss、less等预处理器
    (*) Linter / Formatter	// 语法校验
    ( ) Unit Testing
    ( ) E2E Testing
   ```

4. 选择vue版本

   ```bash
   ? Choose a version of Vue.js that you want to start the project with (Use arrow keys)
   > 2.x
     3.x (Preview)
   ```

5. 是否启用路由的history模式：n：使用hash字段路由；Y：使用h5的history路由（需服务端做相应的处理）

   ```bash
   ? Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n) n
   ```

6. 选择css预处理器

   ```bash
   ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): (Use arrow keys)
   > Sass/SCSS (with dart-sass)
     Sass/SCSS (with node-sass)
     Less
     Stylus
   ```

7. 选择es语法校验规则：就是让你的js代码更加好看，&符合规范

   * ESLint with error prevention only：仅预防错误
   * ESLint + Standard config：
   * ESLint + Standard config：标准配置，很严格
     * 对象的方法名和括号之间必须有空格，例如`fun()`，会直接报错，改成`fun ()`就好了
     * 不能有`;`作为语句结束，会报错
     * ...
   * ESLint + Prettier：美观模式
     * 数组和对象不能有多于的`,`，会给警告

   ```
   ? Pick a linter / formatter config: (Use arrow keys)
   > ESLint with error prevention only	// 仅错误预防
     ESLint + Airbnb config
     ESLint + Standard config	// 标准配置
     ESLint + Prettier
   ```

8. 选择何时校验：保存时，还是提交时，一般选择保存时（Lint on save）

   ```
   ? Pick additional lint features: Lint on save
   ```

9. 把babel、eslint等配置文件放在哪，单独的文件还是集成到package.json中

   ```
   ? Where do you prefer placing config for Babel, ESLint, etc.? 
   > In dedicated config files
     package.json
   ```

10. 是否保存本次设置

    ```
    ? Save this as a preset for future projects? (y/N) n
    ```

    







