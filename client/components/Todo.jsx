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
    // console.log("in todo jsx  ", todo);
    
    const { user, todos } = useSelector(state => state.userState )
    const foundTodo = todos.find(thisTodo  => thisTodo.id === todo.id)
    const dispatch = useDispatch()
    
    const [ toggle, setToggle ] = useState(false)
    // const d = new Date( created_at );
    // var date = new Date("2016-07-27T07:45:00Z");
    // console.log( date );
    // console.log("date ",new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(created_at));
    // console.log("date ",date);
    const [ userTodo, setUserTodo ] = useState({
        id:"",
        task: "",
        completed: "",
        active: "",
        priority: "",
        user_uid: ""
    })

    const { task, user_uid, id, completed, priority, active, created_at, updated_at } = todo 

    useEffect(() => {
        setUserTodo({
            ...userTodo,
            id,
            user_uid: todo.user_uid,
            task,
            completed,
            active,
            priority: priority,
        })
        
    },[])

    function toggleEdit(){

        setToggle(!toggle)

    }

    function submitTodo(e, id){

        e.preventDefault()
        updateTodoByID(foundTodo.id, userTodo)
        .then(response => {
            // const { oldTodo, updatedTodo, message } = response
            dispatch(updateTodo(response))
            setUserTodo(response)
            toggleEdit()
        }).catch(error => {
            console.log("error ",error.message);
        }) 
    }

    function editTodo(userTodo){

        return (
            <div className='todos'>
                <p>
                    toggle {toggle.toString()} <br/>
                    userTodo priority:  {userTodo.priority} <br/>
                    active {userTodo.active.toString()} <br/>
                    completed {userTodo.completed.toString()}
                </p>
                <div className='todos_selection'>
                    <form onSubmit={(e) => submitTodo(e)}>
                        <div className='todos__selection__taskContainer'>
                            <label className='todos__selection__taskLabel' htmlFor='task' >todo: </label>
                            <input className='todos__selection__task' name="task" value={userTodo.task} onChange={(e) => setUserTodo({...userTodo, [e.target.name] : e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor='priority' >priority: </label>
                            <select name="priority" value={userTodo.priority} onChange={ (e) =>  setUserTodo({...userTodo, [e.target.name]: e.target.value })}>
                                <option value={0}>low</option>
                                <option value={1}>moderate</option>
                                <option value={2}>high</option>
                                <option value={3}>very high</option>
                            </select>
                           
                            <label htmlFor='completed' >completed: </label>
                            <input name="completed" type="checkbox"
                                defaultChecked={userTodo.completed}
                                onChange={(e) => setUserTodo({...userTodo, [e.target.name] : !completed})}
                            />
                            <label htmlFor='active' >active: </label>
                            <input name="active" type="checkbox"
                                defaultChecked={userTodo.active}
                                onChange={(e) => setUserTodo({...userTodo, [e.target.name] : !active})}
                            />
                            <p onClick={(e) => submitTodo(e)}><span className='todo__addBoxIcon'><AddBoxIcon/></span></p>
                        </div>
                    </form>
                </div> 
            </div> 
        )

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
                {
                    <p>toggle: {toggle.toString()}</p>
                }
                { toggle?
                     <EditTodo todo={todo} todoId={todo.id} toggleEdit={toggleEdit}/>
                    :
                    <div className='todo__info'>
                        <div className=''>
                            {/* <p>
                                priority: {priority}
                            </p> */}
                            <h3> todo </h3>
                            <p> id: {id}</p>
                            <p> task: {task}</p>
                            <p> user_uid: {user_uid}</p>
                            <p> completed: {completed.toString()}</p>
                            <p> active: {active.toString()}</p>
                            <p> priority: {priorityIndex[priority]}</p>
                            <p> 
                                created_at: {new Date(created_at).toTimeString()}
                            </p>
                            <p> 
                                updated_at: {new Date(updated_at).toTimeString()}
                                
                            </p>
                            {/* <p> created_at: {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(created_at)}
                            </p>
                            <p> updated_at: {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(updated_at)}
                            </p> */}
                            
                        </div> 
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
