<template lang="html">
  <div class="header">
    <div class="logo">
      <router-link :to="{ name: 'Dashboard' }">CC</router-link>
    </div>

    <div class="bottom">
      <div class="profile-picture-container" v-if="user.photoURL">
        <router-link :to="{ name: 'profile' }">
          <img :src="user.photoURL">
        </router-link>
      </div>
      <nav class="nav">
        <button type="button" name="button" @click="logOut">
          <i class="glyphicon glyphicon-log-out"></i>
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../firebase'
import { bus } from '../main'

export default {
  name: 'Header',
  data() {
    return {
      user: {
        photoUrl: ''
      }
    }
  },
  firestore() {
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
    bus.$on('userLoggedIn', (data) => {
      this.user = data
    })
  }
}
</script>

<style lang="scss">
  .header {
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    flex-direction: column;
    width: 80px;
    padding: 20px;

    .profile-picture-container {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 20px;

      img {
        width: 100%;
      }
    }
  }

  button {
    background-color: transparent;
    border: 0;
    text-align: center;

    &:focus {
      outline: 0;
    }

    i {
      color: #fff;
    }
  }

  .logo {
    text-align: center;
    background-color: #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    opacity: 0.5;
    a {
      color: #fff;
      text-decoration: none;
    }
  }

  .nav {
    text-align: center;
    ul {
      display: flex;
      flex-direction: row;

      li {
        list-style: none;
        margin-right: 10px;
        font-size: 0.875em;

        &:last-of-type {

        }
      }
    }
  }
</style>
