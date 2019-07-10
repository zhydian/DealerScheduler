export function formatDate(newDate = new Date(), separator = '-') {
    var theDate = new Date(newDate)
    theDate.setDate(theDate.getDate());
    let date = theDate.getDate();
    let month = theDate.getMonth() + 1;
    let year = theDate.getFullYear().toString().substr(-2);
    return `${month < 10 ? `0${month}` : `${month}`}${separator}${date}${separator}${year}`
}

export const addDaysToDate = (theDate,days) => {
    theDate.setDate(theDate.getDate() + days)
    return(theDate)
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