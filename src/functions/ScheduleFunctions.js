import { ResetTime } from './DateFunctions'
import { connect } from 'react-redux';

export const assembleSchedule=(StartDate,EndDate,UserId,Schedules,requestedDaysOff)=>{
    var Schedule = Schedules.filter(Schedule=>{
        var RequestedOff = requestedDaysOff.find(day=>{
            var workDay = new Date(Schedule.StartTime.toDate())
            workDay = ResetTime(workDay)
            return(day.RequestedDate.toDate().getTime()===workDay.getTime()&&
            day.UserId===UserId&&
            day.approved)
         })
         if(RequestedOff){
             return(false)
         }
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

export const isDark=(color)=>{

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
            g = color >> 8 & 255;
            b = color & 255;
        }
        
        // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
        hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
        );
    
        // Using the HSP value, determine whether the color is light or dark
        if (hsp>127.5) {
    
            return false;
        } 
        else {
    
            return true;
        }
    }