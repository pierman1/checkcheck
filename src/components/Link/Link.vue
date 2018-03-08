<template lang="html">

<router-link class="link" :to="{ name: '', params: {} }">
  {{text}}
</router-link>

</template>

<script>
export default {
  name: 'Link',
  props: [ 'route', 'text' ]
}
</script>

<style scoped lang="scss">
  a {
    color: initial;
    text-decoration: none;
  }
</style>
