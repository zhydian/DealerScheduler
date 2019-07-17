import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Container, Badge } from 'reactstrap';
import { setSchedule,deleteSchedule,setAvailability } from '../redux/ActionCreators'
import { connect } from 'react-redux'

class ShiftPickerModal extends React.Component {
  constructor(props) {
    super(props);
  }

  renderShifts(){
    return(
      this.props.Settings.Shifts.map(shift=>{
        var start=shift.StartTime.toDate().getHours()
        var startWithPeriod = start>12?(start-12)+"pm":start+"am"
        var end=shift.EndTime.toDate().getHours()
        var endWithPeriod = end>12?(end-12)+"pm":end==0?'12am':end+"am"
      return(<Col key={shift.id} md={4} style={{backgroundColor:shift.BackColor,padding:'5px'}} onClick={()=>this.setUserSchedule(start,end)}>{startWithPeriod}-{endWithPeriod}{shift.type===1&&<Badge style={{float:'right',margin:'3px 3px 0 0'}} color='secondary'>Floor</Badge>}</Col>)
      })
    )
  }
  renderAvailability(){
    return(
      [null,'O/CD','O/CN','O/CDN'].map((shift,index)=>{
        return(<Col onClick={()=>this.updateAvailability(shift)} style={{borderColor:'black',borderStyle:'solid'}} key={index} md={4}>{shift?shift:'Unavailable'}</Col>)
      })
    )
  }

  setUserSchedule = (StartTime,EndTime) => {
    var start = new Date(this.props.date)
    var end = new Date(this.props.date)
    start.setHours(StartTime)
    start.setMinutes(0)
    start.setSeconds(0)
    start.setMilliseconds(0)
    end.setMinutes(0)
    end.setSeconds(0)
    end.setMilliseconds(0)
    end.setHours(EndTime)
    if(end.getHours()<start.getHours()){
        end.setDate(end.getDate()+1)
    }

    this.props.setSchedule(start,end,this.props.userId,this.props.shiftId)
    console.log(start,end,this.props.userId,this.props.shiftId)
    this.props.toggleModal()
}

deleteSchedule = (id) =>{
    console.log("del",id,this.props.shiftId)
    this.props.deleteSchedule(this.props.shiftId)
    this.props.toggleModal()
}

updateAvailability = (availability) =>{
    console.log("MD",this.props.modalData.selected,availability,this.props.userId)
    this.props.setAvailability(this.props.modalData.selectedDayOfWeek,availability,this.props.userId)
    this.props.toggleModal()
}

  render() {
    return (
      <div>
        <Modal isOpen={this.props.toggle} toggle={this.props.toggleModal} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Select Shift</ModalHeader>
          <ModalBody> 
              <Container>
              <Row>
                    {this.props.shiftId!=null &&<Col style={{backgroundColor:'grey'}} onClick={()=>this.deleteSchedule()}>X</Col>    }
                    {this.renderShifts()}
            </Row>
            <Row style={{border:'solid 2px #000000',paddingTop:'5px'}}>
            <Col md={12}>Set Availability</Col>
              {this.renderAvailability()}
            </Row>
            </Container>

            </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        Settings:state.Settings
    }
}

const mapDispatchToProps = (dispatch) => ({
    setSchedule: (StartDate,EndDate,UserId,DocId) => dispatch(setSchedule(StartDate,EndDate,UserId,DocId)),
    deleteSchedule:(docId)=>dispatch(deleteSchedule(docId)),
    setAvailability: (day,availability,userId) => dispatch(setAvailability(day,availability,userId))
})

export default connect(mapStateToProps,mapDispatchToProps)(ShiftPickerModal);