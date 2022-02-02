import React from 'react'
import { BrowserRouter as Router, Route  } from 'react-router-dom'
import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'
import SignInSignUp from './SignInSignUp'

function App () {

  const authToken = localStorage.getItem("auth-token")
  //Go to Login page if not logged in
  if (!authToken && window.location.pathname != "/") {
    window.location = "/";
  }
  
  return (
    <Router>
      <Route exact path="/" component={SignInSignUp}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/home" component={Home}/>
    </Router>
  )
}

export default App