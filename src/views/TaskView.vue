<template>
  <div>
    <div style="display: flex">
      <h1>Добавленные задачи</h1>
      <div class="btns">
        <prompt :content="'Добавить задачу'">
          <b-icon-plus-circle
              class="btn_add"
              @click="showDialog"
          />
        </prompt>
      </div>
    </div>

    <task-list
        :tasks="tasks"
        @archive="archiveTask"
        @remove="removeTask"
        @edit="editTask"
        @add="addChild"
        @fetch-children="fetchChildren"
        @close-children="closeChildren"
    >
    </task-list>

    <app-dialog
        v-model:show="dialogTaskVisible"
        :headerName="headerName"
    >
      <task-form
          :task="task"
          @create="createTask"
      />
    </app-dialog>

    <app-dialog
        v-model:show="dialogChildTaskVisible"
        :headerName="headerName"
    >
      <task-form
          :task="task"
          @create="createChild"
      />
    </app-dialog>

  </div>
</template>

<script>
import {deleteTask, getFilteredTask, updateTask, saveChildTask, saveTask} from "@/hooks/useTaskApi";
import TaskList from "@/components/task/TaskList";
import {ref} from "vue";
import MyInput from "@/components/UI/AppInput";
import TaskForm from "@/components/task/TaskForm";
import MyDialog from "@/components/UI/AppDialog";
import {getTaskWithoutId} from "@/hooks/getTaskWithoutId";
import Prompt from "@/components/UI/Prompt";

export default {
  components: {Prompt, MyDialog, TaskForm, MyInput, TaskList},

  setup(props) {
    const clearTask = () => {
      task.value = {
        id: undefined,
        name: undefined,
        description: undefined,
        priority: undefined,
        easy: false,
        active: true,
        categories: []
      }
    }
    const dialogTaskVisible = ref(false)
    const dialogChildTaskVisible = ref(false)
    const filter = ref({
      name: null,
      priority: null,
      easy: null,
      active: true,
      parentTaskId: null
    })
    const parentTask = ref()
    const tasks = ref([])
    const task = ref({})
    clearTask()
    const headerName = ref("")

    const showDialog = () => {
      headerName.value = "Создание задачи"
      dialogTaskVisible.value = true
    }

    getFilteredTask('/api/tasks/filter', filter.value)
        .then(_tasks => {
          tasks.value = _tasks
        })

    const archiveTask = (task) => {
      const newTask = getTaskWithoutId(task)
      newTask.value.active = false

      updateTask(`/api/tasks/${task.id}`, newTask.value)
      tasks.value.splice(tasks.value.indexOf(task), 1)
    }

    const removeTask = (task) => {
      deleteTask(`/api/tasks/${task.id}`)
      tasks.value.splice(tasks.value.indexOf(task), 1)
    }

    const editTask = (newTask) => {
      headerName.value = newTask.parentTaskId === null ? "Редактирование задачи" : "Редактирование подзадачи"
      dialogTaskVisible.value = true
      task.value = {...newTask}
    }

    const createTask = (task) => {
      if (task.id === undefined) {
        saveTask('/api/tasks', task)
            .then(_task => {
              task = _task
              tasks.value.push(task)

              dialogTaskVisible.value = false
              clearTask()
            })
      } else {
        const newTask = getTaskWithoutId(task)
        updateTask(`/api/tasks/${task.id}`, newTask.value)
        .then(_newTask => {
          Object.assign(tasks.value[tasks.value.findIndex((el) => el.id === task.id)], _newTask)
        })
        dialogTaskVisible.value = false
        clearTask()
      }
    }

    const addChild = (task) => {
      headerName.value = "Создание подзадачи"
      dialogChildTaskVisible.value = true
      parentTask.value = task
    }

    const createChild = (task) => {
      saveChildTask(`/api/tasks/child/${parentTask.value.id}`, task)
          .then(_childTask => {
            fetchChildren(parentTask.value)
          })
      dialogChildTaskVisible.value = false
      clearTask()
    }

    const fetchChildren = (task) => {
      filter.value.parentTaskId = task.id
      getFilteredTask('/api/tasks/filter', filter.value)
          .then(_tasks => {
            task.children = _tasks
            task.showChildren = true
          })
    }

    const closeChildren = (task) => {
      task.showChildren = false
    }

    return {
      tasks,
      task,
      dialogTaskVisible,
      dialogChildTaskVisible,
      parentTask,
      filter,
      headerName,
      showDialog,
      archiveTask,
      removeTask,
      createTask,
      addChild,
      createChild,
      fetchChildren,
      closeChildren,
      clearTask,
      editTask
    }
  }
}
</script>

<style scoped>
.btn_add {
  color: #7B68EE;
  width: 30px;
  height: 30px;
  margin: 2px;
}

.btns {
  margin-left: auto;
}
</style>