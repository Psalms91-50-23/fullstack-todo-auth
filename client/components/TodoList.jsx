import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
            const { uid }= user
            getAllUserTodosByUID(uid)
            .then(todos => {
                dispatch(setTodos(todos))
                dispatch(load(false))
            }).catch(error => {
                console.log("error ",error.message);
                //error token expired/invalid logout and reload browser, otherwise it stays on loading error
                logout()
                location.reload()       
            })
        }
        
    },[user])

    useEffect(() => {
        if(todos){
            setUserTodos(todos)
        }
    }, [todos])

    useEffect(() => {
        setLoadingTodos(loading)
    },[loading])

    function logout(){
        logoutUser()
        .then(response => {
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
            <div className='todoList__title'>
                <h1>Todo List</h1>
            </div>
            <Filter userTodos={userTodos}/> 
            <div className='todoLists__content'>
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
            
        </div>
    )
}

export default TodoList