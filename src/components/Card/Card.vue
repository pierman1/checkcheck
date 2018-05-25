<template lang="html">
  <div class="card">
    <router-link class="link" :to="{ name: 'playbook', params: {id: data['.key']} }">
      <div class="card-header">
        <h3 class="card-title">{{ data.name }}</h3>
        <span class="status-text" v-if="!checkDueDate">active</span>
        <span class="status-text status-text--alert" v-else>Out of date</span>
      </div>
    </router-link>
      <div class="card-body">
        <ul>
          <li>
            Created by:
            <span>{{data.createdBy.displayName}}</span>
          </li>
          <li>
            Checklists:
              <span v-if="data.checklists">{{data.checklists.length}}</span>
              <span v-else>0 </span>
          </li>
          <li class="users">
            <!-- Users:
            <span>{{data.users.length}}</span> -->
            <img v-for="user in data.users" v-if="user.photoURL" :src="user.photoURL" alt="" :class="{online: user.status === 'online'}">
          </li>
          <li>
            Due date:
            <span>{{data.duedate}}</span>
          </li>
        </ul>
      </div>
      <div class="card-footer">
        <button class="button" type="button" name="button" @click="$modal.show('add-users-to-playbook', data)">Add users</button>
        <router-link class="button" :to="{ name: name, params: {id: data['.key']} }">Details</router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: [ 'data', 'name' ],
  methods: {
    // toDate(s) {
    //   s = s.split(/\D/g);
    //   return new Date(s[2],--s[1],s[0]);
    // }
  },
  computed : {
    checkDueDate() {

      var dateNow = new Date()
      var dataDate = new Date(this.data.duedate)

      if (dateNow > dataDate) {
        return true
      } else {
        return false
      }
    },
    checked () {
      console.log(this.data.checklists)
      return
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/global.scss';

  .card {
    margin-bottom: 10px;
    overflow: hidden;
    outline: 3px solid transparent;
    transition: 250ms;
    position: relative;
    background-color: #fff;
    width: 100%;

    @include tablet-up {
      width: calc(33.33% - 10px);
    }

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
      color: #fff;
      background-color: $green;
      border-radius: 5px;
      padding: 3px 6px;
      text-transform: uppercase;
      font-size: 8px;
      text-align: center;

      &.status-text--alert {
        background-color: $red;
        color: #fff;
      }
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
        // opacity: 0.5;
        font-size: 12px;
        color: #323C47;
        letter-spacing: 0.11px;

        img {
          display: inline;
          width: 30px;
          border-radius: 50%;
          transform: translateX(-5px);
          margin-right: 4px;
          border: 2px solid $purple;
          margin-right: -12px;

          &.online {
            border: 2px solid green;
          }

          &:first-of-type {

          }
        }

        span {
          color: $light-blue;
        }
      }
    }
  }

  .users {
    min-height: 40px;
    margin-top: 8px;
    margin-left: 5px;
    position: absolute;
    right: 20px;
    top: 50px;
  }

  .button {
    width: 50%;
    text-align: center;
    padding: 20px 0;
    transition: .2s background;

    &:hover {
      background-color: $light-purple;
    }
  }
</style>
