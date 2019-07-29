import React, { useContext, useState } from 'react'
import EmployeeSchedule from './EmployeeScheduleComponent';
import ShiftPickerModal from './ShiftPickerModalComponent'
import { DataContext } from '../Providers/DataProvider';

function RenderSchedule () {
   /* state = {
        hours:0,
        shift:'',
    }
*/
    const [selectShiftModal,setSelectShiftModal] = useState(false)
    const [modalData,setModalData] = useState({
        SelectedUser:'',
        selectedShiftId:'',
        selectedDate:'',
        selectedDayOfWeek:''
    })
    const {state} = useContext( DataContext )

    const toggleShiftChangeModal = (selectedUser='',selectedDate='',selectedShiftId=null,selectedDayOfWeek='') => {
            setSelectShiftModal(!selectShiftModal)
            setModalData({
                SelectedUser:selectedUser,
                selectedShiftId:selectedShiftId,
                selectedDate:selectedDate,
                selectedDayOfWeek:selectedDayOfWeek
            }
        )
      }

    const renderList = () => {
        return(state.Users.Users.map((user,index)=>{
            return(
            <div key={user.id}>
            <EmployeeSchedule onDoubleClick={(selectedDate,selectedShiftId,selectedDayOfWeek)=>toggleShiftChangeModal(user.id,selectedDate,selectedShiftId,selectedDayOfWeek)} user={user}/>
            </div>
            )
        }))
    }

        return(
           <>
           {renderList()}
           <ShiftPickerModal modalData={modalData} toggle={selectShiftModal} toggleModal={()=>setSelectShiftModal(!selectShiftModal)}/>
          </>
        )
    
}



export default RenderSchedule