import * as ActionTypes from "./ActionTypes";
import firebase from '../Firebase/firebase'

const db = firebase.firestore()
var currentSchedule=null; 
var currentUsers = null;
var currentRequestOff = null;

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

export const getShiftLabels = () => (dispatch) => {
    firebase.firestore().collection("ShiftLabels").orderBy("order").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var shifts = {
                id:doc.id,
                ...doc.data()
            }
            dispatch(addShiftLabel(shifts))
        });
    });
}

export const getUsers = (StartDate,EndDate) => (dispatch) => {
        
    dispatch({type: ActionTypes.CLEAR_SCHEDULES})
    if(currentUsers) currentSchedule()
    currentUsers = firebase.firestore().collection("Users").orderBy("order","asc").limit(100).onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            var user = {
                id:change.doc.id,
                Availability:change.doc.data().availability?change.doc.data().availability:{},
                ...change.doc.data()
            }
            if (change.type === "added") {
                dispatch(addUser(user))
            }
            if (change.type === "modified") {
                dispatch(updateUser(user))
            }
            if (change.type === "removed") {
                console.log("trying to remove")
                dispatch(removeUser(user))
            }
        });
    });
}

export const getUsersOld = () => (dispatch) => {
    firebase.firestore().collection("Users").orderBy("order","asc").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var user = {
                id:doc.id,
                Availability:doc.data().availability?doc.data().availability:{},
                ...doc.data()
            }
            dispatch(addUser(user))
        });
    });

   
    

const ShiftTimes = [
    /*[14,21,'#FFFF00',0],//2-9
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
    */
   [18,4,'#D9D9D9',0],//6-1
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

const users = [
//Day Shift
{ last:'Rosas', first:'Rita',shift:'yotgjU3Z4S57z5YYOk99',order: 1},
{ last:'North', first:'Cynthia',shift:'yotgjU3Z4S57z5YYOk99',order:2 },
{ last:'Carosa', first:'Shelley',shift:'yotgjU3Z4S57z5YYOk99',order:3 },
{ last:'Kamminga', first:'Matt',shift:'yotgjU3Z4S57z5YYOk99',order:4 },
{ last:'Keating', first:'Matt',shift:'yotgjU3Z4S57z5YYOk99',order: 5},
{ last:'Bullard', first:'Trane',shift:'yotgjU3Z4S57z5YYOk99',order:6 },
{ last:'Guthrie', first:'Julie',shift:'yotgjU3Z4S57z5YYOk99',order:7 },
{ last:'Marten', first:'Brianna',shift:'yotgjU3Z4S57z5YYOk99',order:8 },
{ last:'Phorn-Feldon', first:'R',shift:'yotgjU3Z4S57z5YYOk99',order:9 },
{ last:'Penick', first:'DJ',shift:'yotgjU3Z4S57z5YYOk99',order:10 },
{ last:'Bullard', first:'Bryan',shift:'yotgjU3Z4S57z5YYOk99',order:11 },
{ last:'Soeum', first:'Pea',shift:'yotgjU3Z4S57z5YYOk99',order: 12},
{ last:'Hak', first:'Hef',shift:'yotgjU3Z4S57z5YYOk99',order:13 },
{ last:'Walker', first:'Peter',shift:'yotgjU3Z4S57z5YYOk99',order:14 },
{ last:'Lin',first:'Yuehua (Nikki)',shift:'yotgjU3Z4S57z5YYOk99',order: 15},
{ last:'Bennett', first:'Judy',shift:'yotgjU3Z4S57z5YYOk99',order: 16},
{ last:'McSwain', first:'Derek',shift:'yotgjU3Z4S57z5YYOk99',order: 17},
{ last:'Chea', first:'Sohpeap(Terry)',shift:'yotgjU3Z4S57z5YYOk99',order:18 },
{ last:'Still', first:'Adam',shift:'yotgjU3Z4S57z5YYOk99',order:19 },
{ last:'Le', first:'Thuy (Tisa)',shift:'yotgjU3Z4S57z5YYOk99',order:20 },
//Swing
{ last:'Meyer', first:'Tyson',shift:'Mw7G22pzWrWXE4E6ol4C',order:21},
{ last:'Tuitele', first:'Noi',shift:'Mw7G22pzWrWXE4E6ol4C',order:22},
{ last:'Tailleur', first:'Shane',shift:'Mw7G22pzWrWXE4E6ol4C',order:23},
{ last:'Ladson', first:'Thomas',shift:'Mw7G22pzWrWXE4E6ol4C',order:24},
{ last:'Piseno', first:'Brandy',shift:'Mw7G22pzWrWXE4E6ol4C',order:25},
{ last:'Little', first:'Marissa',shift:'Mw7G22pzWrWXE4E6ol4C',order:26},
{ last:'Muy', first:'Sovonn',shift:'Mw7G22pzWrWXE4E6ol4C',order:27},
{ last:'Muy', first:'Sam',shift:'Mw7G22pzWrWXE4E6ol4C',order:28},
{ last:'Graham', first:'Shantyl',shift:'Mw7G22pzWrWXE4E6ol4C',order:29},
{ last:'Brown', first:'Megan',shift:'Mw7G22pzWrWXE4E6ol4C',order:30},
{ last:'Khun', first:'Vichet',shift:'Mw7G22pzWrWXE4E6ol4C',order:31},
//On Call
{ last:'Okeefe', first:'Mary',shift:'yotgjU3Z4S57z5YYOk99',order:32},
{ last:'Chhao', first:'Sirith',shift:'yotgjU3Z4S57z5YYOk99',order:33},
{ last:'Cortez', first:'Jennifer',shift:'yotgjU3Z4S57z5YYOk99',order:34},
{ last:'Nguyen', first:'Thac',shift:'yotgjU3Z4S57z5YYOk99',order:35},
{ last:'Phan', first:'Jarreyah',shift:'rAlog2Kmb3HSeiR8TgGM',order:36},
{ last:'Mozer', first:'Mathew',shift:'rAlog2Kmb3HSeiR8TgGM',order:37},
{ last:'Tran', first:'Randy',shift:'rAlog2Kmb3HSeiR8TgGM',order:38},
{ last:'Timm', first:'Tamara',shift:'rAlog2Kmb3HSeiR8TgGM',order:39},
{ last:'Guillen', first:'Jenneil',shift:'rAlog2Kmb3HSeiR8TgGM',order:40},
{ last:'Larson', first:'Cindy',shift:'rAlog2Kmb3HSeiR8TgGM',order:41},
{ last:'Sevavapy', first:'Ann',shift:'rAlog2Kmb3HSeiR8TgGM',order:42},
{ last:'Goehner', first:'Rami',shift:'rAlog2Kmb3HSeiR8TgGM',order:43},
{ last:'Westgard', first:'Nancy',shift:'rAlog2Kmb3HSeiR8TgGM',order:44},
{ last:'Luu', first:'Vy',shift:'rAlog2Kmb3HSeiR8TgGM',order:45},
{ last:'Le', first:'Jenny',shift:'rAlog2Kmb3HSeiR8TgGM',order:46},
{ last:'Ha', first:'Kim',shift:'rAlog2Kmb3HSeiR8TgGM',order:47},
{ last:'Abel', first:'Caitlin',shift:'rAlog2Kmb3HSeiR8TgGM',order:48},
{ last:'Jouyphanh', first:'Nantha(Anitha)',shift:'rAlog2Kmb3HSeiR8TgGM',order:49},
{ last:'Cobb', first:'Austin',shift:'rAlog2Kmb3HSeiR8TgGM',order:50},
{ last:'Vuth', first:'Vannara',shift:'rAlog2Kmb3HSeiR8TgGM',order:51},
{ last:'Goehner', first:'Christina',shift:'rAlog2Kmb3HSeiR8TgGM',order:52},
{ last:'Craig', first:'Jesse',shift:'rAlog2Kmb3HSeiR8TgGM',order:53},
{ last:'Shanks', first:'Modesti',shift:'rAlog2Kmb3HSeiR8TgGM',order:54},
{ last:'Sok', first:'Paul',shift:'rAlog2Kmb3HSeiR8TgGM',order:55},
{ last:'Phan', first:'Hau',shift:'rAlog2Kmb3HSeiR8TgGM',order:56},
{ last:'La Fauci', first:'Russ',shift:'rAlog2Kmb3HSeiR8TgGM',order:57},


]

users.map(user=>{
   /* var docRef = db.collection("Users").doc()
    docRef.set({
        name:{last:user.last,first:user.first},
        shift:user.shift,
        order:user.order
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });*/
})
}

export const getSchedules = (StartDate,EndDate) => (dispatch) => {
    StartDate = resetTime(StartDate,0)
    EndDate = resetTime(EndDate,23)
    console.log("Start",StartDate,"End",EndDate)
    
    dispatch({type: ActionTypes.CLEAR_SCHEDULES})
    if(currentSchedule) currentSchedule()
    currentSchedule = firebase.firestore().collection("ScheduledDays").where('StartTime','>=',StartDate).where('StartTime','<=',EndDate).onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            var sd = change.doc.data().StartTime
            var schedule = {
                id:change.doc.id,
                dayOfWeek:sd?sd.toDate().getDay():'',
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

export const getRequestOff = (StartDate,EndDate) => (dispatch) => {
        
    if(currentRequestOff) currentRequestOff()
    currentRequestOff = firebase.firestore().collection("RequestOff").where('RequestedDate','>=',StartDate).where('RequestedDate','<=',EndDate).onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            var RequestedDayOff = {
                id:change.doc.id,
                ...change.doc.data()
            }
            console.log("Found REQ")
            if (change.type === "added") {
                dispatch(addRequestOff(RequestedDayOff))
            }
            if (change.type === "modified") {
                dispatch(updateRequestOff(RequestedDayOff))
            }
            if (change.type === "removed") {
                console.log("trying to remove")
                dispatch(removeRequestOff(RequestedDayOff))
            }
        });
    });
}


export const setSchedule = (StartDate,EndDate,UserId,docId) => (dispatch) => {
    var docRef = db.collection("ScheduledDays").doc()
    if(docId) docRef = db.collection("ScheduledDays").doc(docId)

    console.log("keep",StartDate,EndDate,UserId,docId)
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

export const setAvailability = (Day,Availability,UserId) => (dispatch) => {
    
    var docRef = db.collection("Users").doc(UserId)
    var updateAvailability = {};
        updateAvailability[`Availability.${Day}`] = Availability;
    
    console.log('setAvail',Day,Availability,UserId)
    
        docRef.update(updateAvailability)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export const setRequestedDayOff = (Data) => (dispatch) => {
    console.log('data from req',Data)
    
    var docRef = db.collection("RequestOff").doc()
    docRef.set(Data)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export const updateRequestedDayOff = (id,approved=false,denied=false) => {
    console.log("test",id)
    var docRef = db.collection("RequestOff").doc(id)
    var data={
        approved:approved,
        denied:denied
    }
    docRef.update(data)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export const lockSchedule = (id,StartTime,EndTime) => {
    console.log("test",id)
    var docRef = db.collection("Users").doc(id)
    var updateLockedSchedule = {};
    
    updateLockedSchedule[`Schedule.${StartTime.getDay()}`] = {StartTime:StartTime,EndTime:EndTime};
    docRef.update(updateLockedSchedule)
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

export const updateUser = (payload) => ({
    type: ActionTypes.UPDATE_USER,
    payload: payload
});

export const removeUser = (payload) => ({
    type: ActionTypes.REMOVE_USER,
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
//
export const addRequestOff = (payload) => ({
    type: ActionTypes.ADD_REQUEST_OFF,
    payload: payload
});

export const updateRequestOff = (payload) => ({
    type: ActionTypes.UPDATE_REQUEST_OFF,
    payload: payload
});

export const removeRequestOff = (payload) => ({
    type: ActionTypes.REMOVE_REQUEST_OFF,
    payload: payload
});
//
export const addShiftTimes = (payload) => ({
    type: ActionTypes.ADD_SHIFTTIMES,
    payload: payload
});

export const addShiftLabel = (payload) => ({
    type: ActionTypes.ADD_SHIFTLABEL,
    payload: payload
});

function resetTime(time,setTo){
    time.setMinutes(0)
    time.setSeconds(0)
    time.setMilliseconds(0)
    time.setHours(setTo)
return(time)
}