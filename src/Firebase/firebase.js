import * as firebase from 'firebase';
import 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const configFB = {
    apiKey: "AIzaSyBuDMsinfRZLxYa2jfovhub4nn3dE9mI78",
    authDomain: "dealerscheduler.firebaseapp.com",
    databaseURL: "https://dealerscheduler.firebaseio.com",
    projectId: "dealerscheduler",
    storageBucket: "",
    messagingSenderId: "1044169368478",
    appId: "1:1044169368478:web:6aaea7b58237067d"
  };


 

if (!firebase.apps.length) {
    firebase.initializeApp(configFB);
}
firebase.firestore().enablePersistence({experimentalTabSynchronization:true})
.catch(function(err) {
    if (err.code == 'failed-precondition') {
        console.log("persistence can only be enabled in 1 tab")
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
    } else if (err.code == 'unimplemented') {
        console.log("Browser doesn't support persistance")
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
    }
});

export default firebase;