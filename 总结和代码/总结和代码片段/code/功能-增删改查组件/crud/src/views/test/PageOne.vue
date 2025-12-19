<template>
  <div class="page-one">
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

<script>
import { getJobList, addJob, updateJob, deleteJob } from '@/api/job.js'
import Crud from '@/components/crud/index.vue'
import { config } from './job-config.jsx'
export default {
  data() {
    return {
      config,
    }
  },
  components: {
    Crud
  },
  methods: {
    getJobList,
    addJob,
    updateJob,
    deleteJob
  }
}
</script>

<style lang="scss" scoped>
.page-one {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>