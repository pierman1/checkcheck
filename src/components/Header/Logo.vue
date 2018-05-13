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
@import '../../assets/global.scss';
  .logo {
    text-align: center;
    background-color: $purple;
    position: fixed;

    a {
      color: #fff;
      font-size: 18px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
</style>
