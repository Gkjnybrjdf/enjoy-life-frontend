<template>
  <div style="text-align: center">
    <h1>Регистрация</h1>
  </div>

  <div class="registration_container">
    <form>
      <app-input
          style=""
          v-focus
          label="Имя пользователя"
          v-model="v$.user.username.$model"
          :error="v$.user.username.$error"
      />
      <div
          class="error"
          v-if="v$.user.username.required.$invalid && v$.user.username.$dirty"
      >
        Имя пользователя обязательно для заполнения
      </div>

      <app-input
          label="Пароль"
          v-model="v$.user.password.$model"
          :error="v$.user.password.$error"
      />
      <div
          class="error"
          v-if="v$.user.password.required.$invalid && v$.user.password.$dirty"
      >
        Пароль обязателен для заполнения
      </div>
      <div
          class="error"
          v-if="v$.user.password.minLength.$invalid && v$.user.password.$dirty"
      >
        Пароль должен состоять как минимум из {{ v$.user.password.minLength.$params.min }} символов
      </div>

      <app-input
          label="Подтвердить пароль"
          v-model="v$.user.confirmPassword.$model"
          :error="v$.user.confirmPassword.$error"
      />
      <div
          class="error"
          v-if="v$.user.confirmPassword.sameAsPassword.$invalid && v$.user.confirmPassword.$dirty"
      >
        Пароли не совпадают
      </div>

      <div
          class="error"
          v-if="regError"
      >
        При регистрации возникла ошибка: "{{ regError }}"
      </div>

      <app-button
          class="registration_btn"
          v-bind:disabled="v$.$invalid"
          @click="register"
      >
        Зарегистрироваться
      </app-button>
    </form>
  </div>
</template>

<script>
import AppInput from "@/components/UI/AppInput";
import {computed, ref} from "vue";
import {minLength, required, sameAs} from "@vuelidate/validators";
import {useVuelidate} from '@vuelidate/core';
import AppButton from "@/components/UI/AppButton";
import useAxios from "@/hooks/useAxios";
import router from "@/router";

export default {
  components: {AppButton, AppInput},

  setup() {
    const user = ref({
      username: undefined,
      password: undefined,
      confirmPassword: undefined,
      roles: []
    })
    const regError = ref(null)

    const rules = computed(() => ({
      user: {
        username: {
          required
        },
        password: {
          required,
          minLength: minLength(6)
        },
        confirmPassword: {
          sameAsPassword: sameAs(user.value.password)
        }
      }
    }))

    const v$ = useVuelidate(rules, {user})

    const register = () => {
      useAxios._post("/api/profile/registration", user.value)
          .then(() => {
            router.push('/successful_registration')
          })
          .catch((e) => {
            regError.value = e.message
          })
    }

    return {
      user,
      v$,
      regError,
      register,
    }
  }
}
</script>

<style scoped>
.registration_container {
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
  position: relative;
  align-items: center;
  width: 500px;
}

.registration_btn {
  background: mediumslateblue;
  color: white;
  width: 100%;
  margin-top: 10px;
}
</style>