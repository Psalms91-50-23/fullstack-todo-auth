import { USER_EXISTS, SET_USER } from "../actions/userActions"

const initialState = {
    user: null
}

const userReducer = ( state = initialState, action) => {

    switch(action.type){
        case SET_USER:
            return {...state, user: action.user}
        default:
            return state;

    }

}

export default userReducer