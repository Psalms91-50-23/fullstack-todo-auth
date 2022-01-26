import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { getUserByEmail, login } from '../api/user'
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

    const [ emailError, setEmailError ] = useState(false)
    const [ userExists, setUserExists ] = useState(true)
    const [ submit, setSubmit ] = useState(false)
    const [ passwordError, setPasswordError ] = useState(false)
    const { email, password } = userDeets

    function handleChange(e){
        e.preventDefault()
        setUserDeets({...userDeets, [e.target.name]: e.target.value}) 
    }

    useEffect(() => {

        if(!submit && email){
            setEmailError(false)
        }

    },[email])

    useEffect(() => {

        //changes state of error so the span disappears, for email above useEffect also
        if(!submit && password){
            setPasswordError(false)
        }

    },[password])

    function loginUser(e){
        e.preventDefault()
        setSubmit(true)
        getUserByEmail(email)
        .then( user => {

            if(!user){
                setUserExists(false)
                setSubmit(false)
                setEmailError(true)
                throw new Error("Invalid Email")
            }   
            
            login(userDeets)
            .then(headerResponse => {

                if(!headerResponse){
                    setPasswordError(true)
                    //set submit state back to false to trigger userEffect
                    setSubmit(false)
                    throw new Error("Password did not match")
                }

                const userToken = headerResponse["auth-token"]
                localStorage.setItem("auth-token", userToken )
                dispatch(setUser(user))
               
            })
            .then(() => {
                history.replace("/home") 
            })
            .catch( error => {
                console.log("error ", error);
            })
              
        }).catch(error => {
            console.log('error ',error.message);
        })        
        
    }

    function goRegister(){

        history.push("signup")

    }

    return (
        <div className='signin'>
            <div className="signin__rightPattern">

            </div>
            <div className='signin__formContainer'>
                <div className="signin__title">
                    <h1>Login</h1>
                </div>
                <div className="signin__form">
                    <form onSubmit={e => loginUser(e)}>
                        <div className="signin__email">
                            <h2>Email</h2>
                            <input type="text" name="email" value={email} onChange={ e => handleChange(e)}/>
                            { emailError &&
                                <span>
                                    Invalid Email, Either typo or Email is not registered
                                </span>
                            }
                        </div>
                        <div className="signin__password">
                            <h2>Password</h2>
                            <input type="password" name="password" onChange={ e => handleChange(e)} value={password}/>
                            {passwordError &&
                            <span>
                                Password did not match database
                            </span>

                            }
                        </div>
                        <button className='signin__submitButton' type="submit">Sign-in</button>
                        {/* <input type="submit"/> */}
                    </form>
                    <div className='signin__signupButton'>
                        <button className='signin__goRegisterButton' onClick={goRegister}>
                            Not a registered user? Go register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
