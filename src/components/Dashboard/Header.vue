<template lang="html">
  <div class="page-header">
    <h2 class="title">Dashboard</h2>
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
    margin: 0;
    width: 100%;
    background-color: #fff;

    .title {
      font-weight: 700;
      margin: 0;
    }
  }
</style>
