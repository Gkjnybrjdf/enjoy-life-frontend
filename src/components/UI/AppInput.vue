<template>
  <label class="app-label">
    {{ label }}:

    <input
        class="app-input"
        :class="{'error-input' : error}"
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
    },
    error: {
      type: Boolean,
      default: false,
      required: false
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
  width: 100%;
  border-radius: 5px;
  border: 1px solid darkgrey;
  padding: 10px 0 10px 0;
  text-indent: 10px;
  margin: 0 0 5px 0;
  display: block;
  font-size: 12px;
}

.error-input {
  border-color: red;
}
</style>