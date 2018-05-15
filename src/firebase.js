import { firebase } from '@firebase/app'
import '@firebase/firestore'
import firebaseui from 'firebaseui'

const firebaseApp = firebase.initializeApp({
  // apiKey: 'AIzaSyDoHhZtZbFYlJ_DuVK05_SMZaeM_QTqHCk',
  // authDomain: 'checkcheck-4e2b0.firebaseapp.com',
  // databaseURL: 'https://checkcheck-4e2b0.firebaseio.com',
  // projectId: 'checkcheck-4e2b0',
  // storageBucket: 'checkcheck-4e2b0.appspot.com',
  // messagingSenderId: '957059002835'
  apiKey: 'AIzaSyC1FOFFX_Kzn6Hk3wBxkn6GxKOYl2SF3ck',
  authDomain: 'checkcheck2-92a91.firebaseapp.com',
  databaseURL: 'https://checkcheck2-92a91.firebaseio.com',
  projectId: 'checkcheck2-92a91',
  storageBucket: 'checkcheck-4e2b0.appspot.com',
  messagingSenderId: '393626372189'
})

export const db = firebaseApp.firestore()
