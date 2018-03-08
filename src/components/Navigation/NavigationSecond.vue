<template lang="html">
  <div class="navigation-second">
    <router-link class="link" :to="{ name: 'Dashboard', params: {} }">
      Dashboard
    </router-link>
    <router-link class="link" :to="{ name: 'playbooks', params: {} }">
      Playbooks
    </router-link>
    <router-link class="link" :to="{ name: 'checklists', params: {} }">
      Checklists
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavigationSecond'
}
</script>

<style scoped lang="scss">
  .navigation-second {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #F0F0F0;

    .link {
      margin-right: 10px;
      font-size: 0.875em;
      font-weight: 200;
      text-decoration: none;
      color: #000;
    }
  }
</style>
