import { SET_USER, ADD_TODO, SET_TODOS, UPDATE_TODO, DELETE, LOADING, FILTER } from "../actions/userActions"

const initialState = {
    user: null,
    todos: [],
    loading: true,
    filter: null
}

// const priorityIndex = ["low","moderate","high","very high"]

const userReducer = ( state = initialState, action) => {

    switch(action.type){
        
        case SET_USER:
            
            return {
                ...state, user: action.user
            }

        case ADD_TODO:
            const tempTodo = action.todo
            const tempTodos = [tempTodo, ...state.todos]

            return {
                ...state, todos: tempTodos
            }

        case SET_TODOS:

            return {
                ...state, todos: [...action.todos]
            }

        case UPDATE_TODO:
            const updatedTodos = state.todos.map(todo => {
        
                if(todo.id === action.todo.id){
                    return action.todo
                }
                else{
                    return todo
                }
            })
            return {
                ...state, todos: updatedTodos
            }

        case DELETE:

            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            }
        case LOADING:

            return {
                ...state, loading: action.loading
            }

        case FILTER:

            return {
                ...state, filter: action.filter
            }

        default:
            return state;

    }

}

export default userReducer