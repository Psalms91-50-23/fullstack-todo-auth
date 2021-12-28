import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import "../css/Todos.css"
import jwt_decode from "jwt-decode";
import { getUserByUID } from '../api/user'

const AddTodos = () => {

    const { user } = useSelector(state => state )
    const [ currentUser, setCurrentUser ] = useState("")
    const [ todos, setTodos ] = useState({

        task: "",
        completed: false,
        active: false,
        priority: 0,
        user_uid: ""

    })

    const [ value, setValue ] = useState("")
    const [ selection, setSelection ] = useState("")

    const options = [
        { value: 1, label: 'priority' },
        { value: 2, label: "moderate" },
        { value: 3, label: 'high' },
        { value: 4, label: 'very high' } 
      ]

    //   useEffect(() => {
    //     console.log("user  ", user);
    //     if(user){
    //         setCurrentUser(user)
    //     }

    //   },[user])


    console.log("currentUser in add todos ", currentUser);

    function onChangeHandler(e){
        e.preventDefault()


    }

    function onSubmitHandler(e){

    }


    console.log("seleciton value ",selection);

    return (
        <div className='todos'>
            {/* <h3>Add Todos</h3> */}
           
            {/* <Select options={options}/> */}
            <div className='todos_selection'>
                <input name="todos" value={value} onChange={e => setValue(e.target.value)}/>
                <select names="priority" value={selection} id="priority" onChange={ e => setSelection(e.target.value)}>
                    <option value={0}>low priority</option>
                    <option value={1}>moderate priority</option>
                    <option value={2}>high priority</option>
                    <option value={3}>very high priority</option>
                </select>
            </div>
            <div>
                <button type="submit">+</button>
            </div>
        
        </div>
    )
}

export default AddTodos
