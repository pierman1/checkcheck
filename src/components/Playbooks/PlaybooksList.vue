<template lang="html">
  <div class="playbooks-list">
    <div class="title">Playbooks</div>
    <!-- {{Playbooks}} -->
    <!-- {{route}} -->
    <List :data="Playbooks" :route="route"></List>
  </div>
</template>

<script>
import List from '../List/List.vue'

export default {
  name: 'PlaybooksList',
  props: [ 'Playbooks', 'route' ],
  components: {
    List
  }
}
</script>

<style lang="scss">
.playbooks-list {
  margin-top: 0px;

  .title {
    margin-bottom: 10px;
    margin-left: 35px;
    color: #B8E986;
  }
}
</style>
