import * as ActionTypes from './ActionTypes';

export const Users = (state= {
    errMess:null,
    isLoading:true,
    Users: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_USER:
            var User = action.payload;
            return {...state,isLoading:false, Users: state.Users.concat(User)};
        default:
            return state
    }
}