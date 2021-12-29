import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { logoutUser } from '../api/user'


const Homepage = () => {

    const history = useHistory()
    console.log("history in homepage ",history);


    function logout(){
        const token = localStorage.getItem("auth-token")
        logoutUser(token)
        .then(response => {
            console.log("response in logout homepage  ", response);
            localStorage.removeItem('auth-token');
            history.push("/login")
        })
        .catch(error => {
            console.log("error ", error.message);
        })
    }
 
    return (
        <div>
            <h3>Home page</h3>
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default Homepage
