// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ_L3c3EZ96P98246k5QMyuniEW68U3Z0",
  authDomain: "chatin-ea635.firebaseapp.com",
  projectId: "chatin-ea635",
  storageBucket: "chatin-ea635.appspot.com",
  messagingSenderId: "784170283393",
  appId: "1:784170283393:web:c522503e49f66858b3f880",
  storageBucket:"gs://chatin-ea635.appspot.com"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fire = getFirestore(app);
export {fire,app};