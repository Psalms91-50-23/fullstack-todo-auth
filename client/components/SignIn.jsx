import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { login } from '../api/user'
import { useSelector } from 'react-redux'
import { register, getUserByEmail, getUserByUserEmail } from '../api/user'
import { getUserByUID } from '../api/user'

const SignIn = () => {

    const authToken = localStorage.getItem("auth-token")
    if(authToken){
        window.location = "/home"
    }

    const history = useHistory()
    const [ userDeets,setUserDeets ] = useState({
        email: "",
        password: ""
    })

    const { email, password } = userDeets

    function handleChange(e){
        e.preventDefault()
        // console.log(e.target.value);
        setUserDeets({...userDeets, [e.target.name]: e.target.value})
        
    }

    function loginUser(e){
        e.preventDefault()
        login(userDeets)
        .then(response => {
            console.log("response in login ", response)
            const token = response["auth-token"]
            console.log("token in login ",token);
            localStorage.setItem("auth-token", token )
        })
        .then(() =>{
            history.replace("/home")
        }).catch( error => {
            console.log("error ", error.message);
        })
        
    }

    console.log(userDeets);
    return (
        <div>
            <h1>Login</h1>
            <form>
                <h3>email</h3>
                <input type="text" name="email" value={email} onChange={ e => handleChange(e)}/>
                <h3>password</h3>
                <input type="password" name="password" onChange={ e => handleChange(e)} value={password}/>
                <button type="submit" onClick={ e => loginUser(e)}>Sign-in</button>
            </form>
            <div>
                <button>
                    <NavLink to="/signin">
                        not a registered user? go register
                    </NavLink>
                </button>
            </div>
        </div>
    )
}

export default SignIn
