<template lang="html">
  <div class="header">

    <Logo></Logo>

    <div class="bottom">
      <ProfilePicture></ProfilePicture>
      <Logout></Logout>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../../firebase'
import { bus } from '../../main'

import Logo from './Logo'
import ProfilePicture from './ProfilePicture'
import Logout from './Logout'

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
  components: {
    Logo,
    ProfilePicture,
    Logout
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
    position: relative;
    z-index: 999;

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

  .bottom {
    position: fixed;
    bottom: 20px;
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
