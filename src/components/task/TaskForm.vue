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

    <app-label>Категории:</app-label>
    <el-select
        v-model="categoryValue"
        multiple
        popper-class="el-select__dropdown"
        placeholder="Выберите категорию"
        style="width: 100%; margin: 0 0 5px 0;"
        @change="selectChange"
        @remove-tag="removeTag"
    >
      <el-option
          v-for="category in categoryOptions"
          :key="category.id"
          :label="category.name"
          :value="category.id"
      />
    </el-select>

    <dropdown
        :placeholder="defaultPriority"
        :options-content="priorityOptions"
        label="Приоритет"
        v-model="v$.task.priority.$model"
        :error="v$.task.priority.$error"
        @blur="priorityFieldValidate"
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
import {useVuelidate} from '@vuelidate/core';
import useAxios from "@/hooks/useAxios";

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
    const categoryValue = ref([])
    const categoryOptions = ref([])

    const getCategoryValue = () => {
      props.task.categories.forEach((el) => {
        categoryValue.value.push(el.id)
      })
    }
    getCategoryValue()

    useAxios.get("/api/categories/list")
        .then(_categories => {
          categoryOptions.value = _categories
          categoryOptions.value.forEach(option => option.text = option.name)
        })

    const selectChange = (selectedCategories) => {
      selectedCategories.forEach((value) => {
        if (props.task.categories.find(el => el.id === value) === undefined) {
          props.task.categories
              .push(categoryOptions.value.find(el => el.id === value))
        }
      })
    }

    const removeTag = (removedCategoryId) => {
      props.task.categories.splice(props.task.categories
          .findIndex(el => el.id === removedCategoryId), 1)
    }

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

    const priorityFieldValidate = () => {
      v$.value.task.priority.$touch()
    }

    return {
      priorityOptions,
      defaultPriority,
      btnName,
      v$,
      categoryValue,
      categoryOptions,
      priorityFieldValidate,
      selectChange,
      removeTag,
      getCategoryValue
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