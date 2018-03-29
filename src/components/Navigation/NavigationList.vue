<template lang="html">
  <div class="navigation-list" v-bind:class="{'visible': visible }">
    <router-link
      v-for="item in data"
      v-on:click.native="linkClicked(item, name)"
      :to="{ name: '', params: {} }"
      >
      {{item.name}}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavigationList',
  props: ['data', 'name', 'visible'],
  methods: {
    linkClicked (item, name) {
      this.$emit('linkClicked', item, name)
    }
  }
}
</script>

<style lang="scss">
  .navigation-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    opacity: 0;

    a {
      color: #000;
      background-color: #C7E4EF;
      padding: 4px 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      font-weight: 100;
      font-size: 0.875em;
      text-decoration: none;
    }

    &.visible {
      opacity: 1;
    }
  }
</style>
