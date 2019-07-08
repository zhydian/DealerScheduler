import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { getSchedules, getShifts, setDates } from '../redux/ActionCreators'
import RenderSchedule from './RenderSchedule'
import { connect } from 'react-redux';

class Home extends Component {

    constructor(props) {
        super(props)

    }


    componentDidMount() {
        //this.props.setDates(getStartOfWeek(new Date(),getEndOfWeek(new Date())))
        this.props.getShifts()
        this.props.getSchedules(this.props.Settings.StartDate, this.props.Settings.EndDate);
        
    }

    changeDate = (days) => {
        var st = this.props.Settings.StartDate
        var en = this.props.Settings.EndDate
        st.setDate(st.getDate() + days)
        en.setDate(en.getDate() + days)
        this.props.setDates(st, en)
        this.props.getSchedules(st, en);
        console.log("days", days)
    }

    render() {
        return (<Container>
            <Row>
                <Col>
                    <Button onClick={() => this.changeDate(-7)}>Prev 7 days</Button>
                </Col>
                <Col>
                    {formatDate(this.props.Settings.StartDate)}
                </Col>
                <Col>
                    {formatDate(this.props.Settings.EndDate)}
                </Col>
                <Col>
                    <Button onClick={() => this.changeDate(7)}>Next 7 days</Button>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    Employee
                </Col>
                <Col>
                    Sunday
                </Col>
                <Col>
                    Monday
                </Col>
                <Col>
                    Tuesday
                </Col>
                <Col>
                    Wednesday
                </Col>
                <Col>
                    Thursday
                </Col>
                <Col>
                    Friday
                </Col>
                <Col>
                    Saturday
                </Col>
                <Col md={1}>
                    Hours
                </Col>
            </Row>
            <RenderSchedule />
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

export function formatDate(newDate = new Date(), separator = '-') {
    var theDate = new Date(newDate)
    theDate.setDate(theDate.getDate());
    let date = theDate.getDate();
    let month = theDate.getMonth() + 1;
    let year = theDate.getFullYear();
    return `${month < 10 ? `0${month}` : `${month}`}${separator}${date}${separator}${year}`
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)