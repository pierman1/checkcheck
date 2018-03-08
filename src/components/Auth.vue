<template lang="html">
  <div class="auth">
    <p>First you need to sign in!</p>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>
<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui'
import { config } from '../firebase';
export default {
  name: 'auth',
  mounted() {
    var uiConfig = {
      signInSuccessUrl: '/success',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
      };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}
</script>

<style lang="scss">
  .auth {
    p {
      margin: 30px 0 0 30px;
      font-weight: 700;
    }
  }
</style>
