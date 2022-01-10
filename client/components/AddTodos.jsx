import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "../css/Todo.css"
import jwt_decode from "jwt-decode";
import { getUserByUID } from '../api/user'
import { createTodo } from '../api/todo'
import { addTodo } from "../actions/userActions"

const AddTodos = () => {

    const { user } = useSelector(state => state.userState )
    const dispatch = useDispatch()
    
    // const userToken = localStorage.getItem("auth-token")
    // console.log("userToken Home ", userToken);
  
    // console.log("history home ",history);
    // if(userToken){
    //     var decoded = jwt_decode(userToken);
    //     console.log("decoded in addtodo ", decoded);
    //     //sent uid to jwt online in login route backend, just grabbing uid from jwt token 
    //     const { uid } = decoded
    //     getUserByUID(uid)
    //     .then(user => {
    //         console.log("user in addtodo ", user);
    //         dispatch(setUser(user))
    //     }).catch(error => {
    //         console.log("error ",error.message);
    //     })
    // }

    // useEffect(() => {

    //     if(user){
    //        setCurrentUser(user)
    //     }

    // },[user])
    // const [ checked, setChecked ] = useState(true)
    // const [ isCompleted, setIsCompleted ] = useState(false)
    // const [ isCctive, setIsActive] = useState(true)

    // const userToken = localStorage.getItem("auth-token")
    // if(userToken){
    //   var decoded = jwt_decode(userToken);
    //   console.log("decoded ", decoded);
    //   //sent uid to jwt online in login route backend, just grabbing uid from jwt token 
    //   const { uid } = decoded
    //   getUserByUID(uid)
    //   .then(user => {
    //     console.log("user in add todo ", user);
    //     dispatch(setUser(user))

    //   }).catch(error => {
    //     console.log("error ",error.message);
    //   })
    // }




    const [ todo, setTodo ] = useState({
        task: "",
        completed: false,
        active: true,
        priority: 0,
        user_uid: ""
    })

 
    useEffect(() => {

        if(user){
            console.log("user 2 ", user);
            setTodo({...todo, user_uid: user.uid}) 
        }
          
    },[user])


    function onChangeHandler(e){
        e.preventDefault()
        if([e.target.name] === "completed"){
            setTodo({...todo, [e.target.name] : !completed})
        }
        else if([e.target.name] === "active"){
            setTodo({...todo, [e.target.name] : !active})
        }
        else{

            setTodo({...todo, [e.target.name] : e.target.value})
        }
    }

    function submitTodo(e){

        e.preventDefault()
        createTodo(todo, localStorage.getItem("auth-token"))
        .then(response => {
            console.log("create do returned ", response);
            dispatch(addTodo(response))
            setTodo({...todo, task: ""})
        }).catch(error => {
            console.log("error ",error.message);
        })

    }

    const { task, completed, active, priority, user_uid } = todo
    // console.log("task ",task);
    // console.log('user in addtodo ', user);
    return (
        <div className='todos'>
            {/* <h3>Add Todos</h3> */}
           
            {/* <Select options={options}/> */}
            <div className='todos_selection'>
                <form onSubmit={ e => submitTodo(e)}>
                    <div>
                        <label htmlFor='task' >todo: </label>
                        <input name="task" value={task} onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div>
                        <label htmlFor='priority' >priority: </label>
                        <select names="priority" value={priority} id="priority" onChange={ e => onChangeHandler(e)}>
                            <option value={0}>low</option>
                            <option value={1}>moderate</option>
                            <option value={2}>high</option>
                            <option value={3}>very high</option>
                        </select>
                        <label htmlFor='completed' >completed: </label>
                        <input name="completed" type="checkbox"
                            defaultChecked={completed}
                            onChange={() => setTodo({...todo, completed: !completed})}
                        />
                        <label htmlFor='active' >active: </label>
                        <input name="active" type="checkbox"
                            defaultChecked={active}
                            onChange={() => setTodo({...todo, active:!active})}
                        />
                        <button type="submit">+</button>
                    </div>
                </form>     
            </div> 
        </div>
    )
}

export default AddTodos
