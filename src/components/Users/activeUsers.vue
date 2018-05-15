<template lang="html">
  <div class="active-users">
    <div class="user-cell" v-for="user in users">
      <div class="cell-header">
        <h4 class="name">{{user.displayName}}</h4>
        <span class="status">{{user.status}}</span>
      </div>
      <div class="cell-body">

      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../../firebase'
export default {
  name: 'activeUsers',
  firestore () {
    return {
      users: db.collection('users')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global.scss';
  .active-users {
    .user-cell {
      display: flex;
      padding: 5px;
      &:nth-child(odd) {
          background-color: $light-purple;
      }

      .cell-header {
        .name {
          font-size: 14px;
        }

        .status {
          font-size: 12px;
        }
      }

      .cell-body {

      }
    }
  }
</style>
