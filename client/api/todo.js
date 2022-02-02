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
        return response.body
    }).catch(error => {
        console.log("error ",error.message);
    })
}

export function updateTodoByID(todoId, todo){

    const token = localStorage.getItem("auth-token")
    todo.priority = Number(todo.priority)
    return request
    .patch(`${todoBaseURL}/${todoId}`)
    .set('auth-token', token)
    .send(todo)
    .then(response => {
        const { updatedTodo } = response.body
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
        return response.body
    }).catch(error => {
        console.log("error ",error.message);
    })
}