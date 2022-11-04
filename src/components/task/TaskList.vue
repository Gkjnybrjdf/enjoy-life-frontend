<template>
  <div>
    <task-item
        v-for="task in tasks"
        :key="task.id"
        :task="task"
    >
    </task-item>
  </div>
</template>

<script>
import TaskItem from "@/components/task/TaskItem";

export default {
  components: {TaskItem},
  props: {
    tasks: {
      type: Array
    }
  }
}
</script>

<style>

</style>