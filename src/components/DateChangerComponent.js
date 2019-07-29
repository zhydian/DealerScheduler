import React from 'react'
import { formatDate,addDaysToDate } from '../functions/DateFunctions.js'

function DateChanger(props){
        return(
            <div style={{textAlign: "center",display:'flex'}}>
                <div onClick={()=>props.onPreviousClick(addDaysToDate(props.dateFrom,-props.increment),addDaysToDate(props.dateTo,-props.increment))} className='LeftButton'>Last Week</div>
                <div className='CenterDiv'>{formatDate(props.dateFrom)} to {formatDate(props.dateTo)}</div>
                <div onClick={()=>props.onNextClick(addDaysToDate(props.dateFrom,props.increment),addDaysToDate(props.dateTo,props.increment))} className='RightButton'>Next Week</div>
            </div>
        )
}

export default DateChanger