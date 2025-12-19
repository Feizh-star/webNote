<script setup lang="ts">
import Crud from '@/components/CrudPage/Index.vue'
import { getJobList, addJob, updateJob, deleteJob } from '@/api/job'
import { config } from './job-config'
</script>

<template>
  <div class="test-menu">
    <Crud
      :config="config"
      mainKey="postId"
      :addApi="addJob"
      :queryApi="getJobList"
      :deleteApi="deleteJob"
      :modifyApi="updateJob"
    />
  </div>
</template>

<style scoped lang="less">
.test-menu {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
