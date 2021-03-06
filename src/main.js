import Vue from 'vue'
import App from './App'
import VueFirestore from 'vue-firestore'
import router from './router'
import firebase from 'firebase'
import VueDraggable from 'vue-draggable'
import VModal from 'vue-js-modal'
import Notifications from 'vue-notification'
import UUID from 'vue-uuid'
import wysiwyg from "vue-wysiwyg";


Vue.use(wysiwyg, {});
Vue.use(UUID)
Vue.use(VueDraggable)
Vue.use(VModal)
Vue.use(Notifications)

import store from './store'
// turns off the 'You are running Vue in development mode.' msg
Vue.config.productionTip = false
Vue.use(VueFirestore)

export const bus = new Vue()

new Vue({
  store,
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$router.push('/succes')
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
