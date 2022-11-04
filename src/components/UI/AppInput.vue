<template>
  <label class="app-label">
    {{label}}:

    <input
        class="app-input"
        type="text"
        :value="modelValue"
        @input="updateInput"
    />
  </label>
</template>

<script>
export default {
  name: 'app-input',
  props: {
    modelValue: [Number, String],
    label: {
      type: String
    }
  },

  setup(props, {emit}) {
    const updateInput = (event) => {
      emit("update:modelValue", event.target.value)
    }

    return {
      updateInput
    }
  }
}
</script>

<style scoped>
.app-input {
  width: 90%;
  border-radius: 5px;
  border: 1px solid darkgrey;
  padding: 10px 15px;
  margin-bottom: 10px;
  display: block;
  font-size: 12px;
}
</style>