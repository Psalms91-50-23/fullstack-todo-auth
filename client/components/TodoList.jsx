import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import jwt_decode from "jwt-decode";
import { getUserByUID } from '../api/user'
import { getAllUserTodosByUID } from '../api/todo'
import Todo from './Todo';
import { setTodos, load } from "../actions/userActions"
import "../css/Todo.css"
import Loading from './Loading';
import { logoutUser } from '../api/user'
import Filter from './Filter'
import "../css/TodoList.css"

const TodoList = () => {

    const [ userTodos, setUserTodos ] = useState([])
    const dispatch = useDispatch()
    const { user, todos, loading, filter } = useSelector(state => state.userState )
    const [ loadingTodos, setLoadingTodos ] = useState(false)
    useEffect(() => {

        if(user){
            dispatch(load(true))
            // const token = localStorage.getItem("auth-token")
            // console.log("token in todolist ", token);
            const { uid }= user
            getAllUserTodosByUID(uid)
            .then(todos => {
                dispatch(setTodos(todos))
                dispatch(load(false))
            }).catch(error => {
                console.log("error ",error.message);
                logout()
                location.reload()
                
            })
        }
        
    },[user])

    useEffect(() => {

        if(todos){

            // console.log("todo length change ", todos.length);
            setUserTodos(todos)
        }

    }, [todos])

    useEffect(() => {

        setLoadingTodos(loading)
        // console.log("loading todos  ",loadingTodos);

    },[loading])


    function logout(){
        // const authToken = localStorage.getItem("auth-token")
        logoutUser()
        .then(response => {
            // console.log("response in logout homepage  ", response);
            localStorage.removeItem('auth-token');
            //user logged out, push to login page/ which is home
            history.push("/")
            
        })
        .catch(error => {
            console.log("error ", error.message);
        })
    }


    return (
        <div className='todoList'>
            <h2>Todo list</h2>
            <Filter setUserTodos={setUserTodos} userTodos={userTodos}/>
            <h4>User: {user?.email}</h4>
            {!loadingTodos && filter ? (filter?.map(todo => {
                const { id } = todo
                return  (<Todo key={id} todo={todo}/>)
                }))
                :
                (userTodos?.map(todo => {
                    const { id } = todo
                    return  (<Todo key={id} todo={todo}/>)
                    }))
            }
            {loadingTodos && <Loading/>}
        </div>
    )
}

export default TodoList
