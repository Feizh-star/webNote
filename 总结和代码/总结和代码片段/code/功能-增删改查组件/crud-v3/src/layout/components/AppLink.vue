<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link v-else v-bind="$props" custom :to="$props.to" v-slot="{ isActive, href, navigate }">
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
    >
      <slot />
    </a>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'AppLink',
  inheritAttrs: false,

  props: {
    // @ts-ignore
    ...RouterLink.props,
    inactiveClass: String,
  },

  computed: {
    isExternalLink() {
      return typeof this.to === 'string' && this.to.startsWith('http')
    },
  },
})
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}
</style>
