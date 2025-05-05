// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb7TB-u_jT5LgPXJMBrHMhSR5KDmUE0kM",
  authDomain: "chattingapp-5b955.firebaseapp.com",
  projectId: "chattingapp-5b955",
  storageBucket: "chattingapp-5b955.appspot.com",
  messagingSenderId: "313094812198",
  appId: "1:313094812198:web:56e7a11f71ba047871ece7",
  measurementId: "G-TPSS973HP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);


export default database