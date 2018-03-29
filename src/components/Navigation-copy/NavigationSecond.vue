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
    // display: flex;
    flex-direction: row;
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #F0F0F0;
    padding-top: 60px;
    padding-left: 40px;

    .link {
      margin-right: 20px;
      font-size: 0.65em;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-decoration: none;
      color: #000;
      opacity: 0.3;
      transition: 250ms opacity;

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
