import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { connect } from 'react-redux';
import { formatTime, DAYSOFWEEK } from '../functions/DateFunctions.js'
import EmployeeSchedule from './EmployeeScheduleComponent';
import ShiftPickerModal from './ShiftPickerModalComponent'

class RenderSchedule extends Component {
    state = {
        hours:0,
        shift:'',
        SelectShiftModal:false,
        modalData:{
            SelectedUser:'',
            selectedShiftId:'',
            selectedDate:'',
            selectedDayOfWeek:''
        }
        
    }

    renderShiftLabel(user) {
        return(<div>testing</div>)
    }

    toggleShiftChangeModal(selectedUser='',selectedDate='',selectedShiftId=null,selectedDayOfWeek='') {
        console.log(selectedDayOfWeek,selectedUser)
        this.setState(prevState => ({
            SelectShiftModal: !prevState.SelectShiftModal,
            modalData:{
                SelectedUser:selectedUser,
                selectedShiftId:selectedShiftId,
                selectedDate:selectedDate,
                selectedDayOfWeek:selectedDayOfWeek
            }
        }));
      }
    

    renderList() {
        return(this.props.Users.Users.map((user,index)=>{
            return(<div key={user.id}>
            {/*this.renderShiftLabel(user)*/}
            <EmployeeSchedule onDoubleClick={(selectedDate,selectedShiftId,selectedDayOfWeek)=>this.toggleShiftChangeModal(user.id,selectedDate,selectedShiftId,selectedDayOfWeek)} user={user}/>
            </div>
            )
        }))
    }

    render(){
        return(
           <>
           {this.renderList()}
           <ShiftPickerModal modalData={this.state.modalData} date={this.state.modalData.selectedDate} userId={this.state.modalData.SelectedUser} shiftId={this.state.modalData.selectedShiftId} toggle={this.state.SelectShiftModal} toggleModal={()=>this.toggleShiftChangeModal()}/>
           </>
        )
    }
}

const mapStateToProps = state => {
    return {
        Users: state.Users,
        Schedules: state.Schedules,
        Settings: state.Settings
    }
}





export default connect(mapStateToProps,null)(RenderSchedule)