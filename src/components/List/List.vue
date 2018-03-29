<template lang="html">
  <ul class="list">
    <ListItem v-for="item in data" :data="item" :route="route" @showPlaybooks="showPlaybooks"></ListItem>
  </ul>
</template>

<script>
import ListItem from './ListItem'
export default {
  name: 'List',
  props: [ 'data', 'route' ],
  components: {
    ListItem
  },
  methods: {
    showPlaybooks (data) {
      console.log('homo2')
      this.$emit('showPlaybooks', data)
    }
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
