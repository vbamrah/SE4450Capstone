// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArNYO6Va7leB7QothU-kqb7IpDdNinnsE",
  authDomain: "fitmoji-8505e.firebaseapp.com",
  projectId: "fitmoji-8505e",
  storageBucket: "fitmoji-8505e.appspot.com",
  messagingSenderId: "1030201356493",
  appId: "1:1030201356493:web:0ab3ff21b95039aedd3984",
  measurementId: "G-FDXQX2VLL1",
  databaseURL: "https://fitmoji-8505e-default-rtdb.firebaseio.com",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const database = getDatabase(app);

const auth = firebase.auth();
export { auth };