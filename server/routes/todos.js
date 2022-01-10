const express = require('express')
const server = express()
const db = require("../db/db")
const { auth } = require("./authJwtVerify")
// const { auth } = authenticator

const priority = ["low","moderate","high","very high"]


server.post("/", auth, (req,res) => {

    const { task, completed, user_uid, active } = req.body
    console.log("body ",req.body);
    if(!(task || completed || user_uid || req.body.priority || active)) return res.status(404).json({ message: `require task, completed, user_id, priority, active fields` })
    
    const created_at = new Date().toUTCString()
    const updated_at = new Date().toUTCString()

    const newTodo = {

        task,
        completed,
        active,
        priority: req.body.priority,
        created_at,
        updated_at,
        user_uid

    }

    db.addTodo(newTodo)
    .then( todo => {
        todo.completed = Boolean(todo.completed)
        todo.active = Boolean(todo.active)
        todo.completed = Boolean(todo.completed)
        todo.active = Boolean(todo.active)
        todo.priority = priority[todo.priority]

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
            todo.priority = priority[todo.priority]
           
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

    if(!todoExists) return res.status(404).json({ message: `No such todos exits `})

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
    const updated_at = new Date().toUTCString()
    const newTodo = {...todo, created_at, updated_at}

    db.updateTodo(todoId, newTodo, oldTodo)
    .then( response => {

        console.log("msg ",response);
        const { oldTodo, updatedTodo } = response

        updatedTodo.active = Boolean(updatedTodo.active)
        updatedTodo.completed = Boolean(updatedTodo.completed)
        updatedTodo.priority = priority[updatedTodo.priority]

        oldTodo.active = Boolean(oldTodo.active)
        oldTodo.completed = Boolean(oldTodo.completed)
        oldTodo.priority = priority[oldTodo.priority]

        res.status(200).json({...response, oldTodo, updatedTodo})
    }).catch(error => {
        res.status(500).json({ message: `Something went wrong`, error: error.message })
    })

})

//get all todos from this user
// server.get('/:userId', auth, async (req,res) => {

//     const { userId } = req.params

//     const userExist = await db.getUserById(userId)
//     if(!userExist) return res.status(404).json({ message: `Cannot find user from database` })

    
// })

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