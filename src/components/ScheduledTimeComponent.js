import React,{ useState,useContext } from 'react'
import { DataContext } from '../Providers/DataProvider'
import { isDark } from '../functions/ScheduleFunctions'
import { formatTime } from '../functions/DateFunctions.js'
import { Badge } from 'reactstrap'
import { lockSchedule } from '../functions/FirebaseConnections'
import { FaLock,FaUnlock } from 'react-icons/fa';


const ScheduledTime = (props) => {
    const [lockToggle,setLockToggle] = useState(false);
    const { state,unlockSchedule } = useContext( DataContext )
    const {scheduledDay, Day} = props
    
    var Shift = state.Settings.Shifts.find(shift=>{
        var stime = shift.StartTime.toDate().getHours()===scheduledDay.StartTime.toDate().getHours()
        var etime = shift.EndTime.toDate().getHours()===scheduledDay.EndTime.toDate().getHours()
        return(stime&&etime&&shift.type==scheduledDay.type)
    })
    var backColor="#ffffff"
    var foreColor="#000000"
    
    if(Shift){
      backColor = Shift.BackColor
    }

    const setUnlockSchedule=()=>{
        console.log("Unlocking",scheduledDay)
        unlockSchedule(scheduledDay)
    }

    const setLockSchedule=()=>{
        console.log("locking",scheduledDay)
        lockSchedule(scheduledDay)
    }

    if(isDark(backColor)){
        foreColor="#ffffff"
    }
        return(
            <span onMouseEnter={()=>{setLockToggle(true);console.log("state",state)}} onMouseLeave={()=>setLockToggle(false)}style={{display:'block',textAlign:'center',border:'solid 1px',backgroundColor:backColor,color:foreColor}}>
                <span onDoubleClick={()=>props.onDoubleClick(scheduledDay.StartTime.toDate(),scheduledDay.id,Day)} className='ScheduleTime'>
                    {lockToggle&&props.locked&&<Badge onClick={()=>setUnlockSchedule()} style={{float:'right',margin:'3px 3px 0px 0px'}} color="secondary" pill><FaLock/></Badge>}
                    {formatTime(scheduledDay.StartTime.toDate())}-{formatTime(scheduledDay.EndTime.toDate())} {scheduledDay.type===1&&<Badge color='secondary'>Fl</Badge>}
                    {lockToggle&&!props.locked&&!props.scheduledDay.hasLocked&&<Badge onClick={()=>setLockSchedule(scheduledDay)} style={{float:'right',margin:'3px 3px 0px 0px'}} color="secondary"><FaUnlock/></Badge>}
                </span>
                
                
            </span>
        )
}

export default ScheduledTime