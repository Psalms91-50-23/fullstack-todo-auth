import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AddTodos from './AddTodos'
import Header from './Header'
import TodoList from './TodoList'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "../actions/userActions"
import { getUserByUID } from '../api/user'
import jwt_decode from "jwt-decode";

const Home = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userState )
    
    useEffect(() => {

        const userToken = localStorage.getItem("auth-token")
        console.log("userToken Home ", userToken);
      
        if(userToken){
            var decoded = jwt_decode(userToken);
            console.log("decoded in addtodo ", decoded);
            //sent uid to jwt online in login route backend, just grabbing uid from jwt token 
            const { uid } = decoded
            getUserByUID(uid)
            .then(user => {
                console.log("user in addtodo ", user);
                dispatch(setUser(user))
            }).catch(error => {
                console.log("error ",error.message);
            })
        }

    },[])

    console.log("user in home ", user);
    return (
        <div>
            <Header />
            <AddTodos />
            <TodoList/>
            <h1>Home</h1>
            {/* <button onClick={() => history.push("/register")}>register</button>
            <button onClick={() => history.push("/login")}>login</button> */}
        </div>
    )
}

export default Home
