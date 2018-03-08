<template lang="html">
  <!-- <li class=m"> -->
    <router-link class="list-item" :class="route" v-on:click.native="showPlaybooks(data['.key'])" :to="{ name: route, params: {id: data['.key']} }">
      {{data.name}}
      <!-- {{route}} -->
    </router-link>
  <!-- </li> -->
</template>

<script>
import Link from '../Link/Link'
export default {
  name: 'ListItem',
  props: [ 'data', 'active', 'route', 'color' ],
  component:{
    Link
  },
  methods: {
    showPlaybooks(data) {
      console.log('showProjects', data);
      this.$emit('showPlaybooks', data)
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
    width: 100%;
    padding: 5px 20px;

    &:first-of-type,
    &:hover,
    &:active {
      background-color: #D7EBFF;
    }

    &.playbook {
      color: #B8E986;

      &:first-of-type,
      &:hover,
      &:active {
        background-color: #E5FFCB;
      }
    }
  }
</style>
