import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../css/Filter.css"
import { filterTodos } from '../actions/userActions'

const Filter = ({userTodos}) => {

    const dispatch = useDispatch()
    const { filter } = useSelector(state => state.userState)
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
        }else if(priority !== -1 || !all){
            dispatch(filterTodos(filteringTodos(userTodos)))
        }

    }

    function textOnScreen(){

        if(filteredTodos.priority == -1){
            return (
            <> 
                <h2>top</h2>
                <p>priority: {filteredTodos.priority}</p>
                <p>priority: none</p>
                <p>all {filteredTodos.all.toString()}</p>
            </>)
            
        }else {
            return ( 
            <>
                <h2>bottom</h2>
                <p>priority: {filteredTodos.priority}</p>
                <p>priority: {priorityIndex[priority]}</p>
                <p>all {filteredTodos.all.toString()}</p>
            </>)
        }
    }

    function filteringTodos(todos){
        const filtered = todos.filter(todo => {
       
            if(todo.active === filteredTodos.active && todo.completed === filteredTodos.completed && todo.priority === filteredTodos.priority && filteredTodos.all === false){
                return todo
            }
        })
        return filtered
    }

    return (
        <div className='filter'>
            <h1>Filter search</h1>
            {textOnScreen()}
            <form onSubmit={e => onSubmit(e)} className='filter__form'>
                {all ?
                    <div>
                        <label htmlFor='all'>All</label>
                        <input 
                            name="all" 
                            type="checkbox"
                            defaultChecked={all}
                            onChange={(e) => setFilteredTodos({...filteredTodos, [e.target.name]: !all})}
                        />
                        <button onClick={(e) => onSubmit(e)}>filter</button>
                    </div>
                    :
                    <div className='filter__container'>
                        <div className='filter__inputs'>
                            <input 
                                name="all" 
                                type="checkbox"
                                defaultChecked={all}
                                onChange={(e) => setFilteredTodos({...filteredTodos, [e.target.name]: !all})}
                            />
                            <label htmlFor='all'>All</label>
                            {!active && 
                                <div className='filter__completed'>
                                    <input 
                                        name="completed" 
                                        type="checkbox"
                                        defaultChecked={completed}
                                        onChange={(e) => setFilteredTodos({...filteredTodos, [e.target.name]: !completed})}
                                    />
                                    <label htmlFor='completed'>completed</label>
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
                                    <label htmlFor="active">active</label>
                                </div>
                            }
                            <div className='filter__priority'>
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
                                <label htmlFor='priority' >priority</label>      
                            </div>
                            <button onClick={(e) => onSubmit(e)}>filter</button>
                        </div>   
                    </div>    
                }
            </form>  
        </div>
    )
}

export default Filter
