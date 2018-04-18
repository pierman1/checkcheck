<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-6">
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
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Activeusers',
  data() {
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {}
    }
  },
  created() {
    this.user = firebase.auth().currentUser
    console.log(this.user.displayName);
    console.log(this.user.displayName);
    console.log(this.user.displayName);
    console.log(this.user.displayName);
    console.log(this.user.displayName);
    console.log(this.user.displayName);
    console.log(this.user.displayName);
    if(this.user) {
      this.name = this.user.displayName
      this.email = this.user.email
      this.photo = this.user.photoUrl
      this.userId = this.user.uid

      firebase.ref('users/' + userId).set({
        name: this.name = this.user.displayName
      })
    }
  },
  methods: {
    logOut() {
      firebase.auth().signOut()
    }
  }
}
</script>

<style lang="css">
</style>
