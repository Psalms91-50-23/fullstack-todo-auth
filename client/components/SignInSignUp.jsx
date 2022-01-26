import React from 'react'
import { useHistory } from 'react-router-dom'
import "../css/Signin__Signup.css"

const SignInSignUp = () => {
    const history = useHistory()

    return (
        <div className='signin__signup'>
            <div className='signin__signupImgContainer'>  
                <img className='signin__signup__img' src="https://c.tenor.com/ak6js9w3VSIAAAAC/todos.gif" alt="" />
            </div>
            <div className="signin__signup__content">
                <div className="signin__signup__contentContainer">
                    <div className="signin__container">
                        <h3>If you are registered</h3>
                        <button className='signin__button' onClick={() => history.push("/signin")}>Sign-In</button>             
                    </div>   
                    <div className="signup__container">
                        <h3>If you are not registered</h3>
                        <button className='signup__button' onClick={() => history.push("/signup")}>Sign-Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInSignUp
