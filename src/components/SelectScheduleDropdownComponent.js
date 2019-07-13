import React from 'react';
import { Container,Col,Row } from 'reactstrap';

class SelectScheduleDropdown extends React.Component {

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef=(node)=> {
    this.wrapperRef = node;
  }

  handleClickOutside=(event)=> {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.toggle(false)
    }
  }
  renderLabels(){
    return(['O/CDN','O/CD','O/CN'].map(val=><Col onClick={()=>this.props.onSetLabel(val)} style={{backgroundColor:'white',border:'solid 1px'}}>{val}</Col>))
  }
  renderShifts(){
    return(
      this.props.Shifts.map(shift=>{
        
        var start=shift.StartTime.toDate().getHours()
        var startWithPeriod = start>12?(start-12)+"pm":start+"am"
        var end=shift.EndTime.toDate().getHours()
        var endWithPeriod = end>12?(end-12)+"pm":end==0?'12am':end+"am"
        return(<Col key={shift.id} md={4} style={{backgroundColor:shift.BackColor,padding:'5px'}} onClick={()=>this.props.onSelect(start,end)}>{startWithPeriod}-{endWithPeriod}</Col>)
      })
    )
  }
  render() {
    return (
         <div ref={this.setWrapperRef} style={{position:'absolute',zIndex:100, visibility:this.props.dropdownOpen?'visible':'hidden',backgroundColor:'gray'}}>
            <Row style={{width:'300px',border:'solid 2px #000000'}}>
                    {this.props.hasSchedule &&<Col style={{backgroundColor:'grey'}} onClick={()=>this.props.deleteSchedule()}>X</Col>    }
                    {this.renderShifts()}
            </Row>
            <Row style={{width:'300px',border:'solid 2px #000000'}}>
              {/*this.renderLabels()*/}
            </Row>
         </div>
    );
  }
}

export default SelectScheduleDropdown