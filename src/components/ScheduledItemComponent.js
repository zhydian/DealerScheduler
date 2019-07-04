import React, { Component } from 'react'
import ScheduledItemDropdown from './SelectScheduleDropdownComponent'
import { setSchedule,deleteSchedule } from '../redux/ActionCreators'
import { connect } from 'react-redux'

class ScheduledItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dropdownOpen: false
        };
      }

    toggleIt(val) {
        this.setState({
          dropdownOpen: val
        });
    }

    setUserSchedule = (StartTime,EndTime,UserId) => {
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
        this.props.setSchedule(start,end,UserId,this.props.id)
        this.toggleIt(false)
    }

    deleteSchedule = (id) =>{
        //console.log("removing",id)
        this.props.deleteSchedule(this.props.id)
        this.toggleIt(false)
    }

    render() {
        return(
            <>
            <div onDoubleClick={()=>this.toggleIt(!this.state.dropdownOpen)}>
                {this.props.children}
            </div>
            <ScheduledItemDropdown hasSchedule={this.props.hasSchedule} toggle={(val)=>this.toggleIt(val)} onSelect={(StartTime,EndTime)=>this.setUserSchedule(StartTime,EndTime,this.props.UserId)} deleteSchedule={()=>this.deleteSchedule(this.props.id)} dropdownOpen={this.state.dropdownOpen}/>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        Settings:state.Settings
    }
}

const mapDispatchToProps = (dispatch) => ({
    setSchedule: (StartDate,EndDate,UserId,DocId) => dispatch(setSchedule(StartDate,EndDate,UserId,DocId)),
    deleteSchedule:(docId)=>dispatch(deleteSchedule(docId))
})

export default connect(mapStateToProps,mapDispatchToProps)(ScheduledItem)