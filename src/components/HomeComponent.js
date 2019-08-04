import React, { useContext } from 'react'
import DateChanger from './DateChangerComponent'
import { Container, Row, Col, Badge } from 'reactstrap'
import RenderSchedule from './RenderSchedule';
import RenderDaysOfWeek from './RenderDaysOfWeekComponent'
import { DataContext } from '../Providers/DataProvider'

const Home = () => {
    const { state, changeDate } = useContext(DataContext)
    return (
        <>
            <div className='sticky-top' style={{ backgroundColor: 'white' }}>
                <Container style={{ paddingTop: '5px' }} fluid>
                    <Row className="justify-content-center">
                        <Col xs={12} xl={6}>
                            <DateChanger increment={7} dateFrom={state.Settings.StartDate} dateTo={state.Settings.EndDate} onPreviousClick={(fromDate, toDate) => changeDate(fromDate, toDate)} onNextClick={(fromDate, toDate) => changeDate(fromDate, toDate)} />
                        </Col>
                    </Row>
                    <Row className={'d-none d-xl-flex'} style={{ marginTop: '15px', position: 'sticky' }} noGutters>
                        <Col xl={3} className="TitleRoundedLeft">
                            Employee
                        </Col>
                        <Col className="d-xl">
                            <RenderDaysOfWeek />
                        </Col>
                        <Col xl={1} className="TitleRoundedCenter">Hours</Col>
                    </Row>
                </Container>
            </div>
            <Container style={{padding:'0'}} fluid>
                <RenderSchedule {...state} />
            </Container>
        </>)
}



export default Home