import React from 'react';
import { ListGroupItem,ListGroup } from 'reactstrap';

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

  render() {
    return (
         <div ref={this.setWrapperRef} style={{position:'absolute',zIndex:100,backgroundColor:'red',visibility:this.props.dropdownOpen?'visible':'hidden'}}>
            <div>
                <ListGroup>
                    {this.props.hasSchedule &&<ListGroupItem onClick={()=>this.props.deleteSchedule()}>Off</ListGroupItem>    }
                    <ListGroupItem onClick={()=>this.props.onSelect('11','16')}>11am-4pm</ListGroupItem>
                    <ListGroupItem onClick={()=>this.props.onSelect('11','18')}>11am-6pm</ListGroupItem>
                    <ListGroupItem onClick={()=>this.props.onSelect('11','19')}>11am-7pm</ListGroupItem>
                    <ListGroupItem onClick={()=>this.props.onSelect('12','21')}>12pm-9pm</ListGroupItem>
                    <ListGroupItem onClick={()=>this.props.onSelect('14','21')}>2pm-9pm</ListGroupItem>
                    <ListGroupItem onClick={()=>this.props.onSelect('21','4')}>9pm-4am</ListGroupItem>
                </ListGroup>
            </div>
         </div>
    );
  }
}

export default SelectScheduleDropdown