<template lang="html">
  <div class="teams">
    <div class="title">Teams</div>
    <List :data="teams" :route="route"></List>
    <Addteam></Addteam>
  </div>
</template>

<script>
import List from '../List/List.vue'
import Addteam from './Addteam'
export default {
  name: 'Teams',
  props: [ 'teams', 'route' ],
  components: {
    List,
    Addteam
  }
}
</script>

<style scoped lang="scss">
  .teams {
    margin-top: 40px;

    .title {
      margin-bottom: 10px;
      margin-left: 35px;
    }
  }
</style>
