<template lang="html">
  <nav class="nav">
    <button type="button" name="button" @click="logOut">
      <i class="glyphicon glyphicon-log-out"></i>
    </button>
  </nav>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Logout',
  methods: {
    logOut() {
      firebase.auth().signOut()
    }
  }
}
</script>

<style lang="css">
</style>
