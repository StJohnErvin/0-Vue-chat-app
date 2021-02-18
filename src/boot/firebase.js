// Firebase App (the core Firebase SDK) is always required and must be listed first
import  firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// PUT YOUR OWN FIREBASE CONFIGURATION HERE
var firebaseConfig = {
    apiKey: "AIzaSyDgEA5WbF3q7h8-qten6J4uFuoFgGym960",
    authDomain: "atxchat-2acab.firebaseapp.com",
    projectId: "atxchat-2acab",
    storageBucket: "atxchat-2acab.appspot.com",
    messagingSenderId: "199761085136",
    appId: "1:199761085136:web:367e6b6a97f534c41014d5"
  };
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }
