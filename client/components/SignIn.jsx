import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { login } from '../api/user'
import { useSelector, useDispatch } from 'react-redux'
import { getUserByUID } from '../api/user'
import { setUser } from "../actions/userActions"
import jwt_decode from "jwt-decode";
import "../css/Signin.css"

const SignIn = () => {

    //if auth-token exist when they come back and land on the signin route when they open, will take them to home route
    const authToken = localStorage.getItem("auth-token")
    if(authToken){
        window.location = "/home"
    }

    const history = useHistory()
    const dispatch = useDispatch()
    const [ userDeets,setUserDeets ] = useState({
        email: "",
        password: ""
    })

    const { email, password } = userDeets

    function handleChange(e){
        e.preventDefault()
        setUserDeets({...userDeets, [e.target.name]: e.target.value}) 
    }

    function loginUser(e){
        e.preventDefault()
        login(userDeets)
        .then(response => {
            const userToken = response["auth-token"]
            localStorage.setItem("auth-token", userToken )
            if(userToken){
                var decoded = jwt_decode(userToken);
                //sent uid to jwt online in login route backend, just grabbing uid from jwt token 
                const { uid } = decoded
                getUserByUID(uid)
                .then(user => {
                  dispatch(setUser(user))
                }).catch(error => {
                  console.log("error ",error.message);
                })
              }
        })
        .then(() => {
            history.replace("/home") 
        })
        .catch( error => {
            console.log("error ", error.message);
        })
        // 
    }

    // console.log(userDeets);
    return (
        <div className='signin'>
            <div>
                <h1>Login</h1>
                <form onSubmit={e => loginUser(e)}>
                    <h3>email</h3>
                    <input type="text" name="email" value={email} onChange={ e => handleChange(e)}/>
                    <h3>password</h3>
                    <input type="password" name="password" onChange={ e => handleChange(e)} value={password}/>
                    <button type="submit">Sign-in</button>
                    {/* <input type="submit"/> */}
                </form>
                <div>
                    <button>
                        <NavLink to="/signup">
                            not a registered user? go register
                        </NavLink>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignIn
