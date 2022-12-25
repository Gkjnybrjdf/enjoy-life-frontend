<template>
  <div style="text-align: center">
    <h1>Вход в личный кабинет</h1>
  </div>

  <div class="login_container">
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
          v-if="authError"
      >
        Неверные логин или пароль
      </div>

      <app-button
          class="login_btn"
          v-bind:disabled="v$.$invalid"
          @click="onLogin"
      >
        Войти
      </app-button>
    </form>

    <div class="link_container">
      <router-link
          to="/registration"
      >
        Зарегистрироваться
      </router-link>
    </div>
  </div>
</template>

<script>
import AppInput from "@/components/UI/AppInput";
import {computed, ref} from "vue";
import {required} from "@vuelidate/validators";
import {useVuelidate} from '@vuelidate/core';
import AppButton from "@/components/UI/AppButton";
import useAxios from "@/hooks/useAxios";
import router from "@/router";
import {useStore} from "vuex";

export default {
  components: {AppButton, AppInput},

  setup() {
    const user = ref({
      username: undefined,
      password: undefined
    })
    const authError = ref(false)
    const store = useStore()

    const rules = computed(() => ({
      user: {
        username: {
          required
        },
        password: {
          required
        }
      }
    }))

    const v$ = useVuelidate(rules, {user})

    const getIsAuth = () => store.dispatch("getIsAuth");

    const onLogin = () => {
      let userData = new FormData()
      userData.set("username", user.value.username)
      userData.set("password", user.value.password)
      useAxios._post("/api/login", userData)
          .then(() => {
            authError.value = false
            router.push('/')

            getIsAuth()
          })
          .catch(e => {
            authError.value = true
          })
    }

    return {
      user,
      v$,
      authError,
      onLogin,
      getIsAuth,

      isAuth: computed(() => store.state.user.isAuth)
    }
  }
}
</script>

<style scoped>
.login_container {
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
  position: relative;
  align-items: center;
  width: 500px;
}

.login_btn {
  background: mediumslateblue;
  color: white;
  width: 100%;
  margin-top: 10px;
}

.link_container {
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  width: 150px;
}
</style>