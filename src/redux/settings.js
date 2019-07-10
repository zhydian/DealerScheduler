import * as ActionTypes from './ActionTypes';
import { getEndOfWeek,getStartOfWeek } from '../functions/DateFunctions'

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

