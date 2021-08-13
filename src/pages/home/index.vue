<template>
  <div class="index">
    <el-button type='success'
               @click="handleNew">新建</el-button>
    <el-button type='warning'
               @click="handleEdit">编辑</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {
    handleNew() {
      this.$router.push({
        name: 'Flow',
        params: {
          type: 'new',
        },
      })
    },

    handleEdit() {
      this.$router.push({
        name: 'Flow',
        params: {
          type: 'edit',
        },
      })
    },
  },
}
</script>

<style>
</style>