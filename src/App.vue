

<template>
  <router-view></router-view>
</template>


<script setup>
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";
import { supabase } from "./supabase/supabase";
import { useStore } from "vuex";
const store = useStore();
initFlowbite();
const refreshLogin = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (session) {
    store.dispatch("refreshLogin", session);
  }
};

onMounted(() => {
  console.log('refresh main')
  refreshLogin();
  initFlowbite();
});
</script>

<style scoped>
</style>
