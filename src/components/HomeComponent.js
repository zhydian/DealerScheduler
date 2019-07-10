import React, { Component } from 'react'
import DateChanger from './DateChangerComponent'
import { Container, Row, Col, Button } from 'reactstrap'
import { getSchedules, getShifts, setDates } from '../redux/ActionCreators'
import { addDaysToDate } from '../functions/DateFunctions.js'
import { connect } from 'react-redux';

class Home extends Component {

    constructor(props) {
        super(props)
    }

    changeDate = (fromDate,toDate)=>{
        this.props.setDates(fromDate,toDate)
        this.props.getSchedules(fromDate,toDate)
    }

    render() {
        return (<Container fluid style={{padding:'5px'}}>
            <Row className="text-center">
               <Col xs={{size:6,offset:4}}>
                    <DateChanger increment={7} dateFrom={this.props.Settings.StartDate} dateTo={this.props.Settings.EndDate} onPreviousClick={(fromDate,toDate)=>this.changeDate(fromDate,toDate)} onNextClick={(fromDate,toDate)=>this.changeDate(fromDate,toDate)} />
               </Col>
            </Row>
        </Container>)
    }
}

const mapStateToProps = state => {
    return {
        Settings: state.Settings
    }
}
const mapDispatchToProps = (dispatch) => ({
    getSchedules: (StartDate, EndDate) => dispatch(getSchedules(StartDate, EndDate)),
    getShifts: () => dispatch(getShifts()),
    setDates: (StartDate, EndDate) => dispatch(setDates(StartDate, EndDate))
})


export default connect(mapStateToProps, mapDispatchToProps)(Home)