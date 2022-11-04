<template>
  <div>
    <div style="display: flex">
      <h1>Добавленные задачи</h1>
      <div class="btns">
        <b-icon-plus-circle
            class="btn_add"
            @click="showDialog"
        />
      </div>
    </div>
    <app-dialog v-model:show="dialogVisible" header-name="Создание задачи">
      <task-form v-model:show="dialogVisible"/>
    </app-dialog>
    <task-list
        :tasks="tasks"
    >
    </task-list>
  </div>
</template>

<script>
import {getTask} from "@/hooks/useTaskApi";
import TaskList from "@/components/task/TaskList";
import {ref, toRefs} from "vue";
import MyInput from "@/components/UI/AppInput";
import TaskForm from "@/components/task/TaskForm";
import MyDialog from "@/components/UI/AppDialog";

export default {
  components: {MyDialog, TaskForm, MyInput, TaskList},

  setup(props) {
    const dialogVisible = ref(false)

    const {tasks} = getTask('/api/tasks/list')
    const showDialog = () => {
      dialogVisible.value = true
    }

    return {
      tasks,
      dialogVisible,
      showDialog
    }
  }
}
</script>

<style>
.btn_add {
  color: #7B68EE;
  width: 30px;
  height: 30px;
}

.btns {
  margin-left: auto;
}
</style>