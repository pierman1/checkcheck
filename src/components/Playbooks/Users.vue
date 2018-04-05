<template lang="html">
  <div class="users">
    Users: {{userIds}}{{users}}
  </div>
</template>

<script>
import { db } from '../../firebase'
export default {
  name: 'Users',
  props: ['userIds'],
  data () {
    return {
      users: []
    }
  },
  firestore () {
    return {
      users: db.collection('users')
    }
  }
}
</script>

<style scoped lang="scss">
  .users {

  }
</style>
