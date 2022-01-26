import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../css/Filter.css"
import { filterTodos } from '../actions/userActions'

const Filter = ({userTodos}) => {

    const dispatch = useDispatch()
    // const { filter } = useSelector(state => state.userState)
    const priorityIndex = ["low","moderate","high","very high"]
    const [ filteredTodos, setFilteredTodos ] = useState({
        completed: "",
        active: "",
        priority: "",
        all: "",
    })
    const { completed, active, priority, all } = filteredTodos
    useEffect(() => {

        setFilteredTodos({
            completed: false,
            active: false,
            priority: -1,
            all: false,
        })

    },[])



    function onSubmit(e){
        e.preventDefault()
        if(all){
            // setUserTodos(userTodos)
            dispatch(filterTodos(null))
        }else{
            dispatch(filterTodos(filteringTodos(userTodos)))
        }

    }

    function textOnScreen(){

        if(filteredTodos.priority == -1){
            return (
            <> 
                {/* <h2>top</h2> */}
                <p>priority: {filteredTodos.priority}</p>
                <p>priority: none</p>
                <p>all {filteredTodos.all.toString()}</p>
            </>)
            
        }else {
            return ( 
            <>
                {/* <h2>bottom</h2> */}
                <p>priority: {filteredTodos.priority}</p>
                <p>priority: {priorityIndex[priority]}</p>
                <p>all {filteredTodos.all.toString()}</p>
            </>)
        }
    }
/*
//todo.priority === filteredTodos.priority 
*/

/* 
 if(todo.active === filteredTodos.active && todo.completed === filteredTodos.completed && filteredTodos.priority !== -1 && filteredTodos.all === false){
                console.log("filteredTodos ", filteredTodos);
                console.log("inside filter");
                return todo
            }
*/
    function filteringTodos(todos){

        const filtered = todos.filter((todo, id) => {
          
            if(filteredTodos.priority === -1 && filteredTodos.active === true && todo.active === filteredTodos.active || 
                filteredTodos.priority === -1 && filteredTodos.completed === true && todo.completed === filteredTodos.completed){
                    return todo
            }
            else if(filteredTodos.priority >= 0 && todo.active === filteredTodos.active && todo.priority === filteredTodos.priority || 
                filteredTodos.priority >= 0 && todo.completed === filteredTodos.completed && todo.priority === filteredTodos.priority ){
                    return todo
            }else if(filteredTodos.priority === -1 && filteredTodos.active === false && filteredTodos.completed === false){
                return todo
            }

        })
        return filtered
    }

    return (
        <div className='filter'>
            <h3>Filter search</h3>
            {/* {textOnScreen()} */}
            <form onSubmit={e => onSubmit(e)} className='filter__form'>
                {all ?
                    <div className='filter__inputs'> 
                        <div className="filter__all">
                            <input 
                                name="all" 
                                type="checkbox"
                                defaultChecked={all}
                                onChange={(e) => setFilteredTodos({...filteredTodos, [e.target.name]: !all})}
                            />
                            <label htmlFor='all'>All</label>
                            <button onClick={(e) => onSubmit(e)}>Filter</button>
                        </div>
                    </div>
                    :
                    <div className='filter__container'>
                        <div className='filter__inputs'>
                            <div className='filter__all'>
                                <input 
                                    name="all" 
                                    type="checkbox"
                                    defaultChecked={all}
                                    onChange={(e) => setFilteredTodos({...filteredTodos, [e.target.name]: !all})}
                                />
                                <label htmlFor='all'>All</label>

                            </div>
                            {!active && 
                                <div className='filter__completed'>
                                    <input 
                                        name="completed" 
                                        type="checkbox"
                                        defaultChecked={completed}
                                        onChange={(e) => setFilteredTodos({...filteredTodos, [e.target.name]: !completed})}
                                    />
                                    <label htmlFor='completed'>Completed</label>
                                </div>

                            }
                            {!completed && 
                                <div className='filter__active'>
                                    <input 
                                        name="active" 
                                        type="checkbox"
                                        defaultChecked={active}
                                        onChange={ e => setFilteredTodos({...filteredTodos, [e.target.name]: !active}) }
                                    /> 
                                    <label htmlFor="active">Active</label>
                                </div>
                            }
                            <div className='filter__priority'>
                                <label htmlFor='priority' >Priority</label>
                                <select 
                                    name="priority" 
                                    value={priority}
                                    onChange={ e => setFilteredTodos({...filteredTodos, [e.target.name]: Number(e.target.value)}) }
                                >
                                    {/* <option value={0}>select</option> */}
                                    <option value={-1}>none</option>
                                    <option value={0}>low</option>
                                    <option value={1}>moderate</option>
                                    <option value={2}>high</option>
                                    <option value={3}>very high</option>
                            
                                </select>
                                     
                            </div>
                            <button className='filter__submitButton' onClick={(e) => onSubmit(e)}>Filter</button>
                        </div>   
                    </div>    
                }
            </form>  
        </div>
    )
}

export default Filter
