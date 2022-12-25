<template>
  <h1>Список пользователей</h1>

  <user-list
      :users="users"
      @remove="removeUser"
  >
  </user-list>
</template>

<script>
import UserList from "@/components/user/UserList";
import {ref} from "vue";
import useAxios from "@/hooks/useAxios";

export default {
  components: {UserList},

  setup() {
    const users = ref([])

    useAxios.get("/api/user/list")
        .then(_users => {
          users.value = _users.content
        })

    const removeUser = (user) => {
      useAxios.delete(`/api/user/${user.id}`)
      users.value.splice(users.value.indexOf(user), 1)
    }

    return {
      users,
      removeUser
    }
  }
}
</script>

<style scoped>

</style>