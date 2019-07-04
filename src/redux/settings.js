import * as ActionTypes from './ActionTypes';

export const Settings = (state= {
    StartDate:getStartOfWeek(new Date()),
    EndDate:getEndOfWeek(new Date())
}, action) => {
    switch(action.type){
        case ActionTypes.SET_DATES:
            return {...state,StartDate:action.payload.StartDate,EndDate:action.payload.EndDate};
        default:
            return state
    }
}

function getStartOfWeek(startDate) {
    startDate.setDate(startDate.getDate() - startDate.getDay()+1)
    return startDate;
}

function getEndOfWeek(startDate) {
    startDate.setDate(startDate.getDate() - startDate.getDay()+1)
    startDate.setDate(startDate.getDate() + 7)
    return startDate;
}