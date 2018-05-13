<template lang="html">
  <div class="card">
    <router-link class="link" :to="{ name: name, params: {id: data['.key']} }">
      <div class="card-header">
        <h3 class="card-title">{{ data.name }}</h3>
        <span class="status-text">Doing</span>
      </div>
    </router-link>
      <div class="card-body">
        <ul>
          <li>
            Created by:
            <span>{{data.createdBy.name}}</span>
          </li>
          <li>
            Contains <span>10</span> checklists
          </li>
          <li>
            Users:
            <span>{{data.users.length}}</span>
          </li>
        </ul>
      </div>
      <div class="card-footer">
        <button type="button" name="button" @click="$modal.show('add-users-to-playbook')">Add users</button>
        <router-link :to="{ name: '', params: {} }">Details</router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: [ 'data', 'name' ]
}
</script>

<style lang="scss">
@import '../../assets/global.scss';

  .card {
    margin-bottom: 10px;
    overflow: hidden;
    margin-right: 10px;
    outline: 3px solid transparent;
    transition: 250ms;
    width: calc(20% - 10px);
    position: relative;
    background-color: #fff;

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
      color: $purple;
      opacity: .8;
      background-color: #fff;
      border-radius: 5px;
      padding: 3px 6px;
      text-transform: uppercase;
      font-size: 8px;
      width: 40px;
    }

    .card-header {
      width: 100%;
      font-size: 12px;
      padding: 14px;
      text-align: left;
      background-color: $purple;
      display: flex;
      justify-content: space-between;
      .card-title {
        font-size: 16px;
        font-weight: 500;
        margin: 0;
        color: #fff;
        font-family: 'ProximaNova-Regular';
        // font-size: 16px;
        font-weight: 100;
        letter-spacing: 0.11px;
      }
    }

    .card-body {
      padding: 10px;
      top: 50%;
      width: 100%;
    }

    .card-footer {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 20px 0;
      color: #cecece;
      a, button {
        font-size: 12px;
        text-decoration: none;
        color: #000;
        opacity: .8;
      }
    }

    ul {
      list-style: none;
      padding: 0;
      li {
        opacity: 0.5;
        font-family: ProximaNova-Regular;
        font-size: 10px;
        font-weight: 800;
        color: #323C47;
        letter-spacing: 0.11px;

        span {
          color: $light-blue;
        }
      }
    }

    &:hover,
    &.active {
      // border: 2px solid $purple;
      // outline: 3px solid #F2F8FF;
    }
  }
</style>
