<template lang="html">
  <div class="sidebar">
    <h1>Sidebar</h1>
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

<style lang="css">
  .sidebar {
    background-color: #fff;
    color: #000;
    width: 30%;
    min-height: calc(100vh - 64px);
    border-right: 2px solid #cecece;
    padding: 20px;
  }
</style>
