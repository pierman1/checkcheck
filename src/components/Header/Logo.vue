<template lang="html">
  <div class="logo">
    <router-link :to="{ name: 'Dashboard' }">
      C
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style scoped lang="scss">
  .logo {
    background-color: gray;
    padding-top: 9px;
    text-align: center;
    // opacity: 0;
  }
</style>
