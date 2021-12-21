const db = require('./connection')

function addUser(user){

    return db("users")
    .insert(user)
    .then((idArr) => {
        return getUserById(idArr[0])
    })

}

function getUserByUserEmail(userEmail){

    return db("users")
        .where("email", userEmail)
        .first()
      
}

function getUserById(id){

    return db("users")
    .where({id})
    .first()

}

function getAllUsers(){

    return db("users")
    .select()

}

function deleteUserByUserEmail(userEmail){

    return db("users")
    .delete()
    .where("email", userEmail)
    .then(() => {
        return `UserName: ${userEmail} has been deleted`
    })

}

function validateEmail(userEmail){

    if(userEmail.includes("@")){
        return true
    }
    else{
        return false
    }
}


function addTodo(todo){

    return db('todos')
    .insert(todo)
    .then( idArr => {
        return getTodoById(idArr[0])
        
    })

}

function getTodoById(id){

    return db('todos')
    .where({id})
    .first()

}

function getAllTodos(){

    return db('todos')
    .select()
}

function getUserByUID(uid){

    return db("users")
    .where({uid})
    .first()

}

function getAllUserTodos(uid){

    return db("users")
    .join("todos", "users.uid", "todos.user_uid")
    .select(
        "users.id as user_id",
        "users.uid as user_uid",
        "users.name as user_name",
        "users.email as user_email",
        // "users.password as user_password",
        // "users.created_at as user_created_at",
        // "users.updated_at as user_updated_at",
        "todos.id as todos_id",
        "todos.task as todos_task",
        "todos.created_at as todos_created_at",
        "todos.updated_at as todos_updated_at",
        "todos.priority as todos_priority",
        "todos.active as todos_active",
        "todos.completed as todos_completed"
    )
    .where({uid})
    .then( userTodos => {
        // console.log("user todos in db ", userTodos);
        return userTodos
    })

}


function deleteTodo(todoId){

    return db("todos")
    .where("id", todoId)
    .delete()
    .then(() => {
        return { successful: `Todo with id: ${todoId} has been deleted` }
    })

}

module.exports = {
    
    addUser,
    getUserByUserEmail,
    getAllUsers,
    deleteUserByUserEmail,
    validateEmail,
    getTodoById,
    addTodo,
    getAllTodos,
    getUserByUID,
    getUserById,
    getAllUserTodos,
    deleteTodo
    
}