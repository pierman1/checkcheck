<template lang="html">
  <ul class="list">
    <ListItem v-for="item in data" :data="item" :active="active" :route="route"></ListItem>
  </ul>
</template>

<script>
import ListItem from './ListItem'
export default {
  name: 'List',
  props: [ 'data', 'active', 'route' ],
  components: {
    ListItem
  }
}
</script>

<style scoped lang="scss">
  ul {
    padding: 0 20px;;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
