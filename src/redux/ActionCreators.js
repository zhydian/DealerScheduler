import * as ActionTypes from "./ActionTypes";
import firebase from '../Firebase/firebase'

const db = firebase.firestore()

export const getUsers = () => (dispatch) => {
    firebase.firestore().collection("Users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var user = {
                id:doc.id,
                ...doc.data()
            }
            dispatch(addUser(user))
        });
    });

}

export const addUser = (payload) => ({
    type: ActionTypes.ADD_USER,
    payload: payload
});

