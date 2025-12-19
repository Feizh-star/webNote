<template>
  <div class="layout-bread">
    <div class="bread-icon">
      <span class="location-icon"></span>
    </div>
    <div class="bread-text">
      <span>当前位置：</span>
    </div>
    <div class="bread-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(item, index) in currentMenuPath"
          :key="index"
          :class="{ lastone: index === currentMenuPath.length - 1 }"
          @click="(event: Event) => breadcrumbClick(item, event)"
          >{{ item.meta?.title || '' }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenu } from '@/store/menu'
import { computed } from 'vue'
const menu = useMenu()
const currentMenuPath = computed(() => menu.getRouteNodePath.filter((node) => node?.meta?.title))
function breadcrumbClick(menu: any, event: Event) {
  console.log(menu)
}
</script>

<style lang="less" scoped>
@max-height: 47px;

@text-color: #666666;

.layout-bread {
  display: flex;
  height: 100%;
  max-height: @max-height;
  color: @text-color;
  padding-left: 20px;
  background-color: #fff;
  .bread-icon,
  .bread-text,
  .bread-breadcrumb {
    display: inline-flex;
    align-items: center;
  }
  .bread-text {
    font-size: 16px;
  }
  .bread-icon {
    .location-icon {
      width: 12px;
      height: 18px;
      background-image: url('@/assets/images/position2x.png');
      background-size: cover;
      margin-right: 5px;
    }
  }
  .bread-text {
  }
}
:deep(.el-breadcrumb) {
  .el-breadcrumb__separator {
    color: @text-color;
  }
  .el-breadcrumb__item {
    .el-breadcrumb__inner {
      color: @text-color;
      font-size: 16px;
      cursor: pointer !important;
    }
    &.lastone .el-breadcrumb__inner {
      color: @text-hcolor;
    }
  }
}
</style>
