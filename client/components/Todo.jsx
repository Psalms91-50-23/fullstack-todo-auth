import React, { useState, useEffect} from 'react'
import "../css/Todo.css"
// updateUserTodoByID
import { useDispatch } from 'react-redux'
import { updateTodoByID } from '../api/todo'
import { updateTodo } from '../actions/userActions'

const Todo = ({todo}) => {

    const dispatch = useDispatch()
    const { task, user_uid, id, completed, priority, active, created_at, updated_at } = todo 
    const [ toggle, setToggle ] = useState(false)

    const [ userTodo, setUserTodo ] = useState({
        task: "",
        completed: 0,
        active: 0,
        priority: "",
        user_uid: todo.user_uid
    })


    useEffect(() => {
        setUserTodo({
            ...userTodo,
            task: todo.task,
            completed: todo.completed,
            active: todo.active,
            priority: todo.priority,
        })
    },[])
    console.log("todo in todo ", todo);

    function toggleEdit(){
        setToggle(!toggle)
    }
// updateUserTodoByID(todoId, todo, token)
    function submitTodo(e){

        e.preventDefault()
        updateTodoByID(id, userTodo, localStorage.getItem("auth-token"))
        .then(response => {
            console.log("response from update todo", response);
            dispatch(updateTodo(response))
            setUserTodo(response)
        }).catch(error => {
            console.log("error ",error.message);
        })

    }

    function onChangeHandler(e){
        e.preventDefault()
        if([e.target.name] === "completed"){
            setUserTodo({...todo, [e.target.name] : !completed})
        }
        else if([e.target.name] === "active"){
            setUserTodo({...todo, [e.target.name] : !active})
        }
        else{

            setUserTodo({...todo, [e.target.name] : e.target.value})
        }
    }

    // const { task, completed, active, priority } = userTodo


    function editTodo(todo){

        return (
            <div className='todos'>
            {/* <h3>Add Todos</h3> */}
           
            {/* <Select options={options}/> */}
            <div className='todos_selection'>
                <div>
                    <label htmlFor='task' >todo: </label>
                    <input name="task" value={userTodo.task} onChange={e => onChangeHandler(e)}/>
                </div>
                <div>
                    <label htmlFor='priority' >priority: </label>
                    <select names="priority" value={userTodo.priority} id="priority" onChange={ e => onChangeHandler(e)}>
                        <option value={0}>low</option>
                        <option value={1}>moderate</option>
                        <option value={2}>high</option>
                        <option value={3}>very high</option>
                    </select>
                    <label htmlFor='completed' >completed: </label>
                    <input name="completed" type="checkbox"
                        defaultChecked={userTodo.completed}
                        onChange={() => setUserTodo({...userTodo, completed: !completed})}
                    />
                    <label htmlFor='active' >active: </label>
                    <input name="active" type="checkbox"
                        defaultChecked={userTodo.active}
                        onChange={() => setUserTodo({...userTodo, active:!active})}
                    />
                    <button onClick={submitTodo}>+</button>
                </div>
            </div> 
        </div>
        )
    }

    console.log('userTodos in todo.jsx ', userTodo);

    return (
        <div className='todo__container'>
            <div className='todo__details'>
                {
                    <p>toggle: {toggle.toString()}</p>
                }
                { toggle? 
                    (editTodo(todo))
                    :
                    (
                        <>
                            <h3>todo</h3>
                            <h6> task: {task}</h6>
                            <h6> user_uid: {user_uid}</h6>
                            <h6> completed: {completed.toString()}</h6>
                            <h6> active: {active.toString()}</h6>
                            <h6> priority: {priority}</h6>
                            <h6> created_at: {created_at}</h6>
                            <h6> updated_at: {updated_at}</h6>
                        </>
                    )
                }
            </div>
            <div>
                <p className='todo__toggle' onClick={toggleEdit}>...</p>
            </div>
        </div>
    )
}

export default Todo
