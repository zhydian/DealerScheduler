import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { connect } from 'react-redux';
import ScheduledItem  from './ScheduledItemComponent'
import { formatTime, DAYSOFWEEK } from '../functions/DateFunctions.js'
import EmployeeSchedule from './EmployeeScheduleComponent';

class RenderSchedule extends Component {
    state = {
        hours:0,
        shift:''
    }

    renderShiftLabel(user) {
        return(<div>testing</div>)
    }

    renderList() {
        return(this.props.Users.Users.map((user,index)=>{
            return(<div key={user.id}>
            {/*this.renderShiftLabel(user)*/}
            <EmployeeSchedule user={user}/>
            </div>
            )
        }))
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
            <span style={{backgroundColor:backColor,display:'block',textAlign:'center',border:'solid 1px',borderColor:this.state.selected?'red':'black'}}>
                {formatTime(StartTime.toDate())}-{formatTime(EndTime.toDate())}
            </span>
        )
    }

  

    getSchedule(dayOfWeek,userId){
        var checkDate = new Date(this.props.Settings.StartDate)
        checkDate.setDate(checkDate.getDate()+dayOfWeek)
        var currentDate = new Date(checkDate)
        var checkDate = checkDate.getDate();
        
        var scheds = this.props.Schedules.Schedules.filter(day=>{
            var curday = day.StartTime.toDate()
            if(day.UserId===userId&&curday.getDate()===checkDate){
                return(true)
            }
        })

        if(scheds.length>0){
        return (scheds.map((day,index)=>{
                var diffTime = Math.abs(day.EndTime.toDate().getTime() - day.StartTime.toDate().getTime());
                diffTime = (diffTime / (1000*60*60)) % 24
               return(<ScheduledItem hasSchedule key={index} id={day.id} date={currentDate} UserId={userId}>{this.RenderScheduleTime(day.StartTime,day.EndTime)}</ScheduledItem>)}))
        }else{
            return <ScheduledItem date={currentDate} UserId={userId}><span style={{backgroundColor:'grey',display:'block',textAlign:'center',border:'solid 1px'}}>X</span></ScheduledItem>
        }
    }

    render(){
        return(
           <>
           {this.renderList()}
           </>
        )
    }
}

const mapStateToProps = state => {
    return {
        Users: state.Users,
        Schedules: state.Schedules,
        Settings: state.Settings
    }
}





export default connect(mapStateToProps,null)(RenderSchedule)