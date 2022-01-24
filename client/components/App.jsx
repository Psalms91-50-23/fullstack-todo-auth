import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, useHistory  } from 'react-router-dom'
import Home from './Home'
import Homepage from './Homepage'
import SignIn from './SignIn'
import SignUp from './SignUp'
import SignInSignUp from './SignInSignUp'
import { setUser } from "../actions/userActions"
import jwt_decode from "jwt-decode";
import { getUserByUID } from '../api/user'


function App () {

  const { user } = useSelector(state => state.userState)
  const [ userExists, setUserExists ] = useState("")
  const [ isLogin, setIsLogin ] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const authToken = localStorage.getItem("auth-token")
  // console.log("window ", window);
  if (!authToken && window.location.pathname != "/") {
    console.log("tests ");
    window.location = "/";
  }
   //Go to Login page if not logged in
  // if (window.location.pathname != "/" && !authToken) {
  //   console.log("tests 2");
  //   window.location = "/signinsignup";
  // }

  // useEffect(() => {

  //   const authToken = localStorage.getItem("auth-token")
  //   // const userToken = localStorage.getItem("auth-token")
  //   if(authToken){
  //     var decoded = jwt_decode(userToken);
  //     //sent uid to jwt online in login route backend, just grabbing uid from jwt token 
  //     const { uid } = decoded
  //     getUserByUID(uid)
  //     .then(user => {

  //       dispatch(setUser(user))

  //     }).catch(error => {
  //       console.log("error ",error.message);
  //     })

  //   }

  // },[])

  return (
    
    <Router>
      {/* {isLogin && 
      (<Route path="/home" component={Home}/>)
      } */}
      <Route exact path="/" component={SignInSignUp}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/homepage" component={Homepage}/>
      <Route path="/home" component={Home}/>
      {/* <Route path="/todo/:id" component={TodoDetails}/> */}
      {/* <Route path="/signinsignup" component={SignInSignUp}/> */}
    </Router>
  )
}

export default App