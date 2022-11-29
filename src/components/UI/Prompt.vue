<template>
  <div class="box">
    <span class="tooltip">
      {{ content }}
    </span>

    <slot/>
  </div>
</template>

<script>
export default {
  name: 'prompt',
  props: {
    content: {
      type: String
    }
  }
}
</script>

<style scoped>
.box {
  position: relative;
}

.tooltip {
  opacity: 0;
  position: absolute;
  background-color: #6B6B6B;
  color: #fff;
  font-size: 10px;
  white-space: nowrap;
  text-align: center;
  padding: 5px 5px;
  border-radius: 4px;
  z-index: 900;
  top: -20px;
}

.box:hover .tooltip {
  opacity: 1;
}
</style>