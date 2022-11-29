<template>
  <form>
    <app-input
        v-focus
        label="Название"
        v-model="v$.task.name.$model"
        :error="v$.task.name.$error"
    />
    <div
        class="error"
        v-if="v$.task.name.required.$invalid && v$.task.name.$dirty"
    >
      Название обязательно для заполнения
    </div>

    <dropdown
        :default-content="defaultPriority"
        :options-content="priorityOptions"
        label="Приоритет"
        v-model="v$.task.priority.$model"
        :error="v$.task.priority.$error"
        @blur="test"
    >
    </dropdown>
    <div
        class="error"
        v-if="v$.task.priority.required.$invalid && v$.task.priority.$dirty"
    >
      Приоритет обязателен для заполнения
    </div>

    <app-checkbox
        name="Задача легкая"
        v-model="task.easy"
    >
    </app-checkbox>

    <app-label>Описание:</app-label>
    <textarea
        class="textarea"
        v-model="task.description"
    />

    <app-button
        class="btns"
        v-bind:disabled="v$.$invalid"
        @click="$emit('create', task)"
    >
      {{ btnName }}
    </app-button>
  </form>
</template>

<script>
import AppButton from "@/components/UI/AppButton";
import AppLabel from "@/components/UI/AppLabel";
import {computed, ref} from "vue";
import Dropdown from "@/components/UI/Dropdown";
import AppCheckbox from "@/components/UI/AppCheckbox";
import {required} from "@vuelidate/validators";
import {useVuelidate} from '@vuelidate/core'

export default {
  components: {AppCheckbox, Dropdown, AppLabel, AppButton},

  props: {
    task: {
      type: Object
    }
  },

  setup(props) {
    const priorityOptions = ref([
      {value: "LOW", name: "Низкий"},
      {value: "MEDIUM", name: "Средний"},
      {value: "HIGH", name: "Высокий"}
    ])
    const btnName = props.task.id === undefined ? "Создать" : "Сохранить"
    const defaultPriority = props.task.priority === undefined
        ? "Выберите значение"
        : priorityOptions.value[priorityOptions
            .value
            .findIndex((el) => el.value === props.task.priority)]
            .name

    const rules = computed(() => ({
      task: {
        name: {
          required
        },
        priority: {
          required
        }
      }
    }))

    const v$ = useVuelidate(rules, {task: props.task})

    const test = () => {
      v$.value.task.priority.$touch()
    }

    return {
      priorityOptions,
      defaultPriority,
      btnName,
      v$,
      test
    }
  }
}
</script>

<style scoped>
.btns {
  display: flex;
  margin-left: auto;
}
</style>