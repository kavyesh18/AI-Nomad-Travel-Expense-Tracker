// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHbvOZUMI22-oaH1XPiJoEq1obJV44A_M",
  authDomain: "ai-nomad.firebaseapp.com",
  projectId: "ai-nomad",
  storageBucket: "ai-nomad.firebasestorage.app",
  messagingSenderId: "1092733306710",
  appId: "1:1092733306710:web:e67983d95f65e9494e38f7",
  measurementId: "G-338GD5TEN4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);