import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import { Provider } from 'react-redux'
// import * as firebase from 'firebase/app'
// import 'firebase/auth'
// import * as firestore from 'firebase/compat/firestore' // <- needed if using firestore
// // import 'firebase/functions' // <- needed if using httpsCallable
// import { createStore, combineReducers, compose } from 'redux'
// import {
//   ReactReduxFirebaseProvider,
//   firebaseReducer
// } from 'react-redux-firebase'
// import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

// const fbConfig = {
//   apiKey: "AIzaSyBhqGMjXIBvUD0cCzjgWgbIlMQg_7K-Inw",
//   authDomain: "chat-in-75370.firebaseapp.com",
//   projectId: "chat-in-75370",
//   storageBucket: "chat-in-75370.appspot.com",
//   messagingSenderId: "735805518063",
//   appId: "1:735805518063:web:1155f3598081b750f76b1a"
// };

// react-redux-firebase config
// const rrfConfig = {
//   userProfile: 'users',
//   useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
// }

// Initialize firebase instance
// firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
// firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
// const rootReducer = combineReducers({
//   firebase: firebaseReducer,
//   firestore: firestoreReducer // <- needed if using firestore
// })

// Create store with reducers and initial state
// const initialState = {}
// const store = createStore(rootReducer, initialState)

// const rrfProps = {
//   firebase,
//   config: rrfConfig,
//   dispatch: store.dispatch,
//   createFirestoreInstance // <- needed if using firestore
// }

// import { createStore, applyMiddleware, compose } from 'redux';
// import rootReducer from './store/reducers/rootReducer';
// import { Provider } from 'react-redux';
// import firebase from "firebase/compat/app"
// import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
// import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore';
// import thunk from 'redux-thunk';
// import firebaseConfig from './config/firebase';

// const store = createStore(rootReducer, compose(
//   applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })), reduxFirestore(firebaseConfig)
// ))

// const rrfProps = {
//   firebase,
//   config:firebaseConfig,
//   dispatch: store.dispatch,
//   createFirestoreInstance
// }

ReactDOM.render(
  // <Provider store={store}>
  //   <ReactReduxFirebaseProvider {...rrfProps}></ReactReduxFirebaseProvider>
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>
  // </Provider>

  <React.StrictMode>
  <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
