import request from "superagent"
import axios from "axios"

export const todoBaseURL = "/api/todos"
export const userTodosBaseURL = "/api/user"

export function createTodo(todo, token){

    
    //set header just use set() to the backend as auth is needed for this request
    return request
    .post(`${todoBaseURL}`)
    .send(todo)
    .set("auth-token", token)
    .then(response => {
        console.log("create todo api frontend ", response.body);
        return response.body
    }).catch(error => {
        console.log("error ",error.message);
    })


}

export function getAllUserTodosByUID(userUID, token){

    return request
    .get(`${userTodosBaseURL}/${userUID}/todos`)
    .set("auth-token", token)
    .then( response  => {
        console.log("response get all user todo by uid ", response.body);
        return response.body
    }).catch(error => {
        console.log("error ",error.message);
    })

}


export function updateTodoByID(todoId, todo, token){

    return request
    .patch(`${todoBaseURL}/${todoId}`)
    .set('auth-token', token)
    .send(todo)
    .then(response => {
        console.log("msg in todo.js ", response);
        const { oldTodo, updatedTodo, message } = response.body
        return updatedTodo

    }).catch(error => {
        console.log("error ",error.message);
    })
}