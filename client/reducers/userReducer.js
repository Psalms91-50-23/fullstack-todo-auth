import { SET_USER, ADD_TODO, SET_TODOS, UPDATE_TODO } from "../actions/userActions"

const initialState = {
    user: null,
    todos: []
}

const userReducer = ( state = initialState, action) => {

    switch(action.type){
        case SET_USER:
            return {...state, user: action.user}
        case ADD_TODO:
            const tempTodo = action.todo
            const tempTodos = [tempTodo, ...state.todos]
            return {...state, todos: tempTodos}
        case SET_TODOS:
            return {...state, todos: [...action.todos]}
        case UPDATE_TODO:
            const updateTodo = state.todos.map(todo => {
                if(todo.id === action.todo.id){
                    return todo = action.todo
                }
                else{
                    return todo
                }
            })

            return {
                ...state, todos: [...updateTodo]
            }
            
        default:
            return state;

    }

}

export default userReducer