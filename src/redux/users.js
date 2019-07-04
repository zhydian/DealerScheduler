import * as ActionTypes from './ActionTypes';

export const Users = (state= {
    errMess:null,
    isLoading:true,
    Users: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_USER:
            return {...state,isLoading:false, Users: state.Users.concat(action.payload)}; 
        default:
            return state
    }
}

const getUserById = (arr,id) => arr.findIndex(user=>user.id===id)