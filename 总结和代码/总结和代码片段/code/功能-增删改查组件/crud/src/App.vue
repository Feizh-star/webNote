<template>
  <div id="app">
    <LayoutCom />
  </div>
</template>

<script>
import LayoutCom from '@/components/LayoutCom.vue'
export default {
  components: {
    LayoutCom
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
