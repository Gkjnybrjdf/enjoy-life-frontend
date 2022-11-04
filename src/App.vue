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
  outline: none;
  box-shadow: 0 0 0 1px hsla(248, 56%, 85%, 100%);
}

.app-label {
  font-size: 11px;
}
</style>
