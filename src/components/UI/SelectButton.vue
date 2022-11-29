<template>
  <div class="select-button">
    <b-icon-check-circle-fill
        class="select-button-checked"
    />
    <div class="select-button-unchecked"/>
  </div>
</template>

<script>
export default {
  name: 'select-button',
}
</script>

<style scoped>
.select-button {
  width: 21px;
  height: 21px;
  border-color: red;
  position: relative;
}

.select-button-checked {
  position: absolute;
  width: 21px;
  height: 21px;
  z-index: 1;
  color: darkgrey;
}

.select-button-unchecked {
  background-color: white;
  border: 1px solid darkgrey;
  border-radius: 19px;
  width: 19.5px;
  height: 19.5px;
  position: absolute;
  z-index: 2;
}

.select-button-unchecked:hover {
  display: none;
}
</style>