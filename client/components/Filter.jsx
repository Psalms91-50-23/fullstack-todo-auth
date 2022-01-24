import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../css/Filter.css"
import { filterTodos } from '../actions/userActions'

const Filter = ({userTodos}) => {

    const dispatch = useDispatch()
    const { filter } = useSelector(state => state.userState)
    console.log("filter ", filter);
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


    // useEffect(() => {

    //     setFilteredTodos({
    //      ...filterTodos, priority
    //     })
        
    // },[filteredTodos.priority])
    // const { completed, active, priority, all } = filteredTodos

    // useEffect(() => {
    //     setFilteredTodos({...filterTodos, all})
    // },[all])

    function onSubmit(e){
        e.preventDefault()
        if(all){
            // setUserTodos(userTodos)
            dispatch(filterTodos(null))
        }else if(priority !== -1 || !all){
            dispatch(filterTodos(filteringTodos(userTodos)))
            // filterTodos(userTodos)
        }
        // dispatch(filterTodos(filteredTodos))
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
            console.log("todo in filter ", todo);
            console.log("active in filter ",active);
            console.log("completed in filter ",completed);
            console.log("priority in filter ",priority );
            if(todo.active === filteredTodos.active && todo.completed === filteredTodos.completed && todo.priority === filteredTodos.priority && filteredTodos.all === false){
                console.log("in the filter ");
                return todo
            }
        })
        console.log("after filter ", filtered);
        return filtered
    }

    console.log("filter todos ", filteredTodos);    
    return (
        <div className='filter'>
            <h1>Filter search</h1>
            {textOnScreen(filteredTodos.priority)}
            <form onSubmit={e => onSubmit(e)} className='filter__form'>
                {all ?
                    <div>
                        <label htmlFor='defaultValue'>All </label>
                        <input 
                            name="all" 
                            type="checkbox"
                            defaultChecked={all}
                            onChange={(e) => setFilteredTodos({...filteredTodos, [e.target.name]: !all})}
                        />
                        <button onClick={(e) => onSubmit(e)}>filter</button>
                        {/* <button type='submit'>filter</button> */}
                    </div>
                    :
                    <div className='filter__container'>
                        <div className='filter__inputs'>
                            <label htmlFor='all'>All </label>
                            <input 
                                name="all" 
                                type="checkbox"
                                defaultChecked={all}
                                onChange={(e) => setFilteredTodos({...filteredTodos, [e.target.name]: !all})}
                            />
                            {!active && 
                                <div className='filter__completed'>
                                    <label htmlFor='completed'>completed </label>
                                    <input 
                                        name="completed" 
                                        type="checkbox"
                                        defaultChecked={completed}
                                        onChange={(e) => setFilteredTodos({...filteredTodos, [e.target.name]: !completed})}
                                    />
                                </div>

                            }
                            {!completed && 
                                <div className='filter__active'>
                                    <label htmlFor="active">active: </label>
                                    <input 
                                        name="active" 
                                        type="checkbox"
                                        defaultChecked={active}
                                        onChange={ e => setFilteredTodos({...filteredTodos, [e.target.name]: !active}) }
                                    /> 
                                </div>

                            }
                            <div className='filter__priority'>
                                <label htmlFor='priority' >priority: </label>
                                <select 
                                    name="priority" 
                                    // defaultValue={4}
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
                            <button onClick={(e) => onSubmit(e)}>filter</button>
                        </div>   
                    </div>    
                }
                {/* <button onClick={(e) => onSubmit(e)}>filter</button>         */}
            </form>  
        </div>
    )
}

export default Filter
