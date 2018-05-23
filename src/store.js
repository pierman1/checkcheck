import Vue from 'vue'
import Vuex from 'vuex'
// import { db } from 'firebase'
import 'babel-polyfill'

import Firebase from 'Firebase'
import 'Firebase/firestore'
import users from './users'
import playbooks from './playbooks'
import checklists from './checklists'
import tasks from './tasks'

Vue.use(Vuex)

const state = {
  db: Firebase.firestore()
}

export default new Vuex.Store({
  state,
  modules: {
    users,
    playbooks,
    checklists,
    tasks
  }
})

// export const store = new Vuex.Store({
//   state: {
//     all: {},
//     user: {},
//     playbooks: {},
//     checklists: {},
//     sidebarStatus: false,
//     db: Firebase.firestore()
//   },
//   mutations: {
//     setUser (state, user) {
//       state.user = user
//     },
//     SET_PLAYOOKS (state, { playbooks }) {
//       const data = playbooks.data()
//       state.all = {
//         ...state.all,
//         [playbook.id]: {
//           playbook: data
//         }
//       }
//       state.playbooks.push(playbooks.id)
//     }
//   },
//   actions: {
//     async get ({ commit, rootState }) {
//       let playbooksRef = rootState.db.collection('playbooks')
//       let playbooks = await playbooksRef.get()
//       playbooks.forEach(playbook => commit('SET_PLAYBOOKS', { playbooks }))
//     }
//   },
//   getters: {
//     getUser: state => state.user,
//     getSidebarStatus: state => state.sidebarStatus
//   }
// })
