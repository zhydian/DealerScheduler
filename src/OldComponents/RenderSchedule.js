import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import ScheduledItem from './ScheduledItemComponent'
import { connect } from 'react-redux';
import { thisExpression } from '@babel/types';

class RenderSchedule extends Component {
    state = {
        hours:0
    }

    renderList(StartDate) {
        return(this.props.Users.Users.map((user,index)=>{
            return(<Row key={index} noGutters>
                <Col md={3}>{user.name.last}, {user.name.first}</Col>
                <Col>{this.getSchedule(0,user.id)}</Col>
                <Col>{this.getSchedule(1,user.id)}</Col>
                <Col>{this.getSchedule(2,user.id)}</Col>
                <Col>{this.getSchedule(3,user.id)}</Col>
                <Col>{this.getSchedule(4,user.id)}</Col>
                <Col>{this.getSchedule(5,user.id)}</Col>
                <Col>{this.getSchedule(6,user.id)}</Col>
                <Col md={1}>{this.getScheduledHours(user.id)}</Col>
            </Row>)
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
                {getTime(StartTime.toDate())}-{getTime(EndTime.toDate())}
            </span>
        )
    }

    getScheduledHours(userId){
        var scheds = this.props.Schedules.Schedules.filter(day=>day.UserId===userId)
        return(scheds.map(day=>{
        var diffTime = Math.abs(day.EndTime.toDate().getTime() - day.StartTime.toDate().getTime());
        return((diffTime / (1000*60*60)) % 24)
        }).reduce((a,b)=>a+b,0))
    }

    /*
    return(scheds.reduce((day)=>{
        var diffTime = Math.abs(day.EndTime.toDate().getTime() - day.StartTime.toDate().getTime());
        diffTime = (diffTime / (1000*60*60)) % 24
        return(diffTime)
        })
})
*/

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
           {this.renderList(this.props.Settings.StartDate)}
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



const getTime = (theTime) => {
        var hours = theTime.getHours();
        var ampm = (hours >= 12) ? "pm" : "am";
        if(hours>12) hours -=12
        if(hours===0)hours=12
        return `${hours}${ampm}`
}

export default connect(mapStateToProps,null)(RenderSchedule)