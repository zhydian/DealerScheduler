import React from 'react'
import { Row,Col,Container } from 'reactstrap'
import { formatDate,addDaysToDate } from '../functions/DateFunctions.js'

function DateChanger(props){
        return(
            <Container>
                <Row>
                    <Col xs={3} onClick={()=>props.onPreviousClick(addDaysToDate(props.dateFrom,-props.increment),addDaysToDate(props.dateTo,-props.increment))} className='LeftButton'>Last Week</Col>
                    <Col xs={6} className='CenterDiv'>{formatDate(props.dateFrom)} to {formatDate(props.dateTo)}</Col>
                    <Col xs={3} onClick={()=>props.onNextClick(addDaysToDate(props.dateFrom,props.increment),addDaysToDate(props.dateTo,props.increment))} className='RightButton'>Next Week</Col>
                </Row>
               
            </Container>
        )
}

export default DateChanger