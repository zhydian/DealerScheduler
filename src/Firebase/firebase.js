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
 

export default firebase;