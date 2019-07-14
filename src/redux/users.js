import * as ActionTypes from './ActionTypes';

export const Users = (state= {
    errMess:null,
    isLoading:true,
    Users: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_USER:
            return {...state,isLoading:false, Users: state.Users.concat(action.payload)}; 
        case ActionTypes.UPDATE_USER:
            var User = action.payload;
            return {...state,isLoading:false, Users: state.Users.map((user)=>{if(user.id===action.payload.id){return(action.payload)}return(user)})};
        case ActionTypes.REMOVE_USER:
            var User = action.payload;
            return {...state,isLoading:false, Users: state.Users.filter(user=>user.id!==User.id)};
        default:
            return state
    }
}

const getUserById = (arr,id) => arr.findIndex(user=>user.id===id)