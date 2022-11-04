<template>
  <select class="select" v-model="modelValue" @change="changeOption">
    <option class="my-option"
        v-for="option in options"
        :value="option.value"
        :key="option.value"
    >
      {{ option.name }}
    </option>

  </select>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array
    }
  },
  setup(props, {emit}) {
    const changeOption = (event) => {
      emit('update:modelValue', event.target.value)
    }

    return {
      changeOption
    }
  }
}
</script>

<style>
.select {
  width: 100%;
  border-radius: 5px;
  border: 1px solid darkgrey;
  padding: 10px 15px;
  margin-bottom: 10px;
  display: block;
}
</style>