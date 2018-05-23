<template lang="html">
  <div class="success">
    <div class="container">
      <h1>Signup succeeded</h1>
      <button class="btn" @click="logOut" name="button">Log out</button>
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
</template>

<script>
import { db } from '../firebase'
import firebase from 'firebase'
import {mapMutations} from 'vuex'
import {mapState} from 'vuex'

export default {
  name: 'AuthSucces',
  data() {
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {},
      localId: ''
    }
  },
  firestore () {
    return {
      users: db.collection('users')
    }
  },
  methods: {
    logOut() {
      firebase.auth().signOut()
    }
  },
  created() {
    this.user = firebase.auth().currentUser

    if(this.user) {
      this.name = this.user.displayName
      this.email = this.user.email
      this.photo = this.user.photoUrl
      this.userId = this.user.uid

      // this.$store.dispatch('users/addUser', {
      //   displayName: this.user.displayName,
      //   email : this.user.email,
      //   photo : this.user.photoUrl,
      //   userId : this.user.uid
      // })

      // this.$store.commit('setUser', this.user)

      // var localId : localStorage.getItem('userId')

      // console.log('loclas: ', localStorage.getItem('userId'))

      // if (localStorage.getItem('userId') === null) {
      //   localStorage.setItem('userId', this.user.uid)
      //   this.$firestore.users.add({
      //     uid: this.user.uid,
      //     displayName: this.user.displayName,
      //     photoURL: this.user.photoURL,
      //     email: this.email,
      //     status: 'online'
      //   })
      // }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/global.scss';
  .success {
    width: 100%;
    margin-top: 30px;

    .container {
      margin-top: 30px;
      background-color: #fff;
    }

    .btn {
      @extend .btn-purple
    }
  }
</style>
