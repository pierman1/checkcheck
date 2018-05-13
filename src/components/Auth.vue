<template lang="html">
  <div class="auth">
    <div class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486.733 486.733">
        <path d="M403.88 196.563h-9.484v-44.388c0-82.099-65.151-150.681-146.582-152.145-2.225-.04-6.671-.04-8.895 0C157.486 1.494 92.336 70.076 92.336 152.175v44.388h-9.485c-14.616 0-26.538 15.082-26.538 33.709v222.632c0 18.606 11.922 33.829 26.539 33.829H403.88c14.616 0 26.539-15.223 26.539-33.829V230.272c0-18.626-11.922-33.709-26.539-33.709zM273.442 341.362v67.271c0 7.703-6.449 14.222-14.158 14.222H227.45c-7.71 0-14.159-6.519-14.159-14.222v-67.271c-7.477-7.36-11.83-17.537-11.83-28.795 0-21.334 16.491-39.666 37.459-40.513 2.222-.09 6.673-.09 8.895 0 20.968.847 37.459 19.179 37.459 40.513-.002 11.258-4.355 21.435-11.832 28.795zm58.444-144.799H154.847v-44.388c0-48.905 39.744-89.342 88.519-89.342 48.775 0 88.521 40.437 88.521 89.342v44.388z"/>
      </svg>
    </div>
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
@import '../assets/global.scss';
  .auth {
    // border: 1px solid #cacaca;
    width: 90%;
    max-width: 350px;
    min-height: 230px;
    padding-bottom: 10px;
    text-align: center;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05);

    p {
      margin-top: 20px;
      font-weight: 700;
      font-size: 14px;
      padding-top: 20px;
      width: 100%;
    }

    .icon {
      width: 60px;
      height: 60px;
      border: 100%;
      margin: 0 auto;
      background-color: $light-purple;
      border-radius: 50%;
      position: relative;
      margin-top: 20px;
      svg {
        width: 25px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        fill: $purple;
      }
    }

    ul {
      list-style: none;
      padding: 0px 20px;
      li {
        margin-bottom: 1em;
      }
    }

    button {
      @extend .btn-purple-border;

      img {
        width: 15px;
        display: none;
      }
      .firebaseui-idp-text {
        color: $purple;
        transition: .2s;
      }

      &[data-provider-id="google.com"] {
        background-color: $purple;

        .firebaseui-idp-text {
          color: #fff;
        }
      }


      .firebaseui-idp-text-short {
        display: none;
      }

      &:hover {
        .firebaseui-idp-text {
          color: #fff;
        }
      }

    }
  }
</style>
