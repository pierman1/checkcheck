<template lang="html">
  <div class="card">
    <router-link class="link" :to="{ name: name, params: {id: data['.key']} }">
      <!-- {{data}} -->
      <div class="card-header">
        <span class="status"></span>
        <span class="status-text">Doing</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">{{ data.name }}</h3>
        <ul>
          <li>
            Created by: {{data.createdBy.name}}
          </li>
          <li>
            Contains 10 checklists
          </li>
          <li>Users: {{data.users.length}}</li>
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
    border-radius: 3px;
    margin-bottom: 10px;
    overflow: hidden;
    height: 150px;
    text-align: center;
    border: 2px solid #E9EFF4;
    outline: 3px solid transparent;
    transition: 250ms;
    width: calc(33% - 10px);
    position: relative;

    .link {
      text-decoration: none;
    }

    .status {
      width: 10px;
      height: 10px;
      background-color: #B8E986;
      border-radius: 50%;
      border: 1px solid #7ED321;
      display: inline-block;
      margin-right: 5px;
    }

    .status-text {
      display: inline-block;
      color: #323C47;
      opacity: .5;
    }

    .card-header {
      width: 100%;
      font-size: 12px;
      padding: 14px;
      text-align: left;
      .card-title {
        padding: 10px;
        font-size: 12px;
        font-weight: 500;
        margin: 0;
        color: #000;
        font-family: 'ProximaNova-Regular';
        font-size: 16px;
        color: #323C47;
        letter-spacing: 0.11px;
      }
    }

    .card-body {
      padding: 10px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
    }

    ul {
      list-style: none;
      padding: 0;
      li {
        opacity: 0.5;
        font-family: ProximaNova-Regular;
        font-size: 10px;
        color: #323C47;
        letter-spacing: 0.11px;
      }
    }

    &:hover,
    &.active {
      border: 2px solid #4DA1FF;
      outline: 3px solid #F2F8FF;
    }
  }
</style>
