import React, { useState, useContext } from 'react'
import { Row, Col } from 'reactstrap'
import { DAYSOFWEEK, addDaysToDate } from '../functions/DateFunctions.js'
import { assembleSchedule } from '../functions/ScheduleFunctions'
import EmployeeOptions from './EmployeeOptionsComponent'
import RequestedOffItem from './RequestOffItemComponent'
import { DataContext } from '../Providers/DataProvider'
import ScheduledTime from './ScheduledTimeComponent.js';

function EmployeeSchedule(props) {
    const [slideToggle, setSlideToggle] = useState(false);
    const { state } = useContext( DataContext )

    const getScheduledDay = (Schedule,Day)=>{
        var scheduledDay = Schedule.schedule[Day]
        var currentDate = new Date(state.Settings.StartDate)
        var scheduleDate =  new Date(state.Settings.StartDate)
        scheduleDate.setDate(scheduleDate.getDate()+Day)
        var availability = props.user.Availability[Day];

        var RequestedOff = state.Schedules.DaysOff.find(day=>{
            return(day.RequestedDate.toDate().getTime()===scheduleDate.getTime()&&day.UserId===props.user.id&&day.approved)
        })

        if(RequestedOff){
            return <RequestedOffItem Day={Day} roId={RequestedOff.id} currentDate={currentDate} />
        }
        
        if(scheduledDay){
            return <ScheduledTime onDoubleClick={props.onDoubleClick} scheduledDay={scheduledDay} Day={Day} locked={scheduledDay.locked}/>
        }
       
        if(availability)
            return<span style={{display:'block',textAlign:'center',border:'solid 1px'}} onDoubleClick={()=>props.onDoubleClick(addDaysToDate(currentDate,Day),null,Day)}>{availability}</span>
    
        return <span onDoubleClick={()=>props.onDoubleClick(addDaysToDate(currentDate,Day),null,Day)} style={{backgroundColor:'grey',display:'block',textAlign:'center',border:'solid 1px'}}>X</span>
    }

    
        var schedule=assembleSchedule(state.Settings.StartDate,state.Settings.EndDate,props.user,state.Schedules.Schedules,state.Schedules.DaysOff)
        return(
       <>
       <Row noGutters>
            <Col md={3}  onClick={()=>{setSlideToggle(!slideToggle);console.log("Dealer",props.user)}} className='TitleColumn'>{props.user.name.last}, {props.user.name.first}</Col>
            <Col>{getScheduledDay(schedule,DAYSOFWEEK.SUNDAY)}</Col>
            <Col>{getScheduledDay(schedule,DAYSOFWEEK.MONDAY)}</Col>
            <Col>{getScheduledDay(schedule,DAYSOFWEEK.TUESDAY)}</Col>
            <Col>{getScheduledDay(schedule,DAYSOFWEEK.WEDNESDAY)}</Col>
            <Col>{getScheduledDay(schedule,DAYSOFWEEK.THURSDAY)}</Col>
            <Col>{getScheduledDay(schedule,DAYSOFWEEK.FRIDAY)}</Col>
            <Col>{getScheduledDay(schedule,DAYSOFWEEK.SATURDAY)}</Col>
            <Col className='TitleColumn' md={1}>{schedule.hours}</Col>
        </Row>
        <EmployeeOptions toggle={slideToggle} activateToggle={()=>setSlideToggle(!slideToggle)} user={props.user}/>
        </>
        )
}


export default EmployeeSchedule

