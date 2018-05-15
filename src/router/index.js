import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Dashboard from '../components/Dashboard/Dashboard'
import Teams from '../components/Teams'
import Team from '../components/Team/Team'
import Playbooks from '../components/Playbooks/Playbooks'
import PlaybooksPage from '../components/Playbooks/Playbooks.page.vue'
import ChecklistsPage from '../components/Checklists/Checklists.page.vue'
import Profile from '../components/Profile/Profile'
import { store } from '../store.js'

import firebase from 'firebase'
import { bus } from '../main'

import Auth from '../components/Auth'
import AuthSucces from '../components/AuthSucces'

Vue.use(Router)

function firestore () {
  return {
    users: firebase.collection('users')
  }
}

const checkUser = function (to, from, next) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('router => ', user)

      // console.log(store.state.user)
      // store.dispatch('setUser', user)
      // console.log(store.state)
      // this.user = firebase.auth().currentUser
      store.commit('setUser', user)

      // var localId = localStorage.getItem('userId')

      if (localStorage.getItem('userId') === null) {
        localStorage.setItem('userId', user.uid)
        firestore.users.add({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: email,
          status: 'online'
        })
      }

      bus.$emit('userLoggedIn', user)
      next()
    } else {
      next({
        path: '/auth'
      })
    }
  })
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/succes',
      name: 'Succes',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        checkUser(to, from, next)
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        checkUser(to, from, next)
      }
    },
    {
      path: '/playbooks',
      name: 'playbooks',
      component: PlaybooksPage,
      beforeEnter: (to, from, next) => {
        checkUser(to, from, next)
      }
    },
    {
      path: '/playbooks/:id',
      name: 'playbook',
      component: Playbooks,
      beforeEnter: (to, from, next) => {
        checkUser(to, from, next)
      }
    },
    {
      path: '/checklists',
      name: 'checklists',
      component: ChecklistsPage,
      beforeEnter: (to, from, next) => {
        checkUser(to, from, next)
      }
    },
    {
      path: '/checklists/:id',
      name: 'checklist',
      component: Playbooks,
      beforeEnter: (to, from, next) => {
        checkUser(to, from, next)
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        checkUser(to, from, next)
      }
    }
  ]
})
