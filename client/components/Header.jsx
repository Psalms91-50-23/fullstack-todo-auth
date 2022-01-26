import React, { useState, useEffect } from 'react'
import { logoutUser } from '../api/user'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import "../css/Header.css"


const Header = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userState)
    const [ name, setName ] = useState("")

    useEffect(() => {

        if(user){
            setName(user.name)
        }

    },[user])
    
    // console.log("name ", name);
    function logout(){
        const authToken = localStorage.getItem("auth-token")
        logoutUser(authToken)
        .then(response => {
            localStorage.removeItem('auth-token');
            //user logged out, push to login page which is home
            history.push("/")
            
        })
        .catch(error => {
            console.log("error ", error.message);
        })
    }

    return (
        <div className='header'>
            <div className='header__user__container' >
                <span className='header__user__name'>
                    Logged in as {name}
                </span>
                <span className='header__user__logout' onClick={logout}>
                    Logout
                </span>
            </div>
        </div>
    )
}

export default Header
