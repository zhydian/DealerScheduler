import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { addDaysToDate, formatDate, DayOfWeekArray } from '../functions/DateFunctions.js'
import { DataContext } from '../Providers/DataProvider'
import { Container, Row, Col, Badge } from 'reactstrap'


const RenderDaysOfWeek = () => {
    const { state } = useContext(DataContext)
    var elements = []
    for (var i = 0; i < 7; i++) {
        elements.push(

            <Col xs={12} className="TitleRoundedCenter col-xl">
                <Container fluid style={{padding:'0'}}>
                    <Link to={`roadmap/${i}`} target="_blank" style={{ textDecoration: 'none' }}>
                        <Row>
                            <Col xs={6} xl={12}>{formatDate(addDaysToDate(state.Settings.StartDate, i))}</Col>
                            <Col xs={6} xl={12}>{DayOfWeekArray[i]}</Col>
                        </Row>
                    </Link>
                </Container>
            </Col>
        )
    }
    return (
        <>
            <Container fluid>
                <Row>
                    {elements}
                    <Col className="TitleRoundedCenter d-xl-none">Hours</Col>
                </Row>
            </Container>

        </>
    )
}

export default RenderDaysOfWeek