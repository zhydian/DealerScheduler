import React, { useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Container, Badge } from 'reactstrap';
import { DataContext } from '../Providers/DataProvider'
import { deleteSchedule, setAvailability} from '../functions/FirebaseConnections';


const ShiftPickerModal = (props) => {
  const { state, setSchedule } = useContext(DataContext)
  
  const RenderShifts = () => {
    return (
      state.Settings.Shifts.map(shift => {
        var start = shift.StartTime.toDate().getHours()
        var startWithPeriod = start > 12 ? (start - 12) + "pm" : start + "am"
        var end = shift.EndTime.toDate().getHours()
        var endWithPeriod = end > 12 ? (end - 12) + "pm" : end === 0 ? '12am' : end + "am"
        return (<Col key={shift.id} md={4} style={{ backgroundColor: shift.BackColor, padding: '5px' }} onClick={() => setUserSchedule(start, end)}>{startWithPeriod}-{endWithPeriod}{shift.type === 1 && <Badge style={{ float: 'right', margin: '3px 3px 0 0' }} color='secondary'>Floor</Badge>}</Col>)
      })
    )
  }

  const setUserSchedule=(start,end)=>{
    setSchedule(start, end, props.modalData.SelectedUser, props.modalData.selectedShiftId, props.modalData.selectedDate)
    props.toggleModal()
  }

  const RenderAvailability = () => {
    return (
      [null, 'O/CD', 'O/CN', 'O/CDN'].map((shift, index) => {
        return (<Col onClick={() => updateAvailability(shift)} style={{ borderColor: 'black', borderStyle: 'solid' }} key={index} md={4}>{shift ? shift : 'Unavailable'}</Col>)
      })
    )
  }
  const updateAvailability = (availability) => {
    console.log("Availability",props.modalData.selectedDayOfWeek, availability, props.modalData.SelectedUser)
    setAvailability(props.modalData.selectedDayOfWeek, availability, props.modalData.SelectedUser)
    props.toggleModal()
  }

  return (
    <div>
      <Modal isOpen={props.toggle} toggle={props.toggleModal} className={props.className}>
        <ModalHeader toggle={props.toggleModal}>Select Shift</ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              {props.modalData.selectedShiftId != null && <Col style={{ backgroundColor: 'grey' }} onClick={() => { deleteSchedule(props.modalData.selectedShiftId,props.modalData.SelectedUser); props.toggleModal() }}>X</Col>}
              <RenderShifts />
            </Row>
            <Row style={{ border: 'solid 2px #000000', paddingTop: '5px' }}>
              <Col md={12}>Set Availability</Col>
              {RenderAvailability()}
            </Row>
          </Container>

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );

}





export default ShiftPickerModal;