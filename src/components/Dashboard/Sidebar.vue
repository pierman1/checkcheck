<template lang="html">
  <div class="sidebar">
    <teams></teams>
  </div>
</template>

<script>
import Teams from './Teams'
export default {
  name: 'Sidebar',
  components: {
    Teams
  }
}
</script>

<style lang="scss">
  .sidebar {
    background-color: #cecece;
    width: 25%;
    border-right: 2px solid #EAEAEA;
    padding: 0 20px;
  }
</style>
