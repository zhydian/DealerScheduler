import React, { useContext } from 'react'
import DateChanger from './DateChangerComponent'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Badge } from 'reactstrap'
import { FaFileAlt } from 'react-icons/fa';
import { addDaysToDate, formatDate } from '../functions/DateFunctions.js'
import RenderSchedule from './RenderSchedule';
import { DataContext } from '../Providers/DataProvider'

const Home = () => {
    const { state, changeDate } = useContext(DataContext)
    return (
        <>
            <div className='sticky-top' style={{ backgroundColor: 'white' }}>
                <Container style={{ paddingTop: '5px' }}>
                    <Row className="text-center">
                        <Col xs={{ size: 6, offset: 4 }}>
                            <DateChanger increment={7} dateFrom={state.Settings.StartDate} dateTo={state.Settings.EndDate} onPreviousClick={(fromDate, toDate) => changeDate(fromDate, toDate)} onNextClick={(fromDate, toDate) => changeDate(fromDate, toDate)} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '15px', position: 'sticky' }} noGutters>
                        <Col md={3} className="TitleRoundedLeft">
                            Employee()
                </Col>
                        <Col className="TitleRoundedCenter">
                            <Link to={`roadmap/0`} target="_blank" style={{ textDecoration: 'none' }}>
                                {formatDate(addDaysToDate(state.Settings.StartDate, 0))}<br />
                                Sunday
                </Link>
                        </Col>
                        <Col className="TitleRoundedCenter">
                            <Link to={`roadmap/1`} target="_blank" style={{ textDecoration: 'none' }}>
                                {formatDate(addDaysToDate(state.Settings.StartDate, 1))}<br />
                                Monday</Link>
                        </Col>
                        <Col className="TitleRoundedCenter">
                            <Link to={`roadmap/2`} target="_blank" style={{ textDecoration: 'none' }}>
                                {formatDate(addDaysToDate(state.Settings.StartDate, 2))}<br />
                                Tuesday
                             </Link>
                        </Col>
                        <Col className="TitleRoundedCenter">
                            <Link to={`roadmap/3`} target="_blank" style={{ textDecoration: 'none' }}>
                                {formatDate(addDaysToDate(state.Settings.StartDate, 3))}<br />
                                Wednesday</Link>
                        </Col>
                        <Col className="TitleRoundedCenter">
                            <Link to={`roadmap/4`} target="_blank" style={{ textDecoration: 'none' }}>
                                {formatDate(addDaysToDate(state.Settings.StartDate, 4))}<br />
                                Thursday
                            </Link>
                </Col>
                        <Col className="TitleRoundedCenter">
                            <Link to={`roadmap/5`} target="_blank"  style={{ textDecoration: 'none' }}>
                            {formatDate(addDaysToDate(state.Settings.StartDate, 5))}<br />
                            Friday
                        </Link>
                </Col>
                        <Col className="TitleRoundedCenter">
                            <Link to={`roadmap/6`} target="_blank" style={{ textDecoration: 'none' }}>
                            {formatDate(addDaysToDate(state.Settings.StartDate, 6))}<br />
                            Saturday
                            </Link>
                </Col>
                        <Col md={1} className="TitleRoundedRight">
                            Hours
                </Col>
                    </Row>
                </Container></div>
            <Container>
                <RenderSchedule {...state} />
            </Container>
        </>)
}


export default Home