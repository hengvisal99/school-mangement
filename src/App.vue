

<template>
  <router-view></router-view>
  <Toast />
  <DynamicDialog />
</template>


<script setup>
import { onMounted } from "vue";
import { supabase } from "./supabase/supabase";
import { useStore } from "vuex";

const store = useStore();
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
  refreshLogin();
});
</script>

<style scoped>
</style>
