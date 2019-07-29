import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Row, Container, Col } from 'reactstrap';
import {formatDateForInput} from '../functions/DateFunctions'

class TimeOffModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      timeOffDate: formatDateForInput(new Date()),
      approved:true,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  saveTimeOff=()=>{
    var timeOff = this.state.timeOffDate

    var RequestedDate  = new Date(timeOff+" 00:00:00")
    console.log("timeoff",timeOff,"req",RequestedDate)
    var data = {
      approved:this.state.approved,
      RequestedDate:RequestedDate,
      UserId:this.props.user.id
    }
    this.props.SaveRequest(data)
    this.toggle()
  }

  handleChange = (date) => {
    this.setState({
        timeOffDate: date
    });
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Schedule Time Off - {this.props.user.name.first}-{this.props.user.name.last}</ModalHeader>
          <ModalBody>
            <Container>
                <Row><Col>Date:</Col><Col>
                <input type="date" value={this.state.timeOffDate} onChange={(e)=>this.handleChange(e.target.value)}/>
                </Col></Row>
                <Row><Col>Approved</Col><Col><input type="checkbox" onChange={(e)=>this.setState({approved:e.target.checked})} checked={this.state.approved}/></Col></Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.saveTimeOff}>Give Time Off</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TimeOffModal;