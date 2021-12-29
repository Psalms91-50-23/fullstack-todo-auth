import React from 'react'
import { logoutUser } from '../api/user'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "../css/Header.css"


const Header = () => {

    

    const history = useHistory()

    function logout(){
        const authToken = localStorage.getItem("auth-token")
        logoutUser(authToken)
        .then(response => {
            console.log("response in logout homepage  ", response);
            localStorage.removeItem('auth-token');
            //user logged out, push to login page/ which is home
            history.push("/")
        })
        .catch(error => {
            console.log("error ", error.message);
        })
    }

    return (
        <div className='header'>
            <h1>Header</h1>
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default Header
