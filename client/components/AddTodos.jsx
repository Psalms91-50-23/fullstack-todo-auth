import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux'
import "../css/Todos.css"
import jwt_decode from "jwt-decode";
import { getUserByUID } from '../api/user'
import { createTodo } from '../api/todo'

const AddTodos = () => {

    const { user } = useSelector(state => state.userState )
    const [ currentUser, setCurrentUser ] = useState("")
    const [ userUID, setUserUID ] = useState("")
    const dispatch = useDispatch()
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
            setCurrentUser(user)
            console.log("user 2 ", user);
            setTodo({...todo, user_uid: user.uid}) 
        }
        
        
    },[user])


    const [ selection, setSelection ] = useState("")

    function onChangeHandler(e){
        e.preventDefault()
        setTodo({...todo, [e.target.name] : e.target.value})
    }

    function submitTodo(){

        createTodo(todo, localStorage.getItem("auth-token"))
        .then(response => {
            console.log("create do returned ", response);
        }).catch(error => {
            console.log("error ",error.message);
        })

    }

    const { task, completed, active, priority, user_uid } = todo
    console.log("task ",task);
    return (
        <div className='todos'>
            {/* <h3>Add Todos</h3> */}
           
            {/* <Select options={options}/> */}
            <div className='todos_selection'>
                <div>
                    <label htmlFor='task' >todo: </label>
                    <input name="task" value={task} onChange={e => setTodo({...todo, task: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor='priority' >priority: </label>
                    <select names="priority" value={priority} id="priority" onChange={ e => setTodo({...todo, priority: e.target.value})}>
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
                    <button onClick={submitTodo}>+</button>
                </div>
               
            </div>
        
        </div>
    )
}

export default AddTodos
