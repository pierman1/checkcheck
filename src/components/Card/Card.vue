<template lang="html">
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">{{ data.name }}</h3>
    </div>
    <div class="card-body">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: [ 'data' ]
}
</script>

<style lang="scss">
  .card {
    width: calc(33.333% - 5px);
    border: 1px solid #EAEAEA;
    // border-right: 1px solid #EAEAEA;
    // border-bottom: 1px solid #EAEAEA;
    border-radius: 3px;
    // box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05);
    margin-bottom: 10px;
    overflow: hidden;
    height: 100px;

    .card-header {
      width: 100%;

      .card-title {
        padding: 10px;
        font-size: 16px;
        font-weight: 700;
        margin: 0;
        color: #000;
        // background-color: #3D8DF7;
        border-bottom: 1px solid #EAEAEA;

      }
    }

    .card-body {
      padding: 10px;
    }
  }
</style>
