import React, { Component } from 'react'
import DateChanger from './DateChangerComponent'
import { Container, Row, Col, Button } from 'reactstrap'
import { getSchedules, getShifts, setDates,getShiftLabels,getRequestOff } from '../redux/ActionCreators'
import { addDaysToDate,formatDate } from '../functions/DateFunctions.js'
import { connect } from 'react-redux';
import RenderSchedule from './RenderSchedule';

class Home extends Component {

    constructor(props) {
        super(props)
    }

    changeDate = (fromDate,toDate)=>{
        this.props.setDates(fromDate,toDate)
        this.props.getSchedules(fromDate,toDate)
        this.props.getRequestOff(fromDate,toDate)
    }

    
    componentDidMount() {
        this.props.getShifts()
        this.props.getShiftLabels()
        this.props.getSchedules(this.props.Settings.StartDate, this.props.Settings.EndDate); 
        this.props.getRequestOff(this.props.Settings.StartDate,this.props.Settings.EndDate)
    }

    render() {
        return (
        <>
        <div className='sticky-top' style={{backgroundColor:'white'}}>
        <Container style={{paddingTop:'5px'}}>
            <Row className="text-center">
               <Col xs={{size:6,offset:4}}>
                    <DateChanger increment={7} dateFrom={this.props.Settings.StartDate} dateTo={this.props.Settings.EndDate} onPreviousClick={(fromDate,toDate)=>this.changeDate(fromDate,toDate)} onNextClick={(fromDate,toDate)=>this.changeDate(fromDate,toDate)} />
               </Col>
            </Row>        
            <Row style={{marginTop:'15px',position:'sticky'}} noGutters>
                <Col md={3} className="TitleRoundedLeft">
                    Employee
                </Col>
                <Col  className="TitleRoundedCenter">
                {formatDate(addDaysToDate(this.props.Settings.StartDate,0))}<br/>
                Sunday
                </Col>
                <Col className="TitleRoundedCenter">
                {formatDate(addDaysToDate(this.props.Settings.StartDate,1))}<br/>
                    Monday
                </Col>
                <Col  className="TitleRoundedCenter">
                {formatDate(addDaysToDate(this.props.Settings.StartDate,2))}<br/>
                    Tuesday
                </Col>
                <Col className="TitleRoundedCenter">
                {formatDate(addDaysToDate(this.props.Settings.StartDate,3))}<br/>
                    Wednesday
                </Col>
                <Col className="TitleRoundedCenter">
                {formatDate(addDaysToDate(this.props.Settings.StartDate,4))}<br/>
                    Thursday
                </Col>
                <Col className="TitleRoundedCenter">
                {formatDate(addDaysToDate(this.props.Settings.StartDate,5))}<br/>
                    Friday
                </Col>
                <Col className="TitleRoundedCenter">
                {formatDate(addDaysToDate(this.props.Settings.StartDate,6))}<br/>
                    Saturday
                </Col>
                <Col md={1} className="TitleRoundedRight">
                    Hours
                </Col>
            </Row>
            </Container></div>
        <Container>
            <RenderSchedule/>
        </Container>
        </>)
    }
}

const mapStateToProps = state => {
    return {
        Settings: state.Settings
    }
}
const mapDispatchToProps = (dispatch) => ({
    getShifts: () => dispatch(getShifts()),
    getShiftLabels: () => dispatch(getShiftLabels()),
    getSchedules: (StartDate, EndDate) => dispatch(getSchedules(StartDate, EndDate)),
    getRequestOff: (StartDate, EndDate) => dispatch(getRequestOff(StartDate, EndDate)),
    setDates: (StartDate, EndDate) => dispatch(setDates(StartDate, EndDate))
})


export default connect(mapStateToProps, mapDispatchToProps)(Home)