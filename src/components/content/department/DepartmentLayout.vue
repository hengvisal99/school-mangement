<template>
  <div>department layout</div>
  <router-view></router-view>
</template>
  
  <script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("Department component layout");
});
</script>
  
  <style lang="scss" scoped>
</style>