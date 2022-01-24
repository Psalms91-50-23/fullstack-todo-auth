import React, { useState, useEffect} from 'react'
import { updateTodoByID, getTodoById } from '../api/todo.js'
import { updateTodo, deleteTodo, updateThisTodo } from '../actions/userActions'
import "../css/EditTodo.css"
// import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux'
import AddBoxIcon from '@mui/icons-material/AddBox';
const priorityIndex = ["low","moderate","high","very high"]

const Edit = ({ todo, toggleEdit }) => {

     const [ userTodo, setUserTodo ] = useState({
        id: todo.id,
        user_uid: todo.user_uid,
        task: todo.task,
        completed: todo.completed,
        active: todo.active,
        priority: todo.priority,
    })
    const dispatch = useDispatch()

   


    function submitTodo(e){

        if(userTodo.active && userTodo.completed){
            return setError(true)
        }
        // setError(false)
        e.preventDefault()
        updateTodoByID(id, userTodo)
        .then(response => {
            // console.log("response from update todo", response);
            // const { oldTodo, updatedTodo, message } = response
            dispatch(updateTodo(response))
            setUserTodo(response)
            toggleEdit()
        }).catch(error => {
            console.log("error ",error.message);
        }) 
    }

    const { id, completed, active, priority, task } = userTodo
    console.log("edit user todo ", userTodo);

  return (

    <div className="editTodo">
        { <div className='editTodo__text'>
            {/* <p>
                userTodo priority:  {userTodo.priority.toString()}
            </p>
            <p>
                priority:  {priorityIndex[userTodo.priority]}
            </p> */}
            <p>
                active {active.toString()} <br/>
                completed {completed.toString()}
            </p>

        </div> }
        {/* <div className="todos__selection"> */}
            <form className="editTodo__form" onSubmit={(e) => submitTodo(e)}>
                    <div className="editTodo__task">
                        <label className='editTodo__label' htmlFor='task' >todo: </label>
                        <input 
                            className='editTodo__input' 
                            name="task" value={task} 
                            onChange={(e) => setUserTodo({...userTodo, [e.target.name] : e.target.value})}
                        />
                    </div>
                    <div className="editTodo__checkBoxContainer">
                        <div className='editTodo__priority'>
                            <label htmlFor='priority' >priority: </label>
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
                                {/* <p>
                                    completed {userTodo.completed.toString()}
                                </p> */}
                                <label htmlFor='completed'>completed </label>
                                <input 
                                    name="completed" 
                                    type="checkbox"
                                    //setting default value to the todo passed down as props
                                    defaultChecked={completed}
                                    onChange={(e) => setUserTodo({...userTodo, [e.target.name] : !completed})}
                                />
                           </div> 

                       }
                       {
                           !completed &&
                            <div className='editTodo__active'>
                                {/* <p>
                                    active {userTodo.active.toString()}
                                </p> */}
                                <label htmlFor="active">active: </label>
                                <input 
                                    name="active" 
                                    type="checkbox"
                                    //setting default value to the todo passed down as props
                                    defaultChecked={active}
                                    onChange={(e) => setUserTodo({...userTodo, [e.target.name] : !active}) }
                                /> 
                            </div>

                       }
                        {/* { !active && !completed &&
                            <>
                                <div className='editTodo__completed'>
                                <p>
                                    completed {userTodo.completed.toString()}
                                </p>
                                <label htmlFor='completed'>completed </label>
                                <input 
                                    name="completed" 
                                    type="checkbox"
                                    //setting default value to the todo passed down as props
                                    defaultChecked={completed}
                                    onChange={(e) => onChangeCompleteHandler(e)}
                                />
                                </div> 
                                <div className='editTodo__active'>
                                    <p>
                                        active {active.toString()}
                                    </p>
                                    <label htmlFor="active">active: </label>
                                    <input 
                                        name="active" 
                                        type="checkbox"
                                        //setting default value to the todo passed down as props
                                        defaultChecked={active}
                                        onChange={(e) => onChangeCompleteHandler(e) }
                                    /> 
                                </div>
                            </>
                        }
                        { active && !completed &&
                            <>
                             
                                <div className='editTodo__active'>
                                    <p>
                                        active {active.toString()}
                                    </p>
                                    <label htmlFor="active">active: </label>
                                    <input 
                                        name="active" 
                                        type="checkbox"
                                        //setting default value to the todo passed down as props
                                        defaultChecked={active}
                                        onChange={(e) => onChangeCompleteHandler(e) }
                                    /> 
                                </div>
                            
                            </>

                        }
                        {
                            !active && completed &&
                            <>
                                <div className='editTodo__completed'>
                                <p>
                                    completed {userTodo.completed.toString()}
                                </p>
                                <label htmlFor='completed'>completed </label>
                                <input 
                                    name="completed" 
                                    type="checkbox"
                                    //setting default value to the todo passed down as props
                                    defaultChecked={completed}
                                    onChange={(e) => onChangeCompleteHandler(e)}
                                />
                                </div> 
                            
                            </>

                        } */}
                        
                        
                        {/* { 
                        
                        active ? 
                            <div className='editTodo__completed'>
                                <p>
                                    completed {userTodo.completed.toString()}
                                </p>
                                <label htmlFor='completed'>completed </label>
                                <input 
                                    name="completed" 
                                    type="checkbox"
                                    //setting default value to the todo passed down as props
                                    defaultChecked={active}
                                    onChange={(e) => setUserTodo({...userTodo, [e.target.name] : !active})}
                                />
                            </div>
                            :
                            <div className='editTodo__completed'>
                                <p>
                                    completed {userTodo.completed.toString()}
                                </p>
                                <label htmlFor='completed'>completed </label>
                                <input 
                                    name="completed" 
                                    type="checkbox"
                                    //setting default value to the todo passed down as props
                                    defaultChecked={todo.active}
                                    onChange={(e) => setUserTodo({...userTodo, [e.target.name] : active})}
                                />
                            </div> 
                        
                        } */}
                        {/* {!completed && 
                            <div className='editTodo__active'>
                                <p>
                                    active {userTodo.active.toString()}
                                </p>
                                <label htmlFor="active">active: </label>
                                <input 
                                    name="active" 
                                    type="checkbox"
                                    //setting default value to the todo passed down as props
                                    defaultChecked={todo.active}
                                    onChange={(e) => setUserTodo({...userTodo, [e.target.name] : }) }
                                /> 
                            </div>
                        } */}
                        {/* {
                        
                        completed ?
                            <div className='editTodo__active'>
                                <p>
                                    active {userTodo.active.toString()}
                                </p>
                                <label htmlFor="active">active: </label>
                                <input 
                                    name="active" 
                                    type="checkbox"
                                    //setting default value to the todo passed down as props
                                    defaultChecked={todo.completed}
                                    onChange={(e) => setUserTodo({...userTodo, [e.target.name] : !completed}) }
                                /> 
                            </div>
                            :
                            <div className='editTodo__active'>
                                <p>
                                    active {userTodo.active.toString()}
                                </p>
                                <label htmlFor="active">active: </label>
                                <input 
                                    name="active" 
                                    type="checkbox"
                                    //setting default value to the todo passed down as props
                                    defaultChecked={completed}
                                    onChange={(e) => setUserTodo({...userTodo, [e.target.name] : completed}) }
                                /> 
                            </div>
                        } */}
                        {/* <span onClick={(e) => submitTodo(e)} className='editTodo__addBoxIcon'>
                            <AddBoxIcon/>
                        </span> */}
                        <div className='editTodo__addBoxIcon' onClick={(e) => submitTodo(e)}>
                            {/* <p onClick={(e) => submitTodo(e)}>
                            </p> */}
                                <span  onClick={(e) => submitTodo(e)} >
                                    <AddBoxIcon/>
                                </span>
                        </div>
                    </div>
            </form>
        {/* </div> */}
    </div>
      
  )
}

export default Edit;
