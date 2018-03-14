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


import firebase from 'firebase'
import { bus } from '../main'

import Auth from '../components/Auth'
import AuthSuccess from '../components/AuthSuccess'

Vue.use(Router)

function firestore() {
  return {
    users: firebase.collection('users')
  }
}

const checkUser = function(to, from, next) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      bus.$emit('userLoggedIn', user)
      next()
    } else {
      next({
        path: '/auth'
      })
    }
  })
}

// const getProfile = function(to, from, next) {
//   return {
//     joe: 'joe'
//   }
// }

export default new Router({
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
      path: '/success',
      name: 'Succes',
      component: AuthSuccess,
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
      path: '/teams',
      name: 'Teams',
      beforeEnter: (to, from, next) => {
        checkUser(to, from, next)
      },
      component: Teams
    },
    {
      path: '/teams/:id',
      name: 'team',
      component: Team,
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
