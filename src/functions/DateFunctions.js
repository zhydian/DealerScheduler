export function formatDate(newDate = new Date(), separator = '-') {
    var theDate = new Date(newDate)
    theDate.setDate(theDate.getDate());
    let date = theDate.getDate();
    let month = theDate.getMonth() + 1;
    let year = theDate.getFullYear().toString().substr(-2);
    return `${month < 10 ? `0${month}` : `${month}`}${separator}${date}${separator}${year}`
}