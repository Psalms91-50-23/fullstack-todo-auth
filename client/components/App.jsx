import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route  } from 'react-router-dom'
import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'
import SignInSignUp from './SignInSignUp'
// import { setUser } from "../actions/userActions"
// import jwt_decode from "jwt-decode";
// import { getUserByUID } from '../api/user'

function App () {

  // const { user } = useSelector(state => state.userState)
  // const [ userExists, setUserExists ] = useState("")
  // const [ isLogin, setIsLogin ] = useState(false)
  // const dispatch = useDispatch()
  // const history = useHistory()

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