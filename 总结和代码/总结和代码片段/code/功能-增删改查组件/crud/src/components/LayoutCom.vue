<template>
  <div class="layout">
    <el-container class="page-container">
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          @select="menuSelect"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item :index="key" v-for="(item, key) in components" :key="key">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ key }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <component :is="componentName"></component>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// 可行了
// import path from 'path'

// const files = require.context('@/components/Menu/Dialog', true, /\.vue$/)

// const dialogs = {}
// const names = []
// // 组件导入
// files.keys().forEach((key) => {
//   const name = path.basename(key, '.vue')
  
//   names.push(name)
//   dialogs[name] = files(key).default || files(key)
// })

import path from 'path'
const files = require.context('@/views/test', false, /\.vue$/)
const components = {}
files.keys().forEach(key => {
  const name = path.basename(key, '.vue')
  components[name] = files(key).default || files(key)
})
console.log(components);
export default {
  data() {
    return {
      componentName: Object.keys(components)[0],
      components
    }
  },
  components: {
    ...components
  },
  methods: {
    menuSelect(index) {
      this.componentName = index
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
}
.page-container {
  height: 100%;
  width: 100%;
}
::v-deep {
  .el-aside {
    background-color: #545c64;
  }
}
</style>