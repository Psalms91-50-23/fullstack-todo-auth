import request from "superagent"
import axios from "axios"

export const baseURL = "/api/todos"


export function createTodo(todo, token){

    
    //set header just use set()
    return request
    .post(`${baseURL}`)
    .send(todo)
    .set("auth-token", token)
    .then(response => {
        console.log("create todo ", response.body);
        return response.body
    }).catch(error => {
        console.log("error ",error.message);
    })


}