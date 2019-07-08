import * as ActionTypes from "./ActionTypes";
import firebase from '../Firebase/firebase'

const db = firebase.firestore()
var currentSchedule=null; 

export const getShifts = () => (dispatch) => {
    firebase.firestore().collection("ShiftTimes").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var shifts = {
                id:doc.id,
                ...doc.data()
            }
            dispatch(addShiftTimes(shifts))
        });
    });
}

export const getUsers = () => (dispatch) => {
    firebase.firestore().collection("Users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var user = {
                id:doc.id,
                ...doc.data()
            }
            dispatch(addUser(user))
        });
    });

const ShiftTimes = [
    [14,21,'#FFFF00',0],//2-9
    [12,21,'#E26B0A',0],//12-9
    [11,21,'#CCC0DA',0],//11-9
    [11,18,'#FFC000',0],//11-6
    [12,19,'#E26B0A',0],//12-7
    [14,21,'#FF0000',0],//2-9
    [14,19,'#E26B0A',0],//2-7
    [16,0,'#76933C',0],//4-12
    [21,4,'#FFFF00',0],//9-4
    [18,3,'#28FB05',0],//6-3
    [18,2,'#660033',0],//6-2
    [19,2,'#E26B0A',0],//7-2
    [18,1,'#D9D9D9',0],//6-1
]


ShiftTimes.map(shift=>{
    var docRef = db.collection("ShiftTimes").doc()
    var start = new Date()
    start.setHours(shift[0])
    var end = new Date()
    end.setHours(shift[1])
    var Shift = {
        StartTime:firebase.firestore.Timestamp.fromDate(start),
        EndTime:firebase.firestore.Timestamp.fromDate(end),
        BackColor:shift[2],
        type:shift[3]
    }
    /* docRef.set(Shift)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });  */
})

const users = [{ last:'Phan', first:'Jarreyah'},
{ last:'Mozer', first:'Matt'},
{ last:'Tran', first:'Randy'},
{ last:'Timm', first:'Tamara'},
{ last:'Guillen', first:'Jenneil'},
{ last:'Larson', first:'Cindy'},
{ last:'Sevavapy', first:'Ann'},
{ last:'Goehner', first:'Rami'},
{ last:'Westgard', first:'Nancy'},
{ last:'Luu', first:'Vy'},
{ last:'Le', first:'Jenny'},
{ last:'Ha', first:'Kim'},
{ last:'Abel', first:'Caitlin'},
{ last:'Jouyphanh', first:'Nantha(Anitha)'},
{ last:'Cobb', first:'Austin'},
{ last:'Vuth', first:'Vannara'},
{ last:'Goehner', first:'Christina'},
{ last:'Craig', first:'Jesse'},
{ last:'Shanks', first:'Modesti'},
{ last:'Sok', first:'Paul'},
{ last:'Phan', first:'Hau'},
{ last:'La Fauci', first:'Russ'},
{ last:'Mozer', first:'Mathew'},
{ last:'Cortez', first:'Jennifer'}]

users.map(user=>{
   /* var docRef = db.collection("Users").doc()
    docRef.set({name:{...user}})
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });*/
})
}

export const getSchedulesOld = (StartDate,EndDate) => (dispatch) => {
    console.log("getting Schedules", StartDate)
    dispatch({type: ActionTypes.CLEAR_SCHEDULES})
    firebase.firestore().collection("ScheduledDays").where('StartTime','>=',StartDate).where('StartTime','<=',EndDate).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var schedule = {
                id:doc.id,
                ...doc.data()
            }
            dispatch(addSchedule(schedule))
        });
    });
}

export const getSchedules = (StartDate,EndDate) => (dispatch) => {
    StartDate = resetTime(StartDate,0)
    EndDate = resetTime(EndDate,23)
    console.log("Start",StartDate,"End",EndDate)
    
    dispatch({type: ActionTypes.CLEAR_SCHEDULES})
    if(currentSchedule) currentSchedule()
    currentSchedule = firebase.firestore().collection("ScheduledDays").where('StartTime','>=',StartDate).where('StartTime','<=',EndDate).onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            var schedule = {
                id:change.doc.id,
                ...change.doc.data()
            }
            if (change.type === "added") {
                dispatch(addSchedule(schedule))
            }
            if (change.type === "modified") {
                dispatch(updateSchedule(schedule))
            }
            if (change.type === "removed") {
                console.log("trying to remove")
                dispatch(removeSchedule(schedule))
            }
        });
    });
}

export const setSchedule = (StartDate,EndDate,UserId,docId) => (dispatch) => {
    var docRef = db.collection("ScheduledDays").doc()
    if(docId) docRef = db.collection("ScheduledDays").doc(docId)
    docRef.set({
        UserId: UserId,
        StartTime: StartDate,
        EndTime:EndDate
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export const setLabel = (theDate,Label,UserId,docId) => (dispatch) => {
    
    var docRef = db.collection("ScheduledDays").doc()
    if(docId) docRef = db.collection("ScheduledDays").doc(docId)
    docRef.set({
        UserId: UserId,
        StartTime: theDate,
        Label:Label,
        type:1
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export const deleteSchedule = (docId) => (dispatch) => {
    console.log("delete",docId)
    var docRef = db.collection("ScheduledDays").doc(docId)
    docRef.delete()
}

export const setDates = (StartDate,EndDate) => (dispatch) => dispatch({type: ActionTypes.SET_DATES,payload:{StartDate:StartDate,EndDate:EndDate}})

export const addUser = (payload) => ({
    type: ActionTypes.ADD_USER,
    payload: payload
});

export const addSchedule = (payload) => ({
    type: ActionTypes.ADD_SCHEDULE,
    payload: payload
});

export const updateSchedule = (payload) => ({
    type: ActionTypes.UPDATE_SCHEDULE,
    payload: payload
});

export const removeSchedule = (payload) => ({
    type: ActionTypes.REMOVE_SCHEDULE,
    payload: payload
});

export const addShiftTimes = (payload) => ({
    type: ActionTypes.ADD_SHIFTTIMES,
    payload: payload
});


function resetTime(time,setTo){
    time.setMinutes(0)
    time.setSeconds(0)
    time.setMilliseconds(0)
    time.setHours(setTo)
return(time)
}