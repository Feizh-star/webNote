import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { useEnv } from './build/index'
// { command, mode }
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = useEnv(loadEnv(mode, process.cwd()))
  return {
    base: env.VITE_APP_BASE_URL,
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        dts: 'auto-imports.d.ts', // 自动导入生成的声明文件名称，要写在tsconfig[.app].json的include包含进去
        // eslint报错解决：根据自动导入的变量，自动生成eslintrc-auto-import.json避免eslint报“变量不存在”
        eslintrc: {
          enabled: true,
          filepath: '.eslintrc-auto-import.json',
          globalsPropValue: true, // 等同于'writable'，告诉eslint这些变量可写
        },
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        // 解析的 UI 组件库
        resolvers: [ElementPlusResolver()],
      }),
      visualizer({
        gzipSize: true,
        open: true, //如果存在本地服务端口，将在打包后自动展示
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@build': fileURLToPath(new URL('./build', import.meta.url)),
        // 以下是为了在浏览器中支持node的crypto模块
        process: 'process/browser',
        stream: 'stream-browserify',
        zlib: 'browserify-zlib',
        util: 'util',
        crypto: 'crypto-browserify',
      },
    },
    css: {
      preprocessorOptions: {
        // scss: {
        //   // 导入sass:math模块，可使用math.div()代替/进行除法计算，避免scss报警告
        //   additionalData: '@use "sass:math"; @import "./src/style/main.scss";'
        // },
        less: {
          // 导入sass:math模块，可使用math.div()代替/进行除法计算，避免scss报警告
          additionalData: '@import "./src/style/main.less";',
        },
      },
    },
    server: {
      host: true,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:10080/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/dev-api': {
          target: 'http://localhost:10080/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ''),
        },
      },
    },
  }
})
