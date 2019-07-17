export function formatDate(newDate = new Date(), separator = '-') {
    var theDate = new Date(newDate)
    theDate.setDate(theDate.getDate());
    let date = theDate.getDate();
    let month = theDate.getMonth() + 1;
    let year = theDate.getFullYear().toString().substr(-2);
    return `${month < 10 ? `0${month}` : `${month}`}${separator}${date}${separator}${year}`
}

export function formatDateForInput(newDate = new Date(), separator = '-') {
    var theDate = new Date(newDate)
    theDate.setDate(theDate.getDate());
    let date = theDate.getDate();
    let month = theDate.getMonth() + 1;
    let year = theDate.getFullYear().toString();
    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
}

export const addDaysToDate = (theDate,days) => {
    var newDate = new Date(theDate)
    newDate.setDate(newDate.getDate() + days)
    return(newDate)
}

export const getStartOfWeek = (startDate,day=0) => {
    if(day>startDate.getDay())day=day-7
    var Sow = startDate.getDate() - startDate.getDay()+day
    startDate.setDate(Sow)
    return startDate;
}

export const getEndOfWeek = (startDate,day=0) => {
    var Sow = startDate.getDate() - startDate.getDay()-1 +day
    startDate.setDate(Sow + 7)
    return startDate;
}

export const formatTime = (theTime) => {
    var hours = theTime.getHours();
    var ampm = (hours >= 12) ? "pm" : "am";
    if(hours>12) hours -=12
    if(hours===0)hours=12
    return `${hours}${ampm}`
}

export const DAYSOFWEEK = {
    SUNDAY:0,
    MONDAY:1,
    TUESDAY:2,
    WEDNESDAY:3,
    THURSDAY:4,
    FRIDAY:5,
    SATURDAY:6,
}

export const ResetTime=(time,setTo=0)=>{
    time.setMinutes(0)
    time.setSeconds(0)
    time.setMilliseconds(0)
    time.setHours(setTo)
return(time)
}