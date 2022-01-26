import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "../css/AddTodo.css"
import jwt_decode from "jwt-decode";
import { getUserByUID } from '../api/user'
import { createTodo } from '../api/todo'
import { addTodo } from "../actions/userActions"
import AddBoxIcon from '@mui/icons-material/AddBox';

const AddTodos = () => {

    const { user } = useSelector(state => state.userState )
    const dispatch = useDispatch()
    const [ empty, setEmpty ] = useState(false)
    
    const [ todo, setTodo ] = useState({
        task: "",
        completed: false,
        active: false,
        priority: 0,
        user_uid: ""
    })

    const { task, completed, active, priority, user_uid } = todo

    useEffect(() => {

        if(user){
            // console.log("user 2 ", user);
            setTodo({...todo, user_uid: user.uid}) 
        }
          
    },[user])

    

    function submitTodo(e){

        if(!todo.task)
        {
            setEmpty(true)
            return
        }
        if(!completed && !active ){
            todo.active = !todo.active
        }

        setEmpty(false)
        e.preventDefault()
        createTodo(todo)
        .then(response => {
            dispatch(addTodo(response))
            setTodo({...todo, task: "", active: false, completed: false})
        }).catch(error => {
            console.log("error ",error.message);
        })

    }

    function onChangeTask(e){
        e.preventDefault()
        setTodo({...todo, [e.target.name] : e.target.value})
        setEmpty(false)

    }

    

    return (
        <div className='addTodo__container'>
            <form className='addTodo__form' onSubmit={e => submitTodo(e)}>
                <div className='addTodo__task'>
                    <div>
                        <label htmlFor='task' >Todo </label>
                        <input name="task" value={task} onChange={ e => onChangeTask(e)}/>
                    </div>
                    {empty && <span >Task cannot be empty</span>}
                </div>
                <div className='addTodo__inputs'>
                    <div className='addTodo__priority'> 
                        <label htmlFor='priority' >priority</label>
                        <select name="priority" value={priority} onChange={ e => setTodo({...todo, [e.target.name]: Number(e.target.value)})}>
                            <option value={0}>low</option>
                            <option value={1}>moderate</option>
                            <option value={2}>high</option>
                            <option value={3}>very high</option>
                        </select>
                    </div>
                    { !active && 
                        <div className='addTodo__completed'>
                            <label htmlFor='completed'>completed</label>
                            <input name="completed" type="checkbox"
                                defaultChecked={completed}
                                onChange={() => setTodo({...todo, completed: !completed})}
                            />
                        </div>
                    }
                    { !completed && 
                        <div className='addTodo__active'>
                            <label htmlFor='active' >active</label>
                            <input name="active" type="checkbox"
                                defaultChecked={active}
                                value={active}
                                onChange={() => setTodo({...todo, active: !active})}
                            />
                        </div>
                    }
                    
                    <span className='addTodo__addBoxIcon'>
                        <AddBoxIcon onClick={e => submitTodo(e)}/>
                    </span>
                </div>
                
            </form>     
        </div>
    )
}

export default AddTodos
