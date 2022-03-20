import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6h5Pdt1HWIFcPWKC_HPpY4QCbg7uJJwE",
  authDomain: "react-ecommerce-3d920.firebaseapp.com",
  projectId: "react-ecommerce-3d920",
  storageBucket: "react-ecommerce-3d920.appspot.com",
  messagingSenderId: "124117391488",
  appId: "1:124117391488:web:b29d181497eb0e7e646e65",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
