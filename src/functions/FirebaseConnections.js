import firebase from '../Firebase/firebase'
import * as DateFunctions from './DateFunctions'
const db = firebase.firestore()
var currentUsers = null;
var currentSchedule = null;
var currentRequestOff = null;
export default class FirebaseConnections {

    UserFunctions = {}
    ScheduleFunctions = {}
    currentRequestOff = {}

    constructor(UserFunctions, ScheduleFunctions) {
        this.UserFunctions = UserFunctions
        this.ScheduleFunctions = ScheduleFunctions
    }

    getUsers = () => {
        var self = this;
        if (currentUsers) currentUsers()
        var Users = []
        currentUsers = firebase.firestore().collection("Users").orderBy("order", "asc").limit(1000).onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                var user = {
                    id: change.doc.id,
                    Availability: change.doc.data().availability ? change.doc.data().availability : {},
                    ...change.doc.data()
                }
                if (change.type === "added") {
                    Users.push(user)
                }
                if (change.type === "modified") {
                    self.UserFunctions.UpdateUser(user)
                }
                if (change.type === "removed") {
                    self.UserFunctions.RemoveUser(user)
                }
            });
            if (Users.length > 0) {
                self.UserFunctions.AddUser(Users)
                Users = []
            }
        });
    }

    getSchedules = (StartDate, EndDate) => {
        var self = this;
        StartDate = DateFunctions.ResetTime(StartDate, 0)
        EndDate = DateFunctions.ResetTime(EndDate, 23)
        var schedules = []
        if (currentSchedule) currentSchedule()
        currentSchedule = firebase.firestore().collectionGroup("ScheduledDays").where('StartTime', '>=', StartDate).where('StartTime', '<=', EndDate).onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                var sd = change.doc.data().StartTime
                var schedule = {
                    id: change.doc.id,
                    dayOfWeek: sd ? sd.toDate().getDay() : '',
                    ...change.doc.data()
                }
                if (change.type === "added") {
                    schedules.push(schedule)
                }
                if (change.type === "modified") {
                    self.ScheduleFunctions.UpdateSchedule(schedule)
                }
                if (change.type === "removed") {
                    self.ScheduleFunctions.RemoveSchedule(schedule)
                }
            });
            if (schedules.length > 0) {
                self.ScheduleFunctions.AddSchedule(schedules)
                schedules = []
            }
        });
    }

    getRequestOff = (StartDate, EndDate) => {
        var self = this;
        var daysOff = []
        if (currentRequestOff) currentRequestOff()
        currentRequestOff = firebase.firestore().collection("RequestOff").where('RequestedDate', '>=', StartDate).where('RequestedDate', '<=', EndDate).onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                var RequestedDayOff = {
                    id: change.doc.id,
                    ...change.doc.data()
                }
                if (change.type === "added") {
                    daysOff.push(RequestedDayOff)
                }
                if (change.type === "modified") {
                    daysOff=[]
                    self.ScheduleFunctions.UpdateRequestOff(RequestedDayOff)
                    return
                }
                if (change.type === "removed") {
                    daysOff=[]
                    self.ScheduleFunctions.RemoveRequestOff(RequestedDayOff)
                }
            });
            if (daysOff.length > 0) {
                self.ScheduleFunctions.AddRequestOff(daysOff)
            }
        });
    }

    getShifts = () => {
        var ShiftTimes = []
        var self = this;
        firebase.firestore().collection("ShiftTimes").orderBy("order").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var shifts = {
                    id: doc.id,
                    ...doc.data()
                }
                ShiftTimes.push(shifts)
            });
            self.ScheduleFunctions.AddShiftTimes(ShiftTimes)
        });
    }


    setSchedule = (Schedule) => {
        var docRef = firebase.firestore().collection("Users").doc(Schedule.UserId).collection("ScheduledDays").doc()
        if (Schedule.docId) docRef = firebase.firestore().collection("Users").doc(Schedule.UserId).collection("ScheduledDays").doc(Schedule.DocId)
        docRef.set({
            UserId: Schedule.UserId,
            StartTime: Schedule.StartTime,
            EndTime: Schedule.EndTime,
            type:Schedule.type
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

    
}

export const deleteSchedule = (docId,UserId) => {
    var docRef = firebase.firestore().collection("Users").doc(UserId).collection("ScheduledDays").doc(docId)
    docRef.delete()
}


export const setAvailability = (Day,Availability,UserId) => {
    var docRef = firebase.firestore().collection("Users").doc(UserId)
    var updateAvailability = {};
        updateAvailability[`Availability.${Day}`] = Availability;
        docRef.update(updateAvailability)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export const setRequestedDayOff = (Data)  => {
    var docRef = firebase.firestore().collection("RequestOff").doc()
    docRef.set(Data)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export const lockSchedule = (Schedule,remove=false) => {
   var docRef = firebase.firestore().collection("Users").doc(Schedule.UserId)
    var updateAvailability = {};
        if(!remove){
                updateAvailability[`LockedSchedule.${Schedule.dayOfWeek}`] = {
                StartTime:Schedule.StartTime,
                EndTime:Schedule.EndTime,
                type:Schedule.type
            };
        }
        
        docRef.update(updateAvailability)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    deleteSchedule(Schedule.id,Schedule.UserId)
}



export const unlockSchedule = (Schedule) => {
   var docRef = firebase.firestore().collection("Users").doc(Schedule.UserId)
    var updateAvailability = {};
                updateAvailability[`LockedSchedule.${Schedule.dayOfWeek}`] = firebase.firestore.FieldValue.delete();
        docRef.update(updateAvailability)
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
