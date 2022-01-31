const express = require('express')
const server = express()
const db = require("../db/db")
const { auth } = require("./authJwtVerify")
// const { auth } = authenticator

const priorityIndex = ["low","moderate","high","very high"]

server.post("/", auth, (req,res) => {

    const { task, completed, user_uid, active, priority } = req.body
    if(!(task || completed || user_uid || priority || active)) return res.status(404).json({ message: `require task, completed, user_id, priority, active fields` })

    const created_at = new Date()
    const updated_at = new Date()

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

        todo.completed = Boolean(todo.completed)
        todo.active = Boolean(todo.active)
        todo.created_at = new Date(todo.created_at).toTimeString()
        todo.updated_at = new Date(todo.updated_at).toTimeString()
        todo.priority = priorityIndex[todo.priority]

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
            todo.created_at = new Date(todo.created_at).toTimeString()
            todo.updated_at = new Date(todo.updated_at).toTimeString()
           
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
    const oldTodo = await db.getTodoById(todoId)
    if(!oldTodo) return res.status(404).json({ message: `No such todo exists in database`})
    const { created_at } = oldTodo
    const updated_at = Date.now()
    //Date.now() gives me primitive value  eg 1642912497157
    const newTodo = {...todo, created_at, updated_at}

    db.updateTodo(todoId, newTodo)
    .then( response => {
 
        const { updatedTodo, message } = response

        updatedTodo.active = Boolean(updatedTodo.active)
        updatedTodo.completed = Boolean(updatedTodo.completed)
        updatedTodo.priority = priorityIndex[updatedTodo.priority]
        updatedTodo.created_at = new Date(updatedTodo.created_at).toTimeString()
        updatedTodo.updated_at = new Date(updatedTodo.updated_at).toTimeString()

        oldTodo.active = Boolean(oldTodo.active)
        oldTodo.completed = Boolean(oldTodo.completed)
        oldTodo.priority = priorityIndex[oldTodo.priority]
        oldTodo.created_at = new Date(oldTodo.created_at).toTimeString()
        oldTodo.updated_at = new Date(oldTodo.updated_at).toTimeString()
    
        // console.log("after response update todo ", updatedTodo);

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
 
        // console.log("msg ",todo);
        // const { oldTodo, updatedTodo } = todo

        // updatedTodo.active = Boolean(updatedTodo.active)
        // updatedTodo.completed = Boolean(updatedTodo.completed)
        // updatedTodo.priority = priorityIndex[updatedTodo.priority]
        todo.priority = priorityIndex[todo.priority]
        todo.created_at = new Date(todo.created_at).toTimeString()
        todo.updated_at = new Date(todo.updated_at).toTimeString()
        todo.active = Boolean(todo.active)
        todo.completed = Boolean(todo.completed)
        /*todo.priority = priorityIndex[todo.priority]*/

        res.status(200).json(todo)
    }).catch(error => {
        res.status(500).json({ message: `Something went wrong`, error: error.message })
    })
    
})

module.exports = server