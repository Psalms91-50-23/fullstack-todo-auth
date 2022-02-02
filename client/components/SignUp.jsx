import React, { useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { register, getUserByEmail } from '../api/user'
import { validateEmail, validatePassword, minEmailLength } from "../utils/functions"
import "../css/Signup.css"

const SignUp = () => {

    const authToken = localStorage.getItem("auth-token")
    if(authToken){
        window.location = "/home"
    }
    
    const history = useHistory()
    const [ emailLengthError, setEmailLengthError ] = useState("")
    const [ userExists, setUserExists ] = useState("")
    const [ emailMsgExample, setEmailMsgExample ] = useState(true)
    const [ invalidEmailError, setInvalidEmailError ] = useState("")
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
        setUserExists(false)
        if(isValidEmailLength){
        //email length is reached, changed it to true
            setEmailLengthError(false)
            const isValidEmail = validateEmail(email)
            if(isValidEmail){
                setEmailMsgExample(false)  
            }else{
                setEmailMsgExample(true)
            }       
        }
        else{
            setEmailLengthError(true)
        }   
    },[email])

    useEffect(() => {
        const isValidPassword = validatePassword(password)
        if(isValidPassword) setPasswordError(false)
        else setPasswordError(true)       
    },[password])

    function handleChange(e){
        e.preventDefault()
        setUserDeets({...userDeets, [e.target.name]: e.target.value})
    }

    function registerUser(e){

        e.preventDefault()
        const isValidEmailLength = minEmailLength(email)
        if(!isValidEmailLength){
            setEmailLengthError(true)
           return 
        }
        const isValidEmail = validateEmail(email)
        if(!isValidEmail){

            setEmailError(true)
            // throw new Error("Email is not a valid Email")
            return 
        }
        setInvalidEmailError(false)
        getUserByEmail(email)
        .then( response => {
            // response = {error: "Something went wrong, Email does not exist"}
            if(response.error) {
                setUserExists(false)
                register(userDeets)
                history.push("/signin")               
            }
            setUserExists(true)
            
        }).catch(error => {
            console.log('error ',error.message);
        })
    }

    function login(){
        history.push("/signin")
    }

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
                        <input type="text" name="email" value={email} onChange={ e => handleChange(e)} required />
                        {
                            emailLengthError && 
                            <p> Email have not reached a min of 3 character length before "@" </p>

                        }
                        {
                            emailMsgExample && 
                            <p> Email examples ba4@hotmail.co.nz, ba4@gmail.com, not case sensitive</p>

                        }
                        {
                            invalidEmailError && <p > Email is not a valid email </p>
                        }
                        {
                            userExists && <p> User email already exists, choose another email </p>
                        }
                    </div>
                    <div className="signup__password">
                        <h2>Password</h2>
                        <input type="password" name="password" onChange={ e => handleChange(e)} value={password} autoComplete='on' required />
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