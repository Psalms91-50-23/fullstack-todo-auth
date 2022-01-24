import { SET_USER, ADD_TODO, SET_TODOS, UPDATE_TODO, DELETE, LOADING, FILTER } from "../actions/userActions"

const initialState = {
    user: null,
    todos: [],
    loading: true,
    filter: null
}

const priorityIndex = ["low","moderate","high","very high"]

const userReducer = ( state = initialState, action) => {

    switch(action.type){
        case SET_USER:
            return {...state, user: action.user}
        case ADD_TODO:
            const tempTodo = action.todo
            console.log("add todo reducer ", action.todo);
            const tempTodos = [tempTodo, ...state.todos]
            return {...state, todos: tempTodos}
        case SET_TODOS:
            console.log("todos in set todos ", action.todos)
            return {
                ...state, todos: [...action.todos]
            }
        case UPDATE_TODO:
            const updatedTodos = state.todos.map(todo => {
                console.log("id in update todo reducer ", todo.id);
                console.log("id in update action.todo.id reducer ", action.todo);
                if(todo.id === action.todo.id){
                    // console.log("before date added ",action.todo.updated_at);
                    // action.todo.updated_at = Date.now()
                    // console.log("after date added ", action.todo.updated_at);
                    return action.todo
                }
                else{
                    return todo
                }
            })
            console.log("updated todo in reducer ", updatedTodos);
            return {
                ...state, todos: [...updatedTodos]
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
            console.log("action filter in reducer ", action.filter);
            return {
                ...state, filter: action.filter
            }
        default:
            return state;

    }

}

export default userReducer