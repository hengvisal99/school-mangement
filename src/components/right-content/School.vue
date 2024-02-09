<template>
  <div>school</div>
  <div class="flex flex-col gap-2">
          <label for="password" class="font-medium">Password</label>
          <Password
            class="w-3/6"
            v-model="password"
            toggleMask
            :feedback="false"
          />
          <small id="password-help">Enter your password.</small>
        </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
  },
};
</script>

<style scoped>
</style>