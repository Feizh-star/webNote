#### 

1. 一般来说，找到对应node模块的浏览器版本npm安装手动导入即可（也可以手动挂载到window上）

   * 例如buffer：`npm i -S buffer`，`import { Buffer } from 'buffer/'`
   * 例如path：`npm i -S path-browserify`，`import path from 'path-browserify'`

2. 有些比较麻烦，比如crypto

   1. 安装依赖：

   ```js
   npm i stream-browserify browserify-zlib events process util buffer crypto-browserify
   ```

   2. 在`vite.config.ts`中添加配置：

   ```js
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   
   // https://vitejs.dev/config/
   export default defineConfig({
     plugins: [vue()],
     resolve: {
       alias: {
         process: "process/browser",
         stream: "stream-browserify",
         zlib: "browserify-zlib",
         util: 'util',
         crypto: 'crypto-browserify'
       }
     }
   })
   ```

   3. 在index.html中加入以下内容：

   ```html
   <div id="app"></div>
   <script>window.global = window;</script>
   <script type="module">
       import { Buffer } from "buffer/"; // <-- no typo here ("/")
       import process from "process";
       import EventEmitter from "events";
           
       window.Buffer = Buffer;
       window.process = process;
       window.EventEmitter = EventEmitter;
   </script>
   ```

   4. 在需要crypto和buffer模块的地方导入

   ```js
   import crypto from 'crypto'
   ```
