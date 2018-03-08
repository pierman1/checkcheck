<template lang="html">
  <div class="checklists-page">
    <h2 class="title">Checklists page</h2>
  </div>
</template>

<script>
export default {
  name: 'ChecklistsPage'
}
</script>

<style lang="scss">
  .checklists-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 40px;

    .title {
      font-weight: 700;
      margin: 0 0 30px 0;
    }
  }
</style>
