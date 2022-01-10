import React, { useState, useEffect} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { register, getUserByEmail, getUserByUserEmail } from '../api/user'
import { validateEmail, validatePassword, minPasswordCharReqReached, minEmailLength } from "../utils/functions"


const SignUp = () => {


    const authToken = localStorage.getItem("auth-token")
    if(authToken){
        window.location = "/home"
    }
    
    const history = useHistory()

    const [ emailLength, setEmailLenth ] = useState(false)
    const [ userExists, setUserExists ] = useState("")
    const [ userExistsError, setUserExistsError ] = useState(true)
    //email and password error
    const [ emailError, setEmailError ] = useState(true)
    const [ passwordError, setPasswordError ] = useState(true)
    const [ success, setSuccess ] = useState(false)

    const [ userDeets,setUserDeets ] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { password, email, name } = userDeets

    useEffect(() => {

        //test the start of the email min 3 character length
        const isValidEmailLength = minEmailLength(email)
        console.log("isEmailValid ", isValidEmailLength);
        if(isValidEmailLength){

            //email length is reached, changed it to true
            setEmailLenth(true)
            const isValidEmail = validateEmail(email)
            console.log('validated email ', isValidEmail);

            getUserByEmail(email)
            .then( user => {
                console.log("user coming back ",user);
                if(user) setUserExists(user)
                else setUserExists("")

                console.log("user exists: ",userExists);
                
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
        console.log("isValidPassword ", isValidPassword);
        if(isValidPassword)  setPasswordError(false)
        else setPasswordError(true)
           
    },[password])

    useEffect(() => {

        // if(success) history.push("/login")
        if(userExists){

            setUserExistsError(true) 
            // setSuccess(true)
        }
        else {
            setUserExistsError(false)
        }

    },[userExists])

    function handleChange(e){
        e.preventDefault()
        // console.log(e.target.value);
        setUserDeets({...userDeets, [e.target.name]: e.target.value})

    }
    
    function registerUser(e){
        e.preventDefault()
        //by being falsy, no error in email or password, user does not exist and user error is falsy do following
        if( !emailError && !passwordError && !userExists &&  !userExistsError){
            // console.log("before push ");
            register(userDeets)
            history.replace("/signin")
        }
      
    }

    console.log(userDeets);

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={e => registerUser(e)}>
                <h3>name</h3>
                <input type="text" name="name" value={name} required onChange={ e => handleChange(e)}/>
                <h3>email</h3>
                <input type="text" name="email" value={email} onChange={ e => handleChange(e)} required/>
                {
                    !emailLength ?  
                    (<p>Email have not reached a min of 3 character length</p>)
                    :
                    ""
                }
                {
                    emailError && (<p>email is not a valid email</p>)
                }
                <h3>password</h3>
                <input type="password" name="password" onChange={ e => handleChange(e)} value={password} required/>
                {
                    passwordError && (<p>Password must have these 4 min requirements,  Password must be more than 6 characters long, must contain 1 capital letter, 1 lowercase letter and 1 special character '!@#$%^&' ` </p>)
                }
                <button type="submit">Register</button>
            </form>
            {
                userExistsError && <p>User email already exists, choose another email</p>
            }
            <button>
                <NavLink to="/signin">
                    A registered user? go login
                </NavLink>
            </button>
        </div>
    )
}

export default SignUp
