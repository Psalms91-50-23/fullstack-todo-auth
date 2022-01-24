// const db = require('./connection')
const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const db = require('knex')(config)
//^ = at start
// (\w{3,}) = can have values from a-z,A-Z,0-9,_ (\w) , must be 3({3,}) characters min or more, this part is the length test
//@ not in brackets = must include '@'
//([a-zA-Z\d]{2,}) = must contain letters within '[]' from a-z, A-Z, any digits 0-9 (\d), must be min of 2 characters or more
//\.  must contain "." \ is an escape character as '.' has a meaning in regex
//([a-z]{2,}) = must contain letters with '[]', a-z and must be 2 more more {2,} characters
//example of above is Ba4@gmail.com
//(\.[a-z]{2,})? this is optional with the '?' = must contain '.','\' is an escape character as '.' has meaning in regex, it can mean any character except linebreaks , parts after '.' just look above
//example of above full regex expression with optional end part is Ba4@hotmail.co.nz
const emailRegex = /^(\w{3,})@([a-zA-Z\d]{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
const capitalLetterRegex = /[A-Z]{1}/ //1 character match A-Z
const lowerCaseLetterRegex = /[a-z]{1}/ //1 character match a-z
const numberRegex = /\d{1}/ //1 digit match 0-9
const specialCharRegex = /[!@#$%^&]{1}/ //must have 1 special character '!@#$%^&*
const priority = ["low","moderate","high","very high"]


function validateEmail(userEmail){

    //test if email matches email regex expression and that it has all the min requirements for an email
    if(emailRegex.test(userEmail)) return true

}

function minPasswordCharReqReached(password){

    const passwordSplit = password.split("")
    var capitalLetterCounter = 0
    var lowerCaseLetterCounter = 0
    var numberCounter = 0
    var specialCharCounter = 0
    var minPasswordCharReached = false //instantiated as false

    //test for length of password, if 5 or lower return false
    if(passwordSplit.length <= 5) return minPasswordCharReached
    //after above condition passes do below
    for(var i = 0; i < passwordSplit.length ; i++){
      
        var character = passwordSplit[i]
        if(capitalLetterRegex.test(character)){
            capitalLetterCounter++
        }
        if(numberRegex.test(character)){
            numberCounter++
        }
        if(lowerCaseLetterRegex.test(character)){
            lowerCaseLetterCounter++
        }
        if(specialCharRegex.test(character)){
            specialCharCounter++
        }
        if(capitalLetterCounter >= 1 && numberCounter >= 1 && lowerCaseLetterCounter >= 1 && specialCharCounter >= 1){
            minPasswordCharReached = true
            return minPasswordCharReached 
        }
    }

}


function validatePassword(password){

    if(minPasswordCharReqReached(password)) return true

}


function addUser(user){

    return db("users")
    .insert(user, 'id')
    .then((idArr) => {
        return getUserById(idArr[0])
    })

}

function getUserByEmail(email){

    return db("users")
        .where({email})
        .first()
      
}

function getUserById(id){

    return db("users")
    .where({id})
    .first()

}

function getAllUsers(){

    return db("users")
    .orderBy("created_at", "desc")
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


function addTodo(todo){

    return db('todos')
    .insert(todo,'id')
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
    .orderBy("id", "desc")
    .select()
}

function getUserByUID(uid){

    return db("users")
    .where({uid})
    .first()

}

function getAllUserTodosByUID(uid){

    return db("todos")
    .select()
    .orderBy("created_at", "desc")
    .where({user_uid: uid})
    .then( userTodos => {
        return userTodos
    })

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

async function updateUser(uid, userUpdatedDetails){

    const oldUserDetail = await db.getUserByUID(uid)

    return db('users')
    .where({uid})
    .update(userUpdatedDetails)
    .then(() => {
        return { message: `user with uid: ${uid} has been updated successfully`, oldUserDetail, newUpdatedUserDetail: userUpdatedDetails}
    })

}

 function updateTodo(todoId, todo, oldTodo){

    // const oldTodo = await db.getTodoById(todoId)
    console.log("old todo ",oldTodo);
 
    return db("todos")
    .where("id", todoId)
    .update(todo)
    .then(() => {
        return { message: "Successful", oldTodo, updatedTodo: todo}
    })

}


module.exports = {
    
    addUser,
    getUserByEmail,
    getAllUsers,
    deleteUserByUserEmail,
    validateEmail,
    getTodoById,
    addTodo,
    getAllTodos,
    getUserByUID,
    getUserById,
    getAllUserTodos,
    deleteTodo,
    validatePassword,
    updateUser,
    getAllUserTodosByUID,
    updateTodo
    
}