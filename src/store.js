import Vue from 'vue'
import Vuex from 'vuex'
import {db} from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    all: {},
    user: {},
    playbooks: {},
    checklists: {},
    sidebarStatus: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    SET_PLAYOOKS (state, { playbooks }) {
      const data = playbooks.data()
      state.all = {
      ...state.all,
        [playbook.id]: {
          playbook: data
        }
      }
      state.playbooks.push( playbooks.id )
    }
  },
  actions: {
    async get({ commit, rootState }) {
      console.log('GETTTTTT');
      let playbooksRef = rootState.db.collection('playbooks')
      let playbooks = await playbooksRef.get()
      playbooks.forEach(playbook => commit('SET_PLAYBOOKS', { playbooks }))
    }
  },
  getters: {
    getUser: state => state.user,
    getSidebarStatus: state => state.sidebarStatus
  },
});
