<template lang="html">
  <div class="profile-picture-container" v-if="user.photoURL">
    <router-link :to="{ name: 'profile' }">
      <img :src="user.photoURL">
    </router-link>
  </div>
</template>

<script>
import { bus } from '../../main'
export default {
  name: 'ProfilePicture',
  data() {
    return {
      user: {
        photoUrl: ''
      }
    }
  },
  created() {
    bus.$on('userLoggedIn', (data) => {
      this.user = data
    })
  }
}
</script>

<style scoped lang="scss">
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
</style>
