<template lang="html">
  <div class="active-users">
    <div class="cell">
      <h2 class="title">Joe</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActiveUsers'
}
</script>

<style scoped lang="scss">
@import '../../assets/global.scss';
  .active-users {
    .title {
      font-size: 12px;
    }

    .cell {
      margin-bottom: 5px;

    }
  }
</style>
