import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../css/Filter.css"
import { filterTodos } from '../actions/userActions'

const Filter = ({userTodos}) => {

    const dispatch = useDispatch()
    const priorityIndex = ["low","moderate","high","very high"]
    const [ filteredTodos, setFilteredTodos ] = useState({

        completed: false,
        active: false,
        priority: -1,
        all: false,

    })
    const { completed, active, priority, all } = filteredTodos

    function onSubmit(e){
        e.preventDefault()
        if(all || priority === -1 && !active && !completed ){
            // setUserTodos(userTodos)
            dispatch(filterTodos(null))
        }
        else{
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

    useEffect(() => {

        if(priority >= 0 ){
            setFilteredTodos({...filteredTodos, priority})
        }

    },[priority])

    useEffect(() => {

        setFilteredTodos({...filteredTodos, active: active})
        
    },[active])

    useEffect(() => {

         setFilteredTodos({...filteredTodos, completed})
  
    },[completed])

    useEffect(() => {

        setFilteredTodos({...filteredTodos, all})

    },[all])


    function filteringTodos(todos){

        const filtered = todos.filter((todo, id) => {

            //converting filtered.priority Number to store a string value instead, a word string not a number string
            if(priority >= 0){

                filterTodos.priority = priorityIndex[priority]
                
            }
            
            if( priority >= 0 && !all && !active  && !completed  && filterTodos.priority === todo.priority ){
                return todo
            }
            else if( priority >= 0 && !all && !active  && completed  && filterTodos.priority === todo.priority && completed === todo.completed ||
                priority >= 0 && !all && active  && !completed  && filterTodos.priority === todo.priority && active === todo.active ){
                return todo
            }
            else if( filteredTodos.priority === -1 && active && todo.active === active || 
                filteredTodos.priority === -1 && completed  && todo.completed === completed){
                    return todo
            }
            else if( filteredTodos.priority === -1 && !active && !completed ){
                return todo
            }
            else if( filteredTodos.priority >= 0 && todo.active === active && todo.priority === filteredTodos.priority || 
                filteredTodos.priority >= 0 && todo.completed === completed && todo.priority === filteredTodos.priority ){
                    return todo
            }
           
        })
        // console.log("filtered ",filtered);
        return filtered
    }

    // console.log("filteredTodos ", filteredTodos);

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
