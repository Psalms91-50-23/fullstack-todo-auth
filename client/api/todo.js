import request from "superagent"

export const todoBaseURL = "/api/todos"
export const userTodosBaseURL = "/api/user"

export function createTodo(todo){

    const token = localStorage.getItem("auth-token")
    //set header just use set() to the backend as auth is needed for this request
    return request
    .post(`${todoBaseURL}`)
    .send(todo)
    .set("auth-token", token)
    .then(response => {
        return response.body
    }).catch(error => {
        console.log("error ",error.message)
    })


}

export function getAllUserTodosByUID(userUID){

    const token = localStorage.getItem("auth-token")
    return request
    .get(`${userTodosBaseURL}/${userUID}/todos`)
    .set("auth-token", token)
    .then( response  => {
        // console.log("response get all user todo by uid ", response.body)
        return response.body
    }).catch(error => {
        console.log("error ",error.message);
    })

}

export function updateTodoByID(todoId, todo){

    const token = localStorage.getItem("auth-token")
    // console.log("token in update by id ", token)
    // console.log("todo update by id ", todo)
    // console.log("todo id ", todoId)
    todo.priority = Number(todo.priority)
    
    return request
    .patch(`${todoBaseURL}/${todoId}`)
    .set('auth-token', token)
    .send(todo)
    .then(response => {
        // console.log("msg in todo.js res.body ", response.body)
        // console.log("date format id "+todoId+" ", dateFormat);
        const { oldTodo, updatedTodo, message } = response.body
        return updatedTodo

    }).catch(error => {
        console.log("error ",error.message);
    })
}

export function deleteTodoById(id){

    const token = localStorage.getItem("auth-token")
    return request
    .delete(`${todoBaseURL}/${id}`)
    .set("auth-token", token)
    .then( response  => {
        // console.log("response for delete ", response)
        return response.body
    }).catch(error => {
        console.log("error ",error.message);
    })

}

export function getTodoById(id){
    const token = localStorage.getItem("auth-token")
    return request
    .get(`${todoBaseURL}/${id}`)
    .set("auth-token", token)
    .then( response  => {
        // console.log("response for delete ", response)
        return response.body
    }).catch(error => {
        console.log("error ",error.message);
    })
}