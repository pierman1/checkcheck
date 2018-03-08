<template lang="html">
  <li class="list-item">
    <router-link @click="showProjects" :to="{ name: 'team', params: {id: data['.key']} }">
      {{data.name}}
    </router-link>
  </li>
</template>

<script>
import Link from '../Link/Link'
export default {
  name: 'ListItem',
  props: [ 'data', 'active', 'route' ],
  component:{
    Link
  },
  methods: {
    showProjects() {
      console.log('showProjects');
    }
  }
}
</script>

<style lang="scss">
  .list-item {
    color: #208EFE;
    font-weight: 600;
    font-size: 0.775rem;
    list-style: none;
    transition: 250ms;
    border-radius: 5px;
    margin-bottom: 4px;
    padding: 5px 20px;

    &:first-of-type,
    &:hover {
      background-color: #D7EBFF;
    }
  }
</style>
