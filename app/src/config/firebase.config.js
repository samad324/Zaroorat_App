import firebase from "firebase";
import app from "firebase/app";
import "firebase/firestore";

/**
|--------------------------------------------------
| Add your Firebase 🔥 Configurations here 📰
|--------------------------------------------------
*/

export const firebaseConfig = {
  apiKey: "AIzaSyDMNcY8_6jANfrztPQB6KqbubDpEObRHWc",
  authDomain: "nofikr-fyp.firebaseapp.com",
  databaseURL: "https://nofikr-fyp.firebaseio.com",
  projectId: "nofikr-fyp",
  storageBucket: "nofikr-fyp.appspot.com",
  messagingSenderId: "974050339093"
};

(() => app.initializeApp(firebaseConfig))();

export const db = firebase.firestore();
