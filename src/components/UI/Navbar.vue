<template>
  <div class="navbar">
    <b-icon-house-door
        class="btns"
        @click="$router.push('/')"
    />

    <div v-if="isAuth">
      <app-button
          style="color: white"
          @click="$router.push('/category')"
      >
        Категории
      </app-button>

      <app-button
          style="color: white; margin: 2px"
          @click="$router.push('/task')"
      >
        Задачи
      </app-button>

      <app-button
          v-if="user.roles.find(el => el.name === adminRole)"
          style="color: white; margin: 2px"
          @click="$router.push('/admin')"
      >
        Администрирование
      </app-button>
    </div>

    <div
        v-if="isAuth"
        class="btns-left"
    >
      <app-button
          style="color: white; margin: 2px"
          @click="$router.push('/task')"
      >
        {{ user.username }}
      </app-button>

      <b-icon-box-arrow-left
          class="btns"
          @click="logout"
      />
    </div>

    <div
        v-if="!isAuth"
        class="btns-left"
    >
      <b-icon-box-arrow-in-right
          class="btns"
          @click="$router.push('/login')"
      />
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/UI/AppButton";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import useAxios from "@/hooks/useAxios";
import router from "@/router";
import roles from "@/hooks/roles";

export default {
  components: {AppButton},

  setup() {
    const store = useStore()
    const setIsAuth = () => {
      store.commit('setIsAuth', false)
    }
    const adminRole = ref(roles.admin)

    const logout = () => {
      useAxios.post("/api/logout")
          .then(() => {
            setIsAuth()
            router.push('/')
          })
    }

    return {
      setIsAuth,
      logout,
      adminRole,

      isAuth: computed(() => store.state.user.isAuth),
      user: computed(() => store.state.user.user)
    }
  }
}
</script>

<style scoped>
.navbar {
  height: 60px;
  background-color: mediumslateblue;
  box-shadow: 2px 2px 4px gray;
  padding: 0 15px;
  display: flex;
  align-items: center;
}

.btns {
  background: mediumslateblue;
  color: white;
  width: 35px;
  height: 35px;
  margin: 0 10px 0 10px;
  cursor: pointer;
}

.btns-left {
  align-items: center;
  display: flex;
  margin-left: auto
}
</style>