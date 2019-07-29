import { ResetTime } from './DateFunctions'
import firebase from '../Firebase/firebase'
const db = firebase.firestore()

export const assembleSchedule = (StartDate, EndDate, User, Schedules, requestedDaysOff) => {
    const UserId = User.id
    var newSchedule = {}
    for (var d = new Date(StartDate); d <= new Date(EndDate); d.setDate(d.getDate() + 1)) {
        if (User.hasOwnProperty("LockedSchedule")) {
            if (User.LockedSchedule[d.getDay()]) {
                console.log("user", User.LockedSchedule[d.getDay()])
                var Schedule = {
                    ...User.LockedSchedule[d.getDay()],
                    dayOfWeek: d.getDay(),
                    locked: true,
                    UserId: User.id
                }

                if (getRequestedOff(requestedDaysOff, Schedule, UserId)) {

                } else {
                    newSchedule[d.getDay()] = Schedule
                }
            }
        }
    }

    Schedules.filter(Schedule => {
        var RequestedOff = getRequestedOff(requestedDaysOff, Schedule, UserId)
        if (RequestedOff) {
            return (false)
        }
        return (Schedule.UserId === UserId &&
            Schedule.StartTime.toDate() >= StartDate &&
            Schedule.StartTime.toDate() <= EndDate)
    }).map(Schedule => {
        if (typeof newSchedule[Schedule.dayOfWeek] !== 'undefined') {
            Schedule.hasLocked = true
        }
        newSchedule[Schedule.dayOfWeek] = Schedule
        return (Schedule)
    })
    return {
        schedule: newSchedule,
        hours: accumulatedHours(newSchedule)
    }
}

const getRequestedOff = (requestedDaysOff, Schedule, UserId) => {
    return requestedDaysOff.find(day => {
        var workDay = new Date(Schedule.StartTime.toDate())
        workDay = ResetTime(workDay)
        return (day.RequestedDate.toDate().getTime() === workDay.getTime() &&
            day.UserId === UserId &&
            day.approved)
    })
}

export const accumulatedHours = (schedule) => {

    var hours = 0
    for (var property1 in schedule) {
        var diffTime = Math.abs(schedule[property1].EndTime.toDate().getTime() - schedule[property1].StartTime.toDate().getTime());
        var curHours = (diffTime / (1000 * 60 * 60)) % 24
        hours += +curHours
    }
    return hours
}
/*
schedule.map(day=>{
var diffTime = Math.abs(day.EndTime.toDate().getTime() - day.StartTime.toDate().getTime());
 
}).reduce((a,b)=>a+b,0)
*/
export const isDark = (color) => {

    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {


        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        // eslint-disable-next-line
        g = color >> 8 & 255;
        // eslint-disable-next-line
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {

        return false;
    }
    else {

        return true;
    }
}

export const addShiftsToFirebase = (run = false) => {
    const batch = db.batch()
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
        [18, 4, '#D9D9D9', 0],//6-1
    ]


    ShiftTimes.forEach(shift => {

        var docRef = db.collection("ShiftTimes").doc()
        var start = new Date()
        start.setHours(shift[0])
        var end = new Date()
        end.setHours(shift[1])
        var Shift = {
            StartTime: firebase.firestore.Timestamp.fromDate(start),
            EndTime: firebase.firestore.Timestamp.fromDate(end),
            BackColor: shift[2],
            type: shift[3]
        }
        batch.set(docRef, Shift)
        if (run) {
            batch.commit()
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }
    })
}

export const AddDealersToFirebase = () => {

    const users = [
        //Day Shift
        { last: 'Rosas', first: 'Rita', shift: 'yotgjU3Z4S57z5YYOk99', order: 1 },
        { last: 'North', first: 'Cynthia', shift: 'yotgjU3Z4S57z5YYOk99', order: 2 },
        { last: 'Carosa', first: 'Shelley', shift: 'yotgjU3Z4S57z5YYOk99', order: 3 },
        { last: 'Kamminga', first: 'Matt', shift: 'yotgjU3Z4S57z5YYOk99', order: 4 },
        { last: 'Keating', first: 'Matt', shift: 'yotgjU3Z4S57z5YYOk99', order: 5 },
        { last: 'Bullard', first: 'Trane', shift: 'yotgjU3Z4S57z5YYOk99', order: 6 },
        { last: 'Guthrie', first: 'Julie', shift: 'yotgjU3Z4S57z5YYOk99', order: 7 },
        { last: 'Marten', first: 'Brianna', shift: 'yotgjU3Z4S57z5YYOk99', order: 8 },
        { last: 'Phorn-Feldon', first: 'R', shift: 'yotgjU3Z4S57z5YYOk99', order: 9 },
        { last: 'Penick', first: 'DJ', shift: 'yotgjU3Z4S57z5YYOk99', order: 10 },
        { last: 'Bullard', first: 'Bryan', shift: 'yotgjU3Z4S57z5YYOk99', order: 11 },
        { last: 'Soeum', first: 'Pea', shift: 'yotgjU3Z4S57z5YYOk99', order: 12 },
        { last: 'Hak', first: 'Hef', shift: 'yotgjU3Z4S57z5YYOk99', order: 13 },
        { last: 'Walker', first: 'Peter', shift: 'yotgjU3Z4S57z5YYOk99', order: 14 },
        { last: 'Lin', first: 'Yuehua (Nikki)', shift: 'yotgjU3Z4S57z5YYOk99', order: 15 },
        { last: 'Bennett', first: 'Judy', shift: 'yotgjU3Z4S57z5YYOk99', order: 16 },
        { last: 'McSwain', first: 'Derek', shift: 'yotgjU3Z4S57z5YYOk99', order: 17 },
        { last: 'Chea', first: 'Sohpeap(Terry)', shift: 'yotgjU3Z4S57z5YYOk99', order: 18 },
        { last: 'Still', first: 'Adam', shift: 'yotgjU3Z4S57z5YYOk99', order: 19 },
        { last: 'Le', first: 'Thuy (Tisa)', shift: 'yotgjU3Z4S57z5YYOk99', order: 20 },
        //Swing
        { last: 'Meyer', first: 'Tyson', shift: 'Mw7G22pzWrWXE4E6ol4C', order: 21 },
        { last: 'Tuitele', first: 'Noi', shift: 'Mw7G22pzWrWXE4E6ol4C', order: 22 },
        { last: 'Tailleur', first: 'Shane', shift: 'Mw7G22pzWrWXE4E6ol4C', order: 23 },
        { last: 'Ladson', first: 'Thomas', shift: 'Mw7G22pzWrWXE4E6ol4C', order: 24 },
        { last: 'Piseno', first: 'Brandy', shift: 'Mw7G22pzWrWXE4E6ol4C', order: 25 },
        { last: 'Little', first: 'Marissa', shift: 'Mw7G22pzWrWXE4E6ol4C', order: 26 },
        { last: 'Muy', first: 'Sovonn', shift: 'Mw7G22pzWrWXE4E6ol4C', order: 27 },
        { last: 'Muy', first: 'Sam', shift: 'Mw7G22pzWrWXE4E6ol4C', order: 28 },
        { last: 'Graham', first: 'Shantyl', shift: 'Mw7G22pzWrWXE4E6ol4C', order: 29 },
        { last: 'Brown', first: 'Megan', shift: 'Mw7G22pzWrWXE4E6ol4C', order: 30 },
        { last: 'Khun', first: 'Vichet', shift: 'Mw7G22pzWrWXE4E6ol4C', order: 31 },
        //On Call
        { last: 'Okeefe', first: 'Mary', shift: 'yotgjU3Z4S57z5YYOk99', order: 32 },
        { last: 'Chhao', first: 'Sirith', shift: 'yotgjU3Z4S57z5YYOk99', order: 33 },
        { last: 'Cortez', first: 'Jennifer', shift: 'yotgjU3Z4S57z5YYOk99', order: 34 },
        { last: 'Nguyen', first: 'Thac', shift: 'yotgjU3Z4S57z5YYOk99', order: 35 },
        { last: 'Phan', first: 'Jarreyah', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 36 },
        { last: 'Mozer', first: 'Mathew', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 37 },
        { last: 'Tran', first: 'Randy', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 38 },
        { last: 'Timm', first: 'Tamara', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 39 },
        { last: 'Guillen', first: 'Jenneil', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 40 },
        { last: 'Larson', first: 'Cindy', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 41 },
        { last: 'Sevavapy', first: 'Ann', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 42 },
        { last: 'Goehner', first: 'Rami', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 43 },
        { last: 'Westgard', first: 'Nancy', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 44 },
        { last: 'Luu', first: 'Vy', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 45 },
        { last: 'Le', first: 'Jenny', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 46 },
        { last: 'Ha', first: 'Kim', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 47 },
        { last: 'Abel', first: 'Caitlin', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 48 },
        { last: 'Jouyphanh', first: 'Nantha(Anitha)', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 49 },
        { last: 'Cobb', first: 'Austin', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 50 },
        { last: 'Vuth', first: 'Vannara', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 51 },
        { last: 'Goehner', first: 'Christina', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 52 },
        { last: 'Craig', first: 'Jesse', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 53 },
        { last: 'Shanks', first: 'Modesti', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 54 },
        { last: 'Sok', first: 'Paul', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 55 },
        { last: 'Phan', first: 'Hau', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 56 },
        { last: 'La Fauci', first: 'Russ', shift: 'rAlog2Kmb3HSeiR8TgGM', order: 57 },


    ]
    var batch = db.batch();
    users.forEach(user => {
        var docRef = db.collection("Users").doc()
        var newUser = {
            name: { last: user.last, first: user.first },
            shift: user.shift,
            order: user.order
        }
        batch.set(docRef, newUser)

    })
    batch.commit().then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}