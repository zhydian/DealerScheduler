import React,{ Component } from 'react'
import { Badge } from 'reactstrap'
import { updateRequestedDayOff } from '../functions/FirebaseConnections'
import { FaBan,FaCalendarTimes } from 'react-icons/fa';

export default class RequestOffItem extends Component {
    state = {
        roToggle:false
    }
    render(){
        return(
            <span onMouseEnter={()=>this.setState({roToggle:true})} onMouseLeave={()=>this.setState({roToggle:false})}style={{display:'block',textAlign:'center',border:'solid 1px'}}>
                {this.state.roToggle&&<Badge onClick={()=>updateRequestedDayOff(this.props.roId,false,false)} style={{float:'left',margin:'3px 0px 0px 3px'}} color="warning"><FaCalendarTimes/></Badge>}
                R/O
                {this.state.roToggle&&<Badge onClick={()=>updateRequestedDayOff(this.props.roId,false,true)} style={{float:'right',margin:'3px 3px 0px 0px'}} color="danger"><FaBan/></Badge>}
            </span>
        )
    }
}