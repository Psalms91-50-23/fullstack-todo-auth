import React from 'react'
import { useHistory } from 'react-router-dom'
import "../css/Signin__Signup.css"

const SignInSignUp = () => {
    const history = useHistory()

    return (
        <div className='signin_signup'>
            <div>
                <h3>Sign-in Sign-up</h3>
                <button onClick={() => history.push("/signin")}>Sign-In</button>
                <button onClick={() => history.push("/signup")}>Sign-Up</button>
            </div>
        </div>
    )
}

export default SignInSignUp
