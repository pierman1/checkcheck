<template lang="html">
  <div class="success">

    <h1>Signup succeeded</h1>
    <button @click="logOut" name="button">Log out</button>
    <hr>
    <img :src="photo" alt="">

    <ul>
      <li>{{name}}</li>
      <li>{{email}}</li>
      <li>{{userId}}</li>
      <hr>
      <pre>{{user}}</pre>
    </ul>

  </div>
</template>

<script>
import firebase from 'firebase'
import {mapMutations} from 'vuex'
export default {
  name: 'AuthSucces',
  data() {
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {}
    }
  },
  firestore() {
    return {
      users: db.collection('users')
    }
  },
  created() {
    this.user = firebase.auth().currentUser
    this.$store.commit('setUser', 'piet')
    if(this.user) {
      this.name = this.user.displayName
      this.email = this.user.email
      this.photo = this.user.photoUrl
      this.userId = this.user.uid
    }
  },
  methods: {
    logOut() {
      firebase.auth().signOut()
    },
    ...mapMutations([
      'setUser'
    ])
  }
}
</script>

<style lang="scss">
  .success {
    width: 70%;
  }
</style>
