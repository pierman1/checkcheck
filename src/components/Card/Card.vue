<template lang="html">
  <div class="card">
    <router-link class="link" :to="{ name: name, params: {id: data['.key']} }">
      <div class="card-header">
        <h3 class="card-title">{{ data.name }}</h3>
      </div>
      <div class="card-body">
        <ul>
          <li>
            Contains 10 checklists
          </li>
        </ul>
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
    border: 1px solid #EAEAEA;
    border-radius: 3px;
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
        border-bottom: 1px solid #EAEAEA;
      }
    }

    .card-body {
      padding: 10px;
    }

    ul {
      list-style: none;
      padding: 0;
      font-size: 0.75em;
    }
  }
</style>
