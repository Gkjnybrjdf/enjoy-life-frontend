<template>
  <div class="checkbox">
    <input
        class="checkbox_input"
        type="checkbox"
        :value="modelValue"
        @input="updateInput"
    />
    <div class="checkbox-name">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-checkbox',

  props: {
    name: {
      type: String
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },

  setup(props, {emit}) {
    const updateInput = (event) => {
      emit("update:modelValue", event.target.checked)
    }

    return {
      updateInput
    }
  }
}
</script>

<style scoped>
.checkbox {
  display: flex;
  margin-bottom: 10px;
  margin-top: 15px;

}

.checkbox_input {
  size: 15px;
}

.checkbox-name {
  margin-left: 3px;
  font-size: 12px;
}
</style>