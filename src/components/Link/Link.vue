<template lang="html">

<router-link :to="{ name: '', params: {} }">
  {{text}}
</router-link>

</template>

<script>
export default {
  name: 'Link',
  props: [ 'route', 'text' ]
}
</script>

<style lang="css">
</style>
