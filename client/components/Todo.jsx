import React, { useState, useEffect} from 'react'
import "../css/Todo.css"
import { useSelector, useDispatch } from 'react-redux'
import { updateTodoByID, deleteTodoById } from '../api/todo.js'
import { updateTodo, deleteTodo, updateThisTodo } from '../actions/userActions'
import  DeleteForeverIcon  from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditTodo from './EditTodo'

// import moment from "moment"


const Todo = ({todo}) => {

    const priorityIndex = ["low","moderate","high","very high"]
    
    const { user, todos } = useSelector(state => state.userState )
    // const foundTodo = todos.find(thisTodo  => thisTodo.id === todo.id)
    const dispatch = useDispatch()
    
    const [ toggle, setToggle ] = useState(false)
    const [ userTodo, setUserTodo ] = useState({
        id,
        user_uid: todo.user_uid,
        task,
        completed,
        active,
        priority: priorityIndex.indexOf(priority),
    })

    const { task, user_uid, id, completed, priority, active, created_at, updated_at } = todo 


    function toggleEdit(){

        setToggle(!toggle)

    }

    function deleteById(){

        deleteTodoById(id)
        .then(() => {
            // console.log("response in delete ", response)
            dispatch(deleteTodo(id))

        }).catch(error => {
            console.log("error ",error.message);
        })

    }


    // console.log("todo in todo jsx ", todo);
    // console.log('userTodos in todo.jsx ', userTodo);

    return (
        <div className='todo__container'>
            <div className='todo__details'>
                {/* {
                    <p>toggle: {toggle.toString()}</p>
                } */}
                { toggle?
                     <EditTodo todo={todo} toggleEdit={toggleEdit}/>
                    :
                    <div className='todo__info'>
                        <h3>Todo</h3>
                        {/* <p> id: {id}</p> */}
                        <p><strong>Task:</strong> {task}</p>
                        {/* <p> user_uid: {user_uid}</p> */}
                        <p><strong>Completed:</strong> {completed.toString()}</p>
                        <p><strong>Active:</strong> {active.toString()}</p>
                        <p><strong>Priority:</strong> {priority}</p>
                        <p> 
                            <strong>Created at:</strong> {created_at}
                        </p>
                        <p> 
                            <strong>Updated at:</strong> {updated_at}   

                        </p>
                    </div>
                    
                }
            </div>
            <div className='todo__buttons'>
                <p className='todo__edit' onClick={toggleEdit}>
                    <span className='todo__edit__button'>
                        <EditIcon />
                    </span>
                </p>
                <p className='todo__delete' onClick={deleteById}>
                    <span className='todo__delete__button'>
                        <DeleteForeverIcon />
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Todo
