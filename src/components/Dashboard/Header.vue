<template lang="html">
  <div class="page-header">
    <h2>Dashboard</h2>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    showteam: function() {
      console.log('showTeam!!!!');
    }
  }
}
</script>

<style scoped lang="scss">
  .page-header {
    padding: 0 20px;
    width: 100%;
    background-color: #fff;
  }
</style>
