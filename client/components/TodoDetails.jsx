import React from 'react'

const TodoDetails = (props) => {

    console.log("todo in details ", props.todo);
    const { id, user_id, task, priority, active, completed } = props.todo
    // console.log("props in todo details ", props);
    // const todoID = props.match.params.id
    // console.log("todo id ", todoID);
    return (
        <div>
            <h5>id: {id}</h5>
        </div>
    )
}

export default TodoDetails
