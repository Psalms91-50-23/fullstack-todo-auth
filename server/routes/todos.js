const express = require('express')
const server = express()
const db = require("../db/db")
const { auth } = require("./authJwtVerify")
// const { auth } = authenticator

const priorityIndex = ["low","moderate","high","very high"]


server.post("/", auth, (req,res) => {


    const { task, completed, user_uid, active, priority } = req.body
    console.log("body ",req.body);
    if(!(task || completed || user_uid || priority || active)) return res.status(404).json({ message: `require task, completed, user_id, priority, active fields` })
    console.log("initial date format ", new Date());
    // const created_at = new Date().toUTCString()
    // const updated_at = new Date().toUTCString()

    const created_at = new Date()
    const updated_at = new Date()
    console.log("created_at format in posted todos ", created_at)
    console.log("updatedted_at format in posted todos ", updated_at)
    const newTodo = {

        task,
        completed,
        active,
        priority,
        created_at,
        updated_at,
        user_uid

    }

    db.addTodo(newTodo)
    .then( todo => {
        console.log("todo posted before", todo);
        console.log("todo created at  ", todo.created_at.toString());
        console.log("todo updated at  ", todo);

        todo.completed = Boolean(todo.completed)
        todo.active = Boolean(todo.active)
        todo.completed = Boolean(todo.completed)
        todo.active = Boolean(todo.active)
        /*todo.priority = priorityIndex[todo.priority]*/
        
        console.log("todo posted after changes ", todo);

        res.status(200).json(todo)
    }).catch( error => {
        res.status(500).json({ message: `Something went wrong`, error: error.message})
    })

})

server.get("/", auth, (req,res) => {

    db.getAllTodos()
    .then(todos => {
        todos.map(todo => {
            todo.completed = Boolean(todo.completed)
            todo.active = Boolean(todo.active)
            todo.priority = priorityIndex[todo.priority]
           
        })
        res.status(200).json(todos)

    })
    .catch(error => {
        res.status(500).json({ message: `Something went wrong`, error: error.message })
    })

})


server.delete("/:todoId", auth, async (req,res) => {

    const { todoId } = req.params

    const todoExists = await db.getTodoById(todoId)

    if(!todoExists) return res.status(404).json({ message: `No such todos exists `})

    db.deleteTodo(todoId)
    .then(deletedMessage => {
        res.status(200).json(deletedMessage)
    }).catch(error => {
        res.status(500).json({ message: `Something went wrong`, error: error.message })
    })

})

server.patch("/:todoId", auth,  async (req,res) => {

    const { todoId } = req.params
    const todo = req.body
    
    console.log("todo ",todo);
    const oldTodo = await db.getTodoById(todoId)
    console.log("todo exists? ", oldTodo);
    if(!oldTodo) return res.status(404).json({ message: `No such todo exists in database`})
    const { created_at } = oldTodo
    const updated_at = Date.now()
    //Date.now() gives me primitive value  eg 1642912497157
    const newTodo = {...todo, created_at, updated_at}

    db.updateTodo(todoId, newTodo, oldTodo)
    .then( response => {
 
        console.log("msg ",response);
        const { oldTodo, updatedTodo } = response

        response.updatedTodo.active = Boolean(response.updatedTodo.active)
        response.updatedTodo.completed = Boolean(response.updatedTodo.completed)
        // updatedTodo.priority = priorityIndex[updatedTodo.priority]

        response.oldTodo.active = Boolean(response.oldTodo.active)
        response.oldTodo.completed = Boolean(response.oldTodo.completed)
        console.log("updated todo ", updatedTodo)
        console.log("old todo ",oldTodo);
        // oldTodo.priority = priorityIndex[oldTodo.priority]
        console.log("update seeing if it is an number value ", todo.priority);

        res.status(200).json({...response, oldTodo, updatedTodo})
    }).catch(error => {
        res.status(500).json({ message: `Something went wrong`, error: error.message })
    })

})

// get all todos from this user
server.get('/:todoId', auth, async (req,res) => {

    const { todoId } = req.params

    const todoExists = await db.getTodoById(todoId)
    if(!todoExists) return res.status(404).json({ message: `Cannot find todo from database` })

    db.getTodoById(todoId)
    .then( todo => {
 
        console.log("msg ",todo);
        // const { oldTodo, updatedTodo } = todo

        // updatedTodo.active = Boolean(updatedTodo.active)
        // updatedTodo.completed = Boolean(updatedTodo.completed)
        // updatedTodo.priority = priorityIndex[updatedTodo.priority]

        todo.active = Boolean(todo.active)
        todo.completed = Boolean(todo.completed)
        /*todo.priority = priorityIndex[todo.priority]*/

        res.status(200).json(todo)
    }).catch(error => {
        res.status(500).json({ message: `Something went wrong`, error: error.message })
    })
    
})

// server.get("/:uid", auth, async (req,res) => {

//     const { uid } = req.params
//     console.log("uid in auth ", uid);

//     const userUIDExist = await db.getUserByUID(uid)
//     console.log("user in auth exisit ", userUIDExist);
//     if(!userUIDExist) return res.status(404).json({ message: `No User found with given UID: ${uid}` })

//     db.getAllUserTodos(uid)
//     .then(userTodos => {
//         console.log("user todos ", userTodos);
//         return res.status(200).json(userTodos)
//     })
//     .catch(error => {
//         res.status(500).json({ message: "something went wrong", error: error.message })
//     })

// })


module.exports = server