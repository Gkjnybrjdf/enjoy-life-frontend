<template>
  <div class="navbar">
    <b-icon-house-door
        class="btns"
        @click="$router.push('/')"
    />

    <div class="btns-left">
      <app-button
          style="color: white"
          @click="$router.push('/category')"
      >
        Категории
      </app-button>

      <app-button style="color: white; margin: 2px">
        Сегодня
      </app-button>

      <b-icon-person-circle
          class="btns"
      />
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/UI/AppButton";

export default {
  components: {AppButton}
}
</script>

<style scoped>
.navbar {
  height: 60px;
  background-color: mediumslateblue;
  box-shadow: 2px 2px 4px gray;
  padding: 0 15px;
  display: flex;
  align-items: center;
}

.btns {
  background: mediumslateblue;
  color: white;
  width: 35px;
  height: 35px;
  margin-left: 15px;
}

.btns-left {
  display: flex;
  margin-left: auto;
}
</style>