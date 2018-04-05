<template lang="html">
    <router-link class="list-item" :class="route" v-on:click.native="showPlaybooks(data['.key'])" :to="{ name: route, params: {id: data['.key']} }">
      {{data.name}}
    </router-link>
</template>

<script>
import Link from '../Link/Link'
export default {
  name: 'ListItem',
  props: [ 'data', 'route', 'color' ],
  component:{
    Link
  },
  methods: {
    showPlaybooks(data) {
      console.log('homo');
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
    opacity: 0.5;
    padding: 5px 20px;
    text-decoration: none;

    &:first-of-type,
    &:hover,
    &:active {
      background-color: #D7EBFF;
      opacity: 1;
    }

    &.playbook {
      color: #000;

      &:first-of-type,
      &:hover,
      &:active {
        background-color: #E5FFCB;
        color: #B8E986;
      }
    }
  }
</style>
