import React, { Component } from 'react'
import { formatDate } from '../functions/DateFunctions.js'

function DateChanger({dateFrom=new Date(),dateTo=new Date()}){
        return(
            <div style={{textAlign: "center"}} style={{display:'flex'}}>
                <div className='LeftButton'>Last Week</div>
                <div className='CenterDiv'>{formatDate(dateFrom)} - {formatDate(dateFrom)}</div>
                <div className='RightButton'>Next Week</div>
            </div>
        )
}

export default DateChanger