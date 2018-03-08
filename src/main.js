import Vue from 'vue';
import App from './App';
import VueFirestore from 'vue-firestore';
import router from './router'
import firebase from 'firebase'

// turns off the 'You are running Vue in development mode.' msg
Vue.config.productionTip = false;

Vue.use(VueFirestore);

export const bus = new Vue()

new Vue({
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/auth')
      }
    })
  },
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
