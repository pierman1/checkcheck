<template lang="html">
  <div class="main">
    <h1>Main Container</h1>
    <p>Welkom bij Checkcheck, dé checkapp</p>
  </div>
</template>

<script>
export default {
  name: 'Main',
  methods: {
    showteam: function() {
      console.log('showTeam!!!!');
    }
  }
}
</script>

<style lang="scss">
  .main {
    padding: 0 40px;
    margin-top: 80px;
  }
</style>
