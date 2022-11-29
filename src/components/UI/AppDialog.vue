<template>
  <div
      class="dialog"
      v-if="show"
  >
    <div class="dialog__content">
      <div class="header">

        <h4>{{ headerName }}</h4>

        <div class="btns">
          <b-icon-x
              class="btn_del"
              @click="hideDialog"
          />
        </div>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-dialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    headerName: {
      type: String,
      default: ''
    }
  },

  setup(props, {emit}) {
    const hideDialog = () => {
      emit('update:show', false)
    }

    return {
      hideDialog
    }
  }
}
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  z-index: 1000;
}

.dialog__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding: 25px;
}

.header {
  display: flex;
  margin-bottom: 15px;
}

.btn_del {
  cursor: pointer;
  opacity: 0.3;
  font-size: 25px;
}

.btns {
  margin-left: auto;
}
</style>