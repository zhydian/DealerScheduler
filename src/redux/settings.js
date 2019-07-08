import * as ActionTypes from './ActionTypes';

export const Settings = (state= {
    StartDate:getStartOfWeek(new Date()),
    EndDate:getEndOfWeek(new Date()),
    Shifts:[]
}, action) => {
    switch(action.type){
        case ActionTypes.SET_DATES:
            return {...state,StartDate:action.payload.StartDate,EndDate:action.payload.EndDate};
        case ActionTypes.ADD_SHIFTTIMES:
            return {...state,Shifts:state.Shifts.concat(action.payload)};
        default:
            return state
    }
}

function getStartOfWeek(startDate) {
    var Sow = startDate.getDate() - startDate.getDay()
    startDate.setDate(Sow)
    return startDate;
}

function getEndOfWeek(startDate) {
    var Sow = startDate.getDate() - startDate.getDay()-1 
    startDate.setDate(Sow + 7)
    return startDate;
}