import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Dashboard from '../components/Dashboard/Dashboard'
import Teams from '../components/Teams'
import Team from '../components/Team/Team'
import PlaybooksSinglePage from '../components/Playbooks/PlaybooksSingle.page.vue'
import PlaybooksPage from '../components/Playbooks/Playbooks.page.vue'
import ChecklistsPage from '../components/Checklists/Checklists.page.vue'
import Profile from '../components/Profile/Profile'

import Auth from '../components/Auth'
import AuthSucces from '../components/AuthSucces'

import firebase from 'firebase'
import { db } from '../firebase'
import { store } from '../store.js'
import { bus } from '../main'

Vue.use(Router)

function firestore () {
  return {
    users: firebase.collection('users')
  }
}

const checkUser = function (to, from, next) {
  firebase.auth().onAuthStateChanged(function (user) {
    var key = firebase.auth().currentUser.uid
    if (user) {
      store.commit('setUser', user)
      var localId = localStorage.getItem('userId')

      // if (localStorage.getItem('userId') === null) {
      //   localStorage.setItem('userId', user.uid)
        db
          .collection('users')
          .doc(key)
          .set({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            status: 'online'
          })
      // }

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
      component: PlaybooksSinglePage,
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
      component: PlaybooksSinglePage,
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
