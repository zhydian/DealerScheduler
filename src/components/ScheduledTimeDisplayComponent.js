import React from 'react' 
import { formatTime } from '../functions/DateFunctions.js'
import { Badge } from 'reactstrap'
import { get } from 'http';

const ScheduledTimeDisplay = (props) => {
    const {StartTime,EndTime,showBadge,type} = props
    var Start = StartTime.toDate()?StartTime.toDate():StartTime
    var End = EndTime.toDate()?EndTime.toDate():EndTime

    const getLabel = (type) => {
        switch(type){
            case 1:
                return("F")
            case 2:
                return("S")
            case 3:
                return("A")
            default:
                return("")
        }
    }
    return(
        <>
        {formatTime(Start)}{showBadge&&`-${formatTime(End)}`} {!showBadge&&<Badge color='secondary'>{getLabel(type)}</Badge>}
        </>
    )
}

export default ScheduledTimeDisplay