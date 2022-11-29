<template>
  <form>
    <app-input
        v-focus
        label="Название"
        v-model="v$.category.name.$model"
        :error="v$.category.name.$error"
    />
    <div
        class="error" v-if="v$.category.name.required.$invalid && v$.category.name.$dirty"
    >
      Название обязательно для заполнения
    </div>

    <app-label>Описание:</app-label>
    <textarea
        class="textarea"
        v-model="category.description">
    </textarea>

    <app-button
        class="btns"
        v-bind:disabled="v$.$invalid"
        @click="$emit('submit', category)"
    >
      {{ btnName }}
    </app-button>
  </form>
</template>

<script>
import AppInput from "@/components/UI/AppInput";
import AppButton from "@/components/UI/AppButton";
import {required} from "@vuelidate/validators";
import {useVuelidate} from '@vuelidate/core'
import {computed} from "vue";

export default {
  components: {AppButton, AppInput},

  props: {
    category: {
      type: Object
    }
  },

  setup(props) {
    const btnName = props.category.id === undefined ? "Создать" : "Сохранить"

    const rules = computed(() => ({
      category: {
        name: {
          required
        }
      }
    }))

    const v$ = useVuelidate(rules, {category: props.category})

    return {
      btnName,
      v$
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