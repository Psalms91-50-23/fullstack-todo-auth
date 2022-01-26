import React, { useState, useEffect} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { register, getUserByEmail, getUserByUserEmail } from '../api/user'
import { validateEmail, validatePassword, minPasswordCharReqReached, minEmailLength } from "../utils/functions"
import "../css/Signup.css"

const SignUp = () => {

    const authToken = localStorage.getItem("auth-token")
    if(authToken){
        window.location = "/home"
    }
    
    const history = useHistory()
    // console.log("history in signup ", history)
    const [ emailLength, setEmailLenth ] = useState(false)
    const [ userExists, setUserExists ] = useState("")
    // const [ userExistsError, setUserExistsError ] = useState(true)
    //email and password error
    const [ emailError, setEmailError ] = useState(true)
    const [ passwordError, setPasswordError ] = useState(true)

    const [ userDeets,setUserDeets ] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { password, email, name } = userDeets

    useEffect(() => {

        //test the start of the email min 3 character length
        const isValidEmailLength = minEmailLength(email)
        // console.log("isEmailValid ", isValidEmailLength);
        if(isValidEmailLength){

            //email length is reached, changed it to true
            setEmailLenth(true)
            const isValidEmail = validateEmail(email)
            // console.log('validated email ', isValidEmail);

            getUserByEmail(email)
            .then( user => {
                // console.log("user coming back ",user);
                if(user) setUserExists(true)
                else setUserExists(false)
                // console.log("user exists: ",userExists);
                
            }).catch(error => {
                console.log('error ',error.message);
            })
            // const userEmailExists = getUser(email)
            // console.log("userExists ",userEmailExists);
            // if(userEmailExists) setUserExists(userEmailExists)
            //below means a legit email, no error is false
            if(isValidEmail) setEmailError(false)
            else setEmailError(true)
            

        }
        else{
            setEmailLenth(false)
        }
        
    },[email])

    useEffect(() => {

        const isValidPassword = validatePassword(password)
        // console.log("isValidPassword ", isValidPassword);
        if(isValidPassword)  setPasswordError(false)
        else setPasswordError(true)
           
    },[password])

    function handleChange(e){
        e.preventDefault()
        // console.log(e.target.value);
        setUserDeets({...userDeets, [e.target.name]: e.target.value})

    }
    // &&  !userExistsError //and user error is falsy do following
    function registerUser(e){
        e.preventDefault()
        //by being falsy, no error in email or password, user does not exist 
        if( !emailError && !passwordError && !userExists){
            // console.log("before push ");
            register(userDeets)
            history.replace("/signin")
        }
      
    }

    function login(){
        history.push("/signin")
    }
    // console.log(userDeets);

    // console.log("password ", password);
    return (

        <div className='register__container'>
            <div className='signup__content'>
                <div className="signup__title">
                    <h1>Register</h1>
                </div>
                <form className="signup__form" onSubmit={e => registerUser(e)}>
                    <div className="signup__name">
                        <h2>Name</h2>
                        <input type="text" name="name" value={name} required onChange={ e => handleChange(e)}/>
                    </div>
                    <div className="signup__email">
                        <h2>Email</h2>
                        <input type="text" name="email" value={email} onChange={ e => handleChange(e)} required/>
                        {
                            !emailLength && 
                            (<p> Email have not reached a min of 3 character length </p>)

                        }
                        {
                            emailError && (<p> Email is not a valid email </p>)
                        }
                        {
                            userExists && <p className='signup__emailError'> User email already exists, choose another email </p>
                        }
                    </div>
                    <div className="signup__password">
                        <h2>Password</h2>
                        <input type="password" name="password" onChange={ e => handleChange(e)} value={password} required/>
                        {
                            passwordError && (<p>Password must have these 4 min requirements,  Password must be more than 6 characters long, must contain 1 capital letter, 1 lowercase letter and 1 special character "!@#$%^&"  </p>)
                        }
                        <button className='signup__register' type="submit">
                            Register
                        </button>
                    </div>
                    <button className='signup__login' onClick={login}>
                        A registered user? go login
                    </button>
                </form>
            </div>
        </div>

    )
}

export default SignUp
