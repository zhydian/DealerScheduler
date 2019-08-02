import React, {useContext} from 'react'
import {Row,Col,Container} from 'reactstrap'
import { assembleSchedule } from '../functions/ScheduleFunctions'
import { DataContext } from '../Providers/DataProvider';
import { formatTime } from '../functions/DateFunctions';

const RoadMap = (props) => {
    const {state} = useContext(DataContext)
    const Users = state.Users.Users.filter(User=>{
        User.Schedule = assembleSchedule(state.Settings.StartDate,state.Settings.EndDate,User,state.Schedules.Schedules,state.Schedules.DaysOff).schedule[props.day]
        return(User.Schedule)
    })
   // var schedule=assembleSchedule(state.Settings.StartDate,state.Settings.EndDate,props.user,state.Schedules.Schedules,state.Schedules.DaysOff)
    return(
    <Container>
        <Row>
            <Col>Road Map EO List</Col>
            <Col>Date Goes Here</Col>
        </Row>
        <Row style={{marginTop:25}}>
            <Col className="roadmapTitle single" md={{offset:2,size:3}}>Floors</Col>
            <Col className="roadmapTitle single" md={{offset:2,size:3}}>Available On Call Dealers</Col>
        </Row>
        <Row>
        <Col md={{offset:2,size:3}}>
        {Users.sort(sortUsers).filter(User=>{
            var hour = User.Schedule.StartTime.toDate().getHours()
            return(hour<15&&User.Schedule.type===1)
        }).map(User=>{
            return(<Row>
                <Col md={2} className="roadmapCol">{formatTime(User.Schedule.StartTime.toDate())}-{formatTime(User.Schedule.EndTime.toDate())}</Col>
                <Col className="roadmapCol">{User.name.first}</Col>
                </Row>
                
                )
        })}
        </Col>
        <Col md={{offset:2,size:3}}>
            <Row className="roadmapCol">&nbsp;</Row>
            <Row className="roadmapCol">&nbsp;</Row>
            <Row className="roadmapCol">&nbsp;</Row>
        </Col>
        </Row>
        <Row style={{marginTop:25}}>
            <Col className="roadmapTitle leftSide" md={2}></Col>
            <Col className="roadmapTitle">Dealers</Col>
            <Col className="roadmapTitle">Force Out</Col>
            <Col className="roadmapTitle">EO List</Col>
            <Col className="roadmapTitle rightSide">Time Out</Col>
        </Row>
           {Users.sort(sortUsers).filter(User=>{
            var hour = User.Schedule.StartTime.toDate().getHours()
            return(hour<15&&User.Schedule.type===0)
        }).map(User=>{
            return(<Row>
                <Col md={2} className="roadmapCol">{formatTime(User.Schedule.StartTime.toDate())}-{formatTime(User.Schedule.EndTime.toDate())}</Col>
                <Col className="roadmapCol">{User.name.first}</Col>
                <Col className="roadmapCol"></Col>
                <Col className="roadmapCol"></Col>
                <Col className="roadmapCol"></Col>
                </Row>
                
                )
        })}
        <Row style={{marginTop:25}}>
            <Col className="roadmapTitle single" md={{offset:2,size:3}}>Floors</Col>
            <Col className="roadmapTitle single" md={{offset:2,size:3}}>Available On Call Dealers</Col>
        </Row>
        <Row>
        <Col md={{offset:2,size:3}}>
        {Users.sort(sortUsers).filter(User=>{
            var hour = User.Schedule.StartTime.toDate().getHours()
            return(hour>15&&+User.Schedule.type>=1)
        }).map(User=>{
            return(<Row>
                <Col md={5} className="roadmapCol">{formatTime(User.Schedule.StartTime.toDate())}-{formatTime(User.Schedule.EndTime.toDate())}</Col>
                <Col className="roadmapCol">{User.name.first}</Col>
                </Row>
                
                )
        })}
        </Col>
        <Col md={{offset:2,size:3}}>
            <Row className="roadmapCol">&nbsp;</Row>
            <Row className="roadmapCol">&nbsp;</Row>
            <Row className="roadmapCol">&nbsp;</Row>
        </Col>
        </Row>
        <Row style={{marginTop:25}}>
            <Col className="roadmapTitle leftSide" md={2}></Col>
            <Col className="roadmapTitle">Dealers</Col>
            <Col className="roadmapTitle">Force Out</Col>
            <Col className="roadmapTitle">EO List</Col>
            <Col className="roadmapTitle rightSide">Time Out</Col>
        </Row>
           {Users.sort(sortUsers).filter(User=>{
            var hour = User.Schedule.StartTime.toDate().getHours()
            return(hour>15&&User.Schedule.type===0)
        }).map(User=>{
            return(<Row>
                <Col md={2} className="roadmapCol">{formatTime(User.Schedule.StartTime.toDate())}-{formatTime(User.Schedule.EndTime.toDate())}</Col>
                <Col className="roadmapCol">{User.name.first}</Col>
                <Col className="roadmapCol"></Col>
                <Col className="roadmapCol"></Col>
                <Col className="roadmapCol"></Col>
                </Row>
                
                )
        })}
    </Container>)
}
const sortUsers=(a,b)=>a.Schedule.StartTime.toDate() - b.Schedule.StartTime.toDate() ||
    a.Schedule.EndTime.toDate() - b.Schedule.EndTime.toDate()

export default RoadMap