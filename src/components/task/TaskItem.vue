<template>
  <div class="task-item">
    <div>
      {{ task.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.task-item {
  margin: 5px;
  padding: 10px;
  font-size: 11px;
  background-color: #EBEAFF;
  border-radius: 15px;
  box-shadow: 2px 2px 4px #AFAFBC;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>