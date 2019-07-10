import * as ActionTypes from './ActionTypes';

export const Schedules = (state= {
    errMess:null,
    isLoading:true,
    Schedules: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_SCHEDULE:
            var Schedule = action.payload;
            return {...state,isLoading:false, Schedules: state.Schedules.concat(Schedule)};
        case ActionTypes.UPDATE_SCHEDULE:
            var Schedule = action.payload;
            return {...state,isLoading:false, Schedules: state.Schedules.map((schedule)=>{if(schedule.id===action.payload.id){return(action.payload)}return(schedule)})};
        case ActionTypes.REMOVE_SCHEDULE:
            var Schedule = action.payload;
            return {...state,isLoading:false, Schedules: state.Schedules.filter(schedule=>schedule.id!==Schedule.id)};
        case ActionTypes.CLEAR_SCHEDULES:
            var Schedule = action.payload;
            return {...state,isLoading:false, Schedules: []};
        default:
            return state
    }
}