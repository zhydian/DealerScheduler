import firebase from 'firebase/app';
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyBuDMsinfRZLxYa2jfovhub4nn3dE9mI78",
    authDomain: "dealerscheduler.firebaseapp.com",
    databaseURL: "https://dealerscheduler.firebaseio.com",
    projectId: "dealerscheduler",
    storageBucket: "",
    messagingSenderId: "1044169368478",
    appId: "1:1044169368478:web:6aaea7b58237067d"
  };


firebase.initializeApp(config);
firebase.firestore().enablePersistence()
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

export default firebase;