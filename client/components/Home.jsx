import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AddTodos from './AddTodos'
import Header from './Header'
import TodoList from './TodoList'
import jwt_decode from "jwt-decode";
import { getUserByUID } from '../api/user'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "../actions/userActions"

const Home = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userState )

    const userToken = localStorage.getItem("auth-token")
    console.log("userToken Home ", userToken);
  
    console.log("history home ",history);

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
