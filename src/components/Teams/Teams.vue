<template lang="html">
  <div class="teams">
    <div class="title">Teams</div>
    <List :data="teams" :active="active" :route="route"></List>
    <!-- {{active}} -->
    <Addteam></Addteam>
  </div>
</template>

<script>
import List from '../List/List.vue'
import Addteam from './Addteam'
export default {
  name: 'Teams',
  props: [ 'teams', 'active', 'route' ],
  components: {
    List,
    Addteam
  }
}
</script>

<style lang="scss">
  .teams {
    margin-top: 40px;

    .title {
      margin-bottom: 10px;
      margin-left: 35px;
    }
  }
</style>
