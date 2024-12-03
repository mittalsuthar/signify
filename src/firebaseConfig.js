// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyCIdrbxIRa3PPgUvX2gYDAPesiES-lFgck",
    authDomain: "signify-4c5e7.firebaseapp.com",
    projectId: "signify-4c5e7",
    storageBucket: "signify-4c5e7.firebasestorage.app",
    messagingSenderId: "592934792884",
    appId: "1:592934792884:web:0ce9dac4af0ce4ed91f1e1"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };














