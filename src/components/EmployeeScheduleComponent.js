import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { connect } from 'react-redux';
import ScheduledItem  from './ScheduledItemComponent'
import { formatTime, DAYSOFWEEK, addDaysToDate } from '../functions/DateFunctions.js'
import { assembleSchedule } from '../functions/ScheduleFunctions'

class EmployeeSchedule extends Component {

    getScheduledDay = (Schedule,Day)=>{
        var scheduledDay = Schedule.schedule.find(val=>val.dayOfWeek===Day)
        
        if(scheduledDay){
            return <ScheduledItem hasSchedule key={Day} id={scheduledDay.id} date={scheduledDay.StartDate} UserId={this.props.user.id}><span className='ScheduleTime'>{this.RenderScheduleTime(scheduledDay.StartTime,scheduledDay.EndTime)}</span></ScheduledItem>
        }
        var currentDate = new Date(this.props.Settings.StartDate)
        return <ScheduledItem  date={addDaysToDate(currentDate,Day)} UserId={this.props.user.id}><span style={{backgroundColor:'grey',display:'block',textAlign:'center',border:'solid 1px'}}>X</span></ScheduledItem>
    }

    RenderScheduleTime(StartTime,EndTime){
        var backColor = this.props.Settings.Shifts.filter(shift=>{
            var stime = shift.StartTime.toDate().getHours()===StartTime.toDate().getHours()
            var etime = shift.EndTime.toDate().getHours()===EndTime.toDate().getHours()
            return(stime&&etime)
        })

        if(backColor.length>0){
          backColor = backColor[0].BackColor  
        }
        return(
            <span style={{backgroundColor:backColor,display:'block',textAlign:'center',border:'solid 1px',borderColor:'black'}}>
                {formatTime(StartTime.toDate())}-{formatTime(EndTime.toDate())}
            </span>
        )
    }

    render(){
        if(!this.props.Schedules.isLoading){
        var schedule= assembleSchedule(this.props.Settings.StartDate,this.props.Settings.EndDate,this.props.user.id,this.props.Schedules.Schedules)   
        }
        
       return(<Row noGutters>
            <Col md={3} className='TitleColumn'>{this.props.user.name.last}, {this.props.user.name.first}</Col>
            <Col>{this.getScheduledDay(schedule,DAYSOFWEEK.SUNDAY)}</Col>
            <Col>{this.getScheduledDay(schedule,DAYSOFWEEK.MONDAY)}</Col>
            <Col>{this.getScheduledDay(schedule,DAYSOFWEEK.TUESDAY)}</Col>
            <Col>{this.getScheduledDay(schedule,DAYSOFWEEK.WEDNESDAY)}</Col>
            <Col>{this.getScheduledDay(schedule,DAYSOFWEEK.THURSDAY)}</Col>
            <Col>{this.getScheduledDay(schedule,DAYSOFWEEK.FRIDAY)}</Col>
            <Col>{this.getScheduledDay(schedule,DAYSOFWEEK.SATURDAY)}</Col>
            <Col className='TitleColumn' md={1}>{schedule.hours}</Col>
        </Row>)
    }
}

const mapStateToProps = state => {
    return {
        Users: state.Users,
        Schedules: state.Schedules,
        Settings: state.Settings
    }
}

export default connect(mapStateToProps,null)(EmployeeSchedule)

