export const USER_EXISTS = "USER_EXISTS"
export const SET_USER = "SET_USER"
export const ADD_TODO = "ADD_TODO"
export const SET_TODOS = "SET_TODOS"
export const UPDATE_TODO = "UPDATE_TODO"

export function setUser(user){

    return {
        type: SET_USER,
        user
    }

}

export function addTodo(todo){

    return {
        type: ADD_TODO,
        todo
    }
}

export function setTodos(todoList){

    return {
        type: SET_TODOS,
        todos: todoList

    }
}

export function updateTodo(todo){

    return {
        type: UPDATE_TODO,
        todo
    }
}