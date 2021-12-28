import React from 'react'
import { useHistory } from 'react-router-dom'

const SignInSignUp = () => {
    const history = useHistory()

    return (
        <div className='signin_signup'>
            <h3>Sign-in Sign-up</h3>
            <button onClick={() => history.push("/signin")}>Sign-In</button>
            <button onClick={() => history.push("/signup")}>Sign-Up</button>
        </div>
    )
}

export default SignInSignUp
