import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AddTodos from './AddTodos'
import Header from './Header'
import TodoList from './TodoList'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "../actions/userActions"
import { getUserByUID } from '../api/user'
import jwt_decode from "jwt-decode";
import { setTodos } from "../actions/userActions"
import "../css/Home.css"


const Home = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const { user, todos } = useSelector(state => state.userState )
    
    useEffect(() => {

        const userToken = localStorage.getItem("auth-token")
        // console.log("userToken Home ", userToken);
      
        if(userToken){
            var decoded = jwt_decode(userToken);
            // console.log("decoded in addtodo ", decoded);
            //sent uid to jwt online in login route backend, just grabbing uid from jwt token 
            const { uid } = decoded
            getUserByUID(uid)
            .then(user => {
                dispatch(setUser(user))
            }).catch(error => {
                console.log("error ",error.message);
            })
        }

    },[])

    return (
        <div className='home'>
            <div className='home__container'>
                <div className='home__content__container'>
                    <img className='home__img' src="https://c.tenor.com/ak6js9w3VSIAAAAC/todos.gif" alt="" />
                    <div className='home__container'>
                        <div className='home__components'>  
                            <Header />
                            <AddTodos />
                            <TodoList/>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
