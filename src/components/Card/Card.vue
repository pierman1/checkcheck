<template lang="html">
  <div class="card">
    <router-link class="link" :to="{ name: name, params: {id: data['.key']} }">
      <div class="card-header">
        <h3 class="card-title">{{ data.name }}</h3>
      </div>
      <div class="card-body">
        {{data}}
        Contains 10 checklists
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: [ 'data', 'name' ]
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
    height: 150px;

    .link {
      text-decoration: none;
    }

    .card-header {
      width: 100%;
  font-size: 12px;
      .card-title {
        padding: 10px;
        font-size: 12px;
        font-weight: 500;
        opacity: 0.5;
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
