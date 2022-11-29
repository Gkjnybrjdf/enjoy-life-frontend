<template>
  <div>
    <transition-group name="category-list">
      <category-item
          v-for="category in categories"
          :key="category.id"
          :category="category"
          @edit="$emit('edit', category)"
          @remove="$emit('remove', category)"
      >
      </category-item>
    </transition-group>
  </div>
</template>

<script>
import CategoryItem from "@/components/category/CategoryItem.vue";
import Prompt from "@/components/UI/Prompt";

export default {
  components: {Prompt, CategoryItem},
  props: {
    categories: {
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