<template lang="html">
  <div class="profile">

    <h1>Profile</h1>
    <button @click="logOut" name="button">Log out</button>
    <hr>
    <div class="profile-picture-container">
      <img :src="photo" alt="">
    </div>

    <ul>
      <li>{{name}}</li>
      <li>{{email}}</li>
      <li>{{userId}}</li>
      <hr>
      <!-- <pre>{{user}}</pre> -->
    </ul>

  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Profile',
  data() {
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {}
    }
  },
  // firestore() {
  //   return {
  //     users: db.collection('users')
  //   }
  // },
  created() {
    this.user = firebase.auth().currentUser
    console.log(this.user);
    if(this.user) {
      this.name = this.user.displayName
      this.email = this.user.email
      this.photo = this.user.photoURL
      this.userId = this.user.uid
    }
  },
  methods: {
    logOut() {
      firebase.auth().signOut()
    }
  }
}
</script>

<style lang="scss">
  .profile {
    background-color: #fff;
    margin: 20px;
    padding: 20px;
    width: 100%;

    h1 {
      margin: 0;
    }

    .profile-picture-container {
      width: 200px;

      img {
        width: 100%;
        // border: 2px solid
      }
    }
  }
</style>
