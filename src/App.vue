

<template>
  <router-view></router-view>
</template>
<script>
import { initFlowbite } from "flowbite";
import MainCompoent from './components/Main-compoent.vue';
export default {
  components: { MainCompoent },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    initFlowbite();
  },
};
</script>
<style scoped>
</style>
