import { firebase } from "@firebase/app";
import "@firebase/firestore";
import firebaseui from 'firebaseui';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDoHhZtZbFYlJ_DuVK05_SMZaeM_QTqHCk",
  authDomain: "checkcheck-4e2b0.firebaseapp.com",
  databaseURL: "https://checkcheck-4e2b0.firebaseio.com",
  projectId: "checkcheck-4e2b0",
  storageBucket: "checkcheck-4e2b0.appspot.com",
  messagingSenderId: "957059002835"
});

export const db = firebaseApp.firestore();
