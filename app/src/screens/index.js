import { Login } from "./Login";
import { Signup } from "./Signup";
import { Home } from "./Home";
import { About } from "./About";
import { Contact } from "./Contact";
import { AuthLoading } from "./AuthLoading";
// import { firebaseConfig } from "../config";
// import * as firebase from "firebase";
// import "firebase/auth";
// import "firebase/firestore";

/**
|--------------------------------------------------
| Main Screens Hub
|--------------------------------------------------
*/

// firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
// const db = firebase.firestore();
// const settings = { /* your settings... */ timestampsInSnapshots: true };
// db.settings(settings);

export { Login, Signup, Home, AuthLoading, About, Contact };
