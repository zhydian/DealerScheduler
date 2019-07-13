export const assembleSchedule=(StartDate,EndDate,UserId,Schedules)=>{
    var Schedule =
    Schedules.filter(Schedule=>{
        return(Schedule.UserId===UserId&&
        Schedule.StartTime.toDate()>=StartDate &&
        Schedule.StartTime.toDate()<=EndDate)
    })
    return{
        schedule:Schedule,
        hours:accumulatedHours(Schedule)
    }
}

export const accumulatedHours = (schedule)=>
    schedule.map(day=>{
    var diffTime = Math.abs(day.EndTime.toDate().getTime() - day.StartTime.toDate().getTime());
    return((diffTime / (1000*60*60)) % 24)
    }).reduce((a,b)=>a+b,0)
