import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import jwt_decode from "jwt-decode";
import { getUserByUID } from '../api/user'
import { getAllUserTodosByUID } from '../api/todo'
import Todo from './Todo';
import { setTodos } from "../actions/userActions"
import "../css/Todo.css"

const TodoList = () => {

    const [ userTodos, setUserTodos ] = useState([])
    const dispatch = useDispatch()
    const { user, todos } = useSelector(state => state.userState )
    
    useEffect(() => {

        if(user){

            const token = localStorage.getItem("auth-token")
            // console.log("token in todolist ", token);
            // console.log("user in todolist ", user);
            const { uid }= user
            getAllUserTodosByUID(uid, token)
            .then(todos => {
                console.log("user todos ",todos);
                setUserTodos(todos)
                dispatch(setTodos(todos))
            }).catch(error => {
                console.log("error ",error.message);
            })
        }
        
    },[user])

    useEffect(() => {

        if(todos){
            
            setUserTodos(todos)
            // const token = localStorage.getItem("auth-token")
            // console.log("token ", token);
            // const { uid }= user
            // console.log("useEffect for todos.length ", user);
            // getAllUserTodosByUID(uid, token)
            // .then(todos => {
            //     console.log("user todos ",todos);
            //     setUserTodos(todos)
            //     dispatch(setTodos(todos))
            // }).catch(error => {
            //     console.log("error ",error.message);
            // })
        }

    }, [todos])
    console.log("todos ", todos, " todo length ", todos?.length);
    // console.log("user in todolist ", user);
    // console.log("user todolist ", userTodos);
    return (
        <div>
            <h2>Todo list</h2>
            <h4>User: {user?.email}</h4>
            {userTodos?.map(todo => {
                const { id } = todo
                return  (<Todo key={id} todo={todo}/>)
                })

            }
        </div>
    )
}

export default TodoList
