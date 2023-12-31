<template>
  <RouterView />
  <Toast />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style lang="scss">
@import './assets/scss/styles.scss';

body {
  font-family: 'Open Sans', sans-serif !important;
  font-size: 15px;
  color: #393939;

  margin: 0px;
  background: #E9ECEF;
}
</style>
