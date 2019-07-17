import * as ActionTypes from './ActionTypes';

export const RequestOff = (state= {
    RequestOff: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_REQUEST_OFF:
            return {...state,RequestOff: state.RequestOff.concat(action.payload)}; 
        case ActionTypes.UPDATE_REQUEST_OFF:
            return {...state,RequestOff: state.RequestOff.map((day)=>{if(day.id===action.payload.id){return(action.payload)}return(day)})};
        case ActionTypes.REMOVE_REQUEST_OFF:
            var Day = action.payload;
            return {...state,RequestOff: state.RequestOff.filter(day=>day.id!==Day.id)};
        default:
            return state
    }
}
