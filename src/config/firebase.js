// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA7E_BO0GewSGoGU3X7OABw_o3dsn4yi8",
  authDomain: "proyek-e7d02.firebaseapp.com",
  databaseURL: "https://proyek-e7d02-default-rtdb.firebaseio.com",
  projectId: "proyek-e7d02",
  storageBucket: "proyek-e7d02.appspot.com",
  messagingSenderId: "615118665553",
  appId: "1:615118665553:web:c8c588122f4e70a6ae4570"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fire=getFirestore(app);