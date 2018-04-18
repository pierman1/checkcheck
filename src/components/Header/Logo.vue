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
    text-align: center;

    a {
      color: #000;
      font-size: 30px;
    }
  }
</style>
