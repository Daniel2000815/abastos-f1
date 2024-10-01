// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiUG0xNe7SDoyQ6-4ZPp1NZ7TegaeRp-I",
  authDomain: "abastos-f1-c3a4c.firebaseapp.com",
  projectId: "abastos-f1-c3a4c",
  storageBucket: "abastos-f1-c3a4c.appspot.com",
  messagingSenderId: "144132786399",
  appId: "1:144132786399:web:8b57572109775808df016a",
  measurementId: "G-JNZ72DS048",
  databaseURL: "https://abastos-f1-c3a4c-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db};
