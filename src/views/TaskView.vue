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

    <div class="upload">
      <el-upload
          ref="upload"
          style="margin-left: auto"
          action="http://localhost:8080/api/tasks/upload"
          :with-credentials="true"
          :on-error="errorUpload"
          :on-success="successUpload"
          :limit="1"
          :auto-upload="false"
      >
        <template #trigger>
          <app-button>
            Выбрать файл
          </app-button>
        </template>
        <app-button
            style="margin-left: 5px;
                   background: mediumslateblue;
                   color: white;"
            @click="submitUpload"
        >
          Загрузить задачи
        </app-button>
        <template #tip>
          <div class="el-upload__tip text-red">
            допустимый формат файла: json
          </div>
        </template>
      </el-upload>
    </div>
  </div>
</template>

<script>
import TaskList from "@/components/task/TaskList";
import {ref} from "vue";
import MyInput from "@/components/UI/AppInput";
import TaskForm from "@/components/task/TaskForm";
import MyDialog from "@/components/UI/AppDialog";
import {getTaskWithoutId} from "@/hooks/getTaskWithoutId";
import Prompt from "@/components/UI/Prompt";
import AppInput from "@/components/UI/AppInput";
import AppButton from "@/components/UI/AppButton";
import useAxios from "@/hooks/useAxios";

export default {
  components: {AppButton, AppInput, Prompt, MyDialog, TaskForm, MyInput, TaskList},

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
    const headerName = ref("")
    const upload = ref()

    const errorUpload = (error) => {
      alert("Ошибка при обработке файла")
    }

    const submitUpload = () => {
      upload.value.submit()
    }

    const successUpload = () => {
      useAxios.post('/api/tasks/filter', filter.value)
          .then(_tasks => {
            tasks.value = _tasks
          })
    }

    const showDialog = () => {
      clearTask()
      headerName.value = "Создание задачи"
      dialogTaskVisible.value = true
    }

    useAxios.post('/api/tasks/filter', filter.value)
        .then(_tasks => {
          tasks.value = _tasks
        })

    const archiveTask = (task) => {
      const newTask = getTaskWithoutId(task)
      newTask.value.active = false

      useAxios.put(`/api/tasks/${task.id}`, newTask.value)
      tasks.value.splice(tasks.value.indexOf(task), 1)
    }

    const removeTask = (task) => {
      useAxios.delete(`/api/tasks/${task.id}`)
      if (task.parentTaskId === null) {
        tasks.value.splice(tasks.value.indexOf(task), 1)
      } else {
        let children = tasks.value[tasks.value
            .findIndex((el) => el.id === task.parentTaskId)].children
        children.splice(children.indexOf(task), 1)
      }
    }

    const editTask = (newTask) => {
      headerName.value = newTask.parentTaskId === null ? "Редактирование задачи" : "Редактирование подзадачи"
      dialogTaskVisible.value = true
      task.value = {...newTask}
    }

    const createTask = (task) => {
      if (task.id === undefined) {
        useAxios.post('/api/tasks', task)
            .then(_task => {
              task = _task
              tasks.value.push(task)

              dialogTaskVisible.value = false
              clearTask()
            })
      } else {
        const newTask = getTaskWithoutId(task)

        useAxios.put(`/api/tasks/${task.id}`, newTask.value)
            .then(_newTask => {
              if (task.parentTaskId === null) {
                Object.assign(tasks.value[tasks.value
                    .findIndex((el) => el.id === task.id)], _newTask)
              } else {
                let children = tasks.value[tasks.value
                    .findIndex((el) => el.id === task.parentTaskId)].children

                Object.assign(children[children
                    .findIndex((el) => el.id === task.id)], _newTask)
              }
            })
        dialogTaskVisible.value = false
        clearTask()
      }
    }

    const addChild = (task) => {
      clearTask()
      headerName.value = "Создание подзадачи"
      dialogChildTaskVisible.value = true
      parentTask.value = task
    }

    const createChild = (task) => {
      useAxios.post(`/api/tasks/child/${parentTask.value.id}`, task)
          .then(_childTask => {
            fetchChildren(parentTask.value)
          })
      dialogChildTaskVisible.value = false
      clearTask()
    }

    const fetchChildren = (task) => {
      filter.value.parentTaskId = task.id
      useAxios.post('/api/tasks/filter', filter.value)
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
      upload,
      showDialog,
      archiveTask,
      removeTask,
      createTask,
      addChild,
      createChild,
      fetchChildren,
      closeChildren,
      clearTask,
      editTask,
      submitUpload,
      errorUpload,
      successUpload
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

.upload {
  margin: 20px;
  display: flex;
}
</style>