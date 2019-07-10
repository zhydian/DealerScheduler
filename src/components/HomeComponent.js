import React, { Component } from 'react'
import DateChanger from './DateChangerComponent'
import { Container, Row, Col, Button } from 'reactstrap'
import { getSchedules, getShifts, setDates } from '../redux/ActionCreators'
import { connect } from 'react-redux';

class Home extends Component {

    constructor(props) {
        super(props)

    }


    componentDidMount() {
       
    }

    render() {
        return (<Container fluid style={{padding:'5px'}}>
            <Row className="text-center">
               <Col xs={{size:6,offset:4}}>
                    <DateChanger dateFrom={new Date('December 17, 1995 03:24:00')}/>
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