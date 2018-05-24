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

import sidebar from './sidebar'

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
    tasks,
    sidebar
  }
})
