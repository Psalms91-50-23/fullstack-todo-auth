import React, { useState, useEffect} from 'react'
import { updateTodoByID } from '../api/todo.js'
import { updateTodo } from '../actions/userActions'
import "../css/EditTodo.css"
import { useDispatch } from 'react-redux'
import AddBoxIcon from '@mui/icons-material/AddBox';
const priorityIndex = ["low","moderate","high","very high"]

const Edit = ({ todo, toggleEdit }) => {

    const [ submit, setSubmit ] = useState(false)
    const [ userTodo, setUserTodo ] = useState({
            id: todo.id,
            user_uid: todo.user_uid,
            task: todo.task,
            completed: todo.completed,
            active: todo.active,
            priority: priorityIndex.indexOf(todo.priority),
    })

    useEffect(() => {
        if(submit){  
            updateTodoByID(id, userTodo)
            .then(response => {
                setUserTodo(response)
                dispatch(updateTodo(response))
                setUserTodo(response)
                toggleEdit()               
            }).catch(error => {
                console.log("error ",error.message);
            }) 
        }
    },[submit])

    const dispatch = useDispatch()
    const { id, completed, active, priority, task } = userTodo

    function submitTodo(e){
        e.preventDefault()
        setSubmit(true)   
    }

  return (

    <div className="editTodo">
        <div className='editTodo__text'>
            <span>
                <strong>Active:</strong> {active.toString()}
            </span>
            <span>
                <strong>Completed:</strong> {completed.toString()}
            </span>
        </div> 
        <form className="editTodo__form" onSubmit={(e) => submitTodo(e)}>
                <div className="editTodo__task">
                    <label className='editTodo__label' htmlFor='task' >Todo: </label>
                    <input 
                        className='editTodo__input' 
                        name="task" value={task} 
                        onChange={(e) => setUserTodo({...userTodo, [e.target.name] : e.target.value})}
                    />
                </div>
                <div className="editTodo__checkBoxContainer">
                    <div className='editTodo__priority'>
                        <label htmlFor='priority' >Priority: </label>
                        <select name="priority" value={priority} onChange={ (e) =>  setUserTodo({...userTodo, [e.target.name]: e.target.value })}>
                            <option value={0}>low</option>
                            <option value={1}>moderate</option>
                            <option value={2}>high</option>
                            <option value={3}>very high</option>
                        </select>
                    </div>
                    {
                        !active && 
                        <div className='editTodo__completed'>
                            <label htmlFor='completed'>completed </label>
                            <input 
                                name="completed" 
                                type="checkbox"
                                defaultChecked={completed}
                                onChange={(e) => setUserTodo({...userTodo, [e.target.name] : !completed})}
                            />
                        </div> 
                    }
                    {
                        !completed &&
                        <div className='editTodo__active'>
                            <label htmlFor="active">active: </label>
                            <input 
                                name="active" 
                                type="checkbox"
                                defaultChecked={active}
                                onChange={(e) => setUserTodo({...userTodo, [e.target.name] : !active}) }
                            /> 
                        </div>
                    }
                    <div className='editTodo__addBoxIcon' onClick={(e) => submitTodo(e)}>
                        <span  onClick={(e) => submitTodo(e)} >
                            <AddBoxIcon/>
                        </span>
                    </div>
                </div>
        </form>
    </div>      
  )
}

export default Edit;