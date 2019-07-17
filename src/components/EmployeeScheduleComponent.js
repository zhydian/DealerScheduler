import React, { Component } from 'react'
import { Row, Col,Badge } from 'reactstrap'
import { connect } from 'react-redux';
import { setRequestedDayOff } from '../redux/ActionCreators'
import { formatTime, DAYSOFWEEK, addDaysToDate } from '../functions/DateFunctions.js'
import { assembleSchedule, isDark } from '../functions/ScheduleFunctions'
import EmployeeOptions from './EmployeeOptionsComponent'
import RequestedOffItem from './RequestOffItemComponent'

class EmployeeSchedule extends Component {

    state={
        slideToggle:false,
        roToggle:false
    }

    getScheduledDay = (Schedule,Day)=>{
        var scheduledDay = Schedule.schedule.find(val=>val.dayOfWeek===Day)
        var currentDate = new Date(this.props.Settings.StartDate)
        var scheduleDate =  new Date(this.props.Settings.StartDate)
        scheduleDate.setDate(scheduleDate.getDate()+Day)
        var availability = this.props.user.Availability[Day];

        var RequestedOff = this.props.RequestOff.RequestOff.find(day=>{
            return(day.RequestedDate.toDate().getTime()===scheduleDate.getTime()&&day.UserId===this.props.user.id&&day.approved)
        })

        if(RequestedOff){
            return <RequestedOffItem Day={Day} roId={RequestedOff.id} currentDate={currentDate} />
        }
        if(scheduledDay){
            return <span onDoubleClick={()=>this.props.onDoubleClick(scheduledDay.StartTime.toDate(),scheduledDay.id,Day)} className='ScheduleTime'>{this.RenderScheduleTime(scheduledDay.StartTime,scheduledDay.EndTime)}</span>
        }
        if(availability)
            return<span style={{display:'block',textAlign:'center',border:'solid 1px'}} onDoubleClick={()=>this.props.onDoubleClick(addDaysToDate(currentDate,Day),null,Day)}>{availability}</span>
    
        return <span onDoubleClick={()=>this.props.onDoubleClick(addDaysToDate(currentDate,Day),null,Day)} style={{backgroundColor:'grey',display:'block',textAlign:'center',border:'solid 1px'}}>X</span>
    }

    RenderScheduleTime(StartTime,EndTime){
        var Shift = this.props.Settings.Shifts.find(shift=>{
            var stime = shift.StartTime.toDate().getHours()===StartTime.toDate().getHours()
            var etime = shift.EndTime.toDate().getHours()===EndTime.toDate().getHours()
            return(stime&&etime)
        })
        var backColor="#ffffff"
        var type=0
        var foreColor="#000000"
        if(Shift){
          backColor = Shift.BackColor
          type=Shift.type
        }
        if(isDark(backColor)){
            foreColor="#ffffff"
        }
        return(
            <span style={{backgroundColor:backColor,color:foreColor,display:'block',textAlign:'center',border:'solid 1px',borderColor:'black'}}>
                {formatTime(StartTime.toDate())}-{formatTime(EndTime.toDate())} {type===1&&<Badge color='secondary'>Fl</Badge>}
            </span>
        )
    }

    toggleUserSlide(){
        this.setState({
            slideToggle:!this.state.slideToggle
        })
    }

    render(){
        if(!this.props.Schedules.isLoading){
        var schedule=assembleSchedule(this.props.Settings.StartDate,this.props.Settings.EndDate,this.props.user.id,this.props.Schedules.Schedules,this.props.RequestOff.RequestOff)   
        }
       return(
       <>
       <Row noGutters>
            <Col md={3}  onClick={()=>this.toggleUserSlide()} className='TitleColumn'>{this.props.user.name.last}, {this.props.user.name.first}</Col>
            <Col>{this.getScheduledDay(schedule,DAYSOFWEEK.SUNDAY)}</Col>
            <Col>{this.getScheduledDay(schedule,DAYSOFWEEK.MONDAY)}</Col>
            <Col>{this.getScheduledDay(schedule,DAYSOFWEEK.TUESDAY)}</Col>
            <Col>{this.getScheduledDay(schedule,DAYSOFWEEK.WEDNESDAY)}</Col>
            <Col>{this.getScheduledDay(schedule,DAYSOFWEEK.THURSDAY)}</Col>
            <Col>{this.getScheduledDay(schedule,DAYSOFWEEK.FRIDAY)}</Col>
            <Col>{this.getScheduledDay(schedule,DAYSOFWEEK.SATURDAY)}</Col>
            <Col className='TitleColumn' md={1}>{schedule.hours}</Col>
        </Row>
        <EmployeeOptions toggle={this.state.slideToggle} activateToggle={()=>this.toggleUserSlide()} user={this.props.user} SaveRequest={(data)=>this.props.setRequestedDayOff(data)}/>
        </>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    setRequestedDayOff: (data) => dispatch(setRequestedDayOff(data))
})

const mapStateToProps = state => {
    return {
        Users: state.Users,
        Schedules: state.Schedules,
        Settings: state.Settings,
        RequestOff: state.RequestOff
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeSchedule)

