<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/UI/Navbar";

export default {
  components: {
    Navbar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.app {
  padding: 100px;
  font-family: Arial;
}
:focus {
  outline: 0;
  box-shadow: 0 0 0 1px hsla(248, 56%, 85%, 100%);
}

.app-label {
  font-size: 11px;
}

.textarea {
  width: 90%;
  border-radius: 5px;
  border: 1px solid darkgrey;
  padding: 10px 15px;
  margin-bottom: 15px;
  display: block;
}

.error {
  color: red;
  font-size: 10px;
  margin-left: 5px;
}

.el-select__dropdown {
  font-family: Arial;
  font-size: 12px;
}

.el-select .el-select__tags .el-tag--info{
  background-color: #7b68ee54;
}

.el-select .el-input__wrapper {
  border: 1px solid darkgrey;
  box-shadow: none;
  --el-select-input-focus-border-color: hsla(248, 56%, 85%, 100%) !important;
}

.el-input__inner {
  font-size: 12px !important;
}

.el-input__inner:focus {
  box-shadow: none;
}
</style>
