<template>
  <button
      class="app-btn"
      type="button"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'app-button'
}
</script>

<style scoped>
.app-btn {
  background: none;
  padding: 10px 15px;
  color: mediumslateblue;
  border: 1px solid mediumslateblue;
  border-radius: 4px;
  cursor: pointer;
}
</style>