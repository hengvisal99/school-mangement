

<template>
  <router-view></router-view>
</template>


<script setup>
import { initFlowbite } from "flowbite";
import { onMounted } from 'vue';
import { supabase } from './supabase/supabase';
onMounted(() => {
  initFlowbite();
  const storeToken = localStorage.getItem('token')
  console.log('store token',storeToken)
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('event',event)
    console.log('session',session)
  // if (event === 'SIGNED_IN') {
  //   // Retrieve user data based on the session or a separate API call
  //   supabase.auth.user().then((user) => {
  //     userState.value = user;
  //   });
  //   // Optionally redirect to protected pages based on user data or roles
  // } else {
  //   userState.value = null;
  //   // Redirect to login page or handle non-authenticated state
  // }
});
});
</script>

<style scoped>
</style>
