import React, { useState, useContext } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { DAYSOFWEEK, addDaysToDate } from '../functions/DateFunctions.js'
import { assembleSchedule } from '../functions/ScheduleFunctions'
import EmployeeOptions from './EmployeeOptionsComponent'
import RequestedOffItem from './RequestOffItemComponent'
import { DataContext } from '../Providers/DataProvider'
import ScheduledTime from './ScheduledTimeComponent.js';
import RenderDaysOfWeek from './RenderDaysOfWeekComponent'

function EmployeeSchedule(props) {
    const [slideToggle, setSlideToggle] = useState(false);
    const { state } = useContext(DataContext)

    const getScheduledDay = (Schedule, Day) => {
        var scheduledDay = Schedule.schedule[Day]
        var currentDate = new Date(state.Settings.StartDate)

        var scheduleDate = new Date(state.Settings.StartDate)
        scheduleDate.setDate(scheduleDate.getDate() + Day)
        var availability = props.user.Availability[Day];

        var RequestedOff = state.Schedules.DaysOff.find(day => {
            return (day.RequestedDate.toDate().getTime() === scheduleDate.getTime() && day.UserId === props.user.id && day.approved)
        })

        if (RequestedOff) {
            return <RequestedOffItem Day={Day} roId={RequestedOff.id} currentDate={currentDate} />
        }

        if (scheduledDay) {
            return <ScheduledTime onDoubleClick={props.onDoubleClick} scheduledDay={scheduledDay} Day={Day} locked={scheduledDay.locked} />
        }

        if (availability)
            return <span style={{ display: 'block', textAlign: 'center', border: 'solid 1px' }} onDoubleClick={() => props.onDoubleClick(addDaysToDate(currentDate, Day), null, Day)}>{availability}</span>

        return <span onDoubleClick={() => props.onDoubleClick(addDaysToDate(currentDate, Day), null, Day)} style={{ backgroundColor: 'grey', display: 'block', textAlign: 'center', border: 'solid 1px' }}>X</span>
    }


    var schedule = assembleSchedule(state.Settings.StartDate, state.Settings.EndDate, props.user, state.Schedules.Schedules, state.Schedules.DaysOff)
    return (
        <>
            <Row noGutters>
                <Container fluid>
                    <Row className={"d-xl-none"}>
                        <Col>&nbsp;</Col>
                    </Row>
                    <Row noGutters>
                    <Col className="d-xl-none col-12 TitleColumn" onClick={() => { setSlideToggle(!slideToggle); console.log("Dealer", props.user) }}>{props.user.name.last}, {props.user.name.first}</Col>
                        <Col className="d-xl-none">
                            <RenderDaysOfWeek />
                        </Col>
                        <Col style={{ padding: '0' }}>
                            <Container style={{ padding: '0' }} fluid>
                                <Row style={{ padding: '0' }} noGutters>
                                    <Col className="d-none d-xl-flex col-3 TitleColumn" onClick={() => { setSlideToggle(!slideToggle); console.log("Dealer", props.user) }}>{props.user.name.last}, {props.user.name.first}</Col>
                                    <Col sm={12} className='col-xl'>{getScheduledDay(schedule, DAYSOFWEEK.SUNDAY)}</Col>
                                    <Col sm={12} className='col-xl'  >{getScheduledDay(schedule, DAYSOFWEEK.MONDAY)}</Col>
                                    <Col sm={12} className='col-xl'  >{getScheduledDay(schedule, DAYSOFWEEK.TUESDAY)}</Col>
                                    <Col sm={12} className='col-xl'  >{getScheduledDay(schedule, DAYSOFWEEK.WEDNESDAY)}</Col>
                                    <Col sm={12} className='col-xl'  >{getScheduledDay(schedule, DAYSOFWEEK.THURSDAY)}</Col>
                                    <Col sm={12} className='col-xl'  >{getScheduledDay(schedule, DAYSOFWEEK.FRIDAY)}</Col>
                                    <Col sm={12} className='col-xl'  >{getScheduledDay(schedule, DAYSOFWEEK.SATURDAY)}</Col>
                                    <Col sm={12} xl={1} className='TitleColumn justify-content-end'>{schedule.hours}</Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    
                </Container>
            </Row>
            <EmployeeOptions toggle={slideToggle} activateToggle={() => setSlideToggle(!slideToggle)} user={props.user} />
        </>
    )
}


export default EmployeeSchedule

