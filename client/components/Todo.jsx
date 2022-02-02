import React, { useState, useEffect} from 'react'
import "../css/Todo.css"
import { useDispatch } from 'react-redux'
import { deleteTodoById } from '../api/todo.js'
import { deleteTodo, updateThisTodo } from '../actions/userActions'
import  DeleteForeverIcon  from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import EditTodo from './EditTodo'

const Todo = ({todo}) => {

    const dispatch = useDispatch()
    const [ toggle, setToggle ] = useState(false)
    const { task, user_uid, id, completed, priority, active, created_at, updated_at } = todo 

    function toggleEdit(){
        setToggle(!toggle)
    }

    function deleteById(){
        deleteTodoById(id)
        .then(() => {
            dispatch(deleteTodo(id))
        }).catch(error => {
            console.log("error ",error.message);
        })
    }

    return (
        <div className='todo__container'>
            <div className='todo__details'>

                { toggle?
                     <EditTodo todo={todo} toggleEdit={toggleEdit}/>
                    :
                    <div className='todo__info'>
                        <h3>Todo</h3>
                        <p><strong>Task:</strong> {task}</p>
                        <p><strong>Completed:</strong> {completed.toString()}</p>
                        <p><strong>Active:</strong> {active.toString()}</p>
                        <p><strong>Priority:</strong> {priority}</p>
                        <p><strong>Created at:</strong> {created_at}</p>
                        <p><strong>Updated at:</strong> {updated_at}</p>
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