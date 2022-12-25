<template>
  <div>
    <transition-group name="category-list">
      <user-item
          v-for="user in users"
          :key="user.id"
          :user="user"
          @remove="$emit('remove', user)"
      >
      </user-item>
    </transition-group>
  </div>
</template>

<script>
import Prompt from "@/components/UI/Prompt";
import UserItem from "@/components/user/UserItem";

export default {
  components: {Prompt, UserItem},
  props: {
    users: {
      type: Array
    }
  }
}
</script>

<style scoped>
.category-list-enter-active,
.category-list-leave-active {
  transition: all 0.4s;
}

.category-list-enter-from,
.category-list-leave-to {
  opacity: 0;
  transform: translateX(180px);
}

.category-list-move {
  transition: transform 0.4s;
}

</style>