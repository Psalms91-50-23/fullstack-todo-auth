import { combineReducers } from 'redux'
import userReducer from "./userReducer"
// import stuff from './stuff'

export default combineReducers({
  // stuff
  userState: userReducer
  
})