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
    // border: 1px solid #cacaca;
    width: 90%;
    max-width: 350px;
    min-height: 400px;
    text-align: center;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05);

    p {
      margin: 30px 0 0 30px;
      font-weight: 700;
    }
  }
</style>
