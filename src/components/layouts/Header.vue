<template>
  <div id="header" class="d-flex align-items-center">
    <h4 id="header-title">Nome</h4>
  </div>
</template>
  
<!-- <script setup lang="ts">
import { watch, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
let pageName = ref(router.currentRoute.value.path)

const pagesNames: Record<string, string> = {
  '/': 'Dashboard',
  '/lojas': 'Lojas',
}

const findPageName = () => {
  const newPath = router.currentRoute.value.path;
  const newText = pagesNames[newPath];
  if (newText) {
    pageName.value = newText;
  }
};

watch(() => router.currentRoute.value.path, findPageName);
onMounted(findPageName)
</script> -->
  
<style lang="scss" scoped>
#header {
  width: 100%;
  height: 20px;

  margin-bottom: 20px;

  #header-title {
    font-weight: bold;
  }
}
</style>