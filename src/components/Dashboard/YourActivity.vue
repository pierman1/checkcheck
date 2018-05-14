<template lang="html">
  <div class="your-activity">
    <div class="inner">
      <h2 class="title">Your acitivity</h2>
      <div class="inside">
        No recent to show activity <router-link class="link" :to="{ name: '/playbooks', params: {} }">start by creating your first playbook</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YourActivity'
}
</script>

<style scoped lang="scss">
@import '../../assets/global.scss';

.your-activity {
  background-color: $purple;
  width: calc(60%) !important;
  color: #fff;
}

.inner {
  padding: 20px;
}

.title {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: #fff;
}

.inside {
  margin-top: 10px;
  font-size: 12px;
  color: lightgray;
  font-weight: 700;

  a {
    color: #fff;text-decoration: none;
  }
}
</style>
