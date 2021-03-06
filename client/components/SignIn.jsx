import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getUserByEmail, login } from '../api/user'
import { useDispatch } from 'react-redux'
import { setUser } from "../actions/userActions"
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
    const [ submit, setSubmit ] = useState(false)
    const [ passwordError, setPasswordError ] = useState(false)
    const { email, password } = userDeets

    function handleChange(e){
        e.preventDefault()
        setUserDeets({...userDeets, [e.target.name]: e.target.value}) 
    }

    useEffect(() => {

        setEmailError(false)
        // if(!submit && email){
        //     setEmailError(false)
        // }

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
            //if I dont get !user.error from user response, means user exists, go ahead and login           
            if(!user.error){              
                login(userDeets)
                .then(headerResponse => {
                    if(!headerResponse){
                        setPasswordError(true)
                        //set submit state back to false to trigger useEffect
                        setSubmit(false)
                        throw new Error("Password did not match")
                    }
                    //successful grab the token from headerResponse and store it in localStorage
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
            }   
            else{
                 //if doesnt exist will get user.error show message
                setEmailError(true)
            }
              
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
                            <input type="text" name="email" required value={email} onChange={ e => handleChange(e)}/>
                            { emailError &&
                                <span className='signin__emailError'>
                                    Invalid Email, Either typo or Email is not registered
                                </span>
                            }
                        </div>
                        <div className="signin__password">
                            <h2>Password</h2>
                            <input type="password" required name="password" onChange={ e => handleChange(e)} value={password} autoComplete='on'/>
                            {passwordError &&
                            <span className='signin__passwordError'>
                                Password did not match database
                            </span>

                            }
                        </div>
                        <button className='signin__submitButton' type="submit">Sign-in</button>
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