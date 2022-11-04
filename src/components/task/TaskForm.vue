<template>
  <form>
    <app-input
        v-focus
        label="Название"
        v-model="task.name"
    />

    <dropdown
        :options-content="priorityOptions"
        label="Приоритет"
        v-model="task.priority"
    >
    </dropdown>

    <app-checkbox
        name="Задача легкая"
        v-model="task.easy"
    >
    </app-checkbox>

    <!--    <app-input
            label="Категории"
            v-model="task.categories"
        />-->

    <app-label>Описание:</app-label>
    <textarea
        class="textarea"
        v-model="task.description"
    />

    <app-button
        class="btns"
        @click="onCreate"
    >
      Создать
    </app-button>
  </form>
</template>

<script>
import MyButton from "@/components/UI/AppButton";
import MyLabel from "@/components/UI/AppLabel";
import MySelect from "@/components/UI/MySelect";
import {ref} from "vue";
import Dropdown from "@/components/UI/Dropdown";
import {createTask} from "@/hooks/useTaskApi";
import AppCheckbox from "@/components/UI/AppCheckbox";

export default {
  components: {AppCheckbox, Dropdown, MySelect, MyLabel, MyButton},

  props: {
    show: {
      type: Boolean
    }
  },

  setup(props, {emit}) {
    const task = ref({
      name: undefined,
      description: undefined,
      priority: undefined,
      easy: false,
      active: true,
      categories: []
    })
    const priorityOptions = ref(
        [
          {value: "LOW", name: "Низкий"},
          {value: "MEDIUM", name: "Средний"},
          {value: "HIGH", name: "Высокий"}
        ]
    )

    const onCreate = () => {
      createTask('/api/tasks', task.value)
      emit('update:show', false)
    }

    return {
      priorityOptions,
      task,
      onCreate
    }
  }
}
</script>

<style scoped>
.textarea {
  width: 90%;
  border-radius: 5px;
  border: 1px solid darkgrey;
  padding: 10px 15px;
  margin-bottom: 15px;
  display: block;
}

.btns {
  display: flex;
  margin-left: auto;
}
</style>