import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4vM6BrBSiJxHGF-fmr6UO-P1kAG6a1cc",
  authDomain: "ecommerce-react-app-98bf3.firebaseapp.com",
  projectId: "ecommerce-react-app-98bf3",
  storageBucket: "ecommerce-react-app-98bf3.appspot.com",
  messagingSenderId: "728233281012",
  appId: "1:728233281012:web:e78be951e71b40ca8825a1",
  measurementId: "G-HFG1ZVXMKJ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
