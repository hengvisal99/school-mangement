<template>
  <div class="card">
    <Steps :model="items" :readonly="false" />
  </div>

  <Panel header="Header" toggleable>
    <p class="m-0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </Panel>
</template>

<script >
export default {
    data() {
        return {
            active: 0,
            items: [
                {
                    label: 'Personal Info'
                },
                {
                    label: 'Reservation'
                },
                {
                    label: 'Review'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
</style>