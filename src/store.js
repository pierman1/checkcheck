import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: 'pierre'
  },
  getters: {
    getUser: state => state.user
  },
  mutations: {
    setUser(state, username) {
      console.log(username);
      state.user = 'username';
    }
  }
});
