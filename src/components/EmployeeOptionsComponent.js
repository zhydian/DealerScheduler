import React, { Component } from 'react'
import { Row, Col,Button, ButtonGroup } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TimeOffModal from './TimeOffModal'

export default class EmployeeOptions extends Component {

    setTimeOff=(data)=>{
        this.props.SaveRequest(data)
        this.props.activateToggle()
    }

    render(){
        return(
            <>
            <TransitionGroup  component={null}>
            {this.props.toggle&& <CSSTransition in={this.props.toggle} key={this.props.user.id} onEntering={()=>console.log("entering")} onExit={()=>console.log("exit")} timeout={500} classNames="dealerOptions">
                    <Row key={this.props.user.id} noGutters>
                         <Col md={3} className="TitleColumn">
                             <TimeOffModal buttonLabel="Time Off" user={this.props.user} SaveRequest={(data)=>this.setTimeOff(data)}/>
                         </Col>
                         <Col className="TitleColumn">
                             
                         </Col>
                     </Row>
                  </CSSTransition>}
         </TransitionGroup>
        </>
        )
    }
}