<template>
  <div>
    <div class="category-item">
      <div>
        <div class="category-item-name">
          {{ category.name }}
        </div>
      </div>

      <div style="margin-left: auto;">
        <b-icon-pencil-fill
            class="btns"
            @click="$emit('edit', category)"
        />

        <b-icon-trash3-fill
            class="btns"
            @click="$emit('remove', category)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.category-item {
  margin: 5px;
  padding: 10px;
  font-size: 11px;
  background-color: #EBEAFF;
  border-radius: 15px;
  box-shadow: 2px 2px 4px #AFAFBC;
  display: flex;
  align-items: center;
}

.category-item-name {
  margin-left: 5px
}

.btns {
  margin-left: 10px;
  width: 15px;
  height: 15px;
  color: darkgrey;
}

.btns:hover {
  color: #C9C9C9;
}
</style>