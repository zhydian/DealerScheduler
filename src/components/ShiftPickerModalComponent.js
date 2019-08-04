import React, { useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Container, Badge } from 'reactstrap';
import { DataContext } from '../Providers/DataProvider'
import { deleteSchedule, setAvailability} from '../functions/FirebaseConnections';
import ScheduledTimeDisplay from './ScheduledTimeDisplayComponent';


const ShiftPickerModal = (props) => {
  const { state, setSchedule } = useContext(DataContext)
  
  const RenderShifts = () => {
    return (
      state.Settings.Shifts.map(shift => {
        var start = shift.StartTime
        var end = shift.EndTime
        return (<Col key={shift.id} md={4} style={{ backgroundColor: shift.BackColor, padding: '5px' }} onClick={() => setUserSchedule(start, end,shift.type)}>
        <ScheduledTimeDisplay StartTime={start} EndTime={end} showBadge={true}/>
        {shift.type === 1 && <Badge style={{ float: 'right', margin: '3px 3px 0 0' }} color='secondary'>Floor</Badge>}
        {shift.type === 2 && <Badge style={{ float: 'right', margin: '3px 3px 0 0' }} color='secondary'>Shift</Badge>}
        {shift.type === 3 && <Badge style={{ float: 'right', margin: '3px 3px 0 0' }} color='secondary'>Admin</Badge>}
        </Col>)
      })
    )
  }

  const setUserSchedule=(start,end,type)=>{
    setSchedule({
      UserId:props.modalData.SelectedUser,
      StartDate:start.toDate(),
      EndDate:end.toDate(),
      type:type,
      DocId: props.modalData.selectedShiftId,
      date: props.modalData.selectedDate})
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