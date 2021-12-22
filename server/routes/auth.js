const express = require('express')
// const path = require('path')
const server = express()
const db = require("../db/db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { uid } = require('uid')
const { auth } = require("./authJWTVerify")

server.post("/register", async (req,res) => {

    const { email, password, name } = req.body

    //test if all fields are there
    if(!email || !password || !name) return res.status(400).json({ message: "Need all data fields ===> name, password and email" })

    //validate email, and length, before '@' must contain 3 character length
    const validEmail =  db.validateEmail(email)
    if(!validEmail) return res.status(404).json({ message: `Email is not a valid email, characters allowed 'a-z,A-Z,0-9,_' and must contain min 3 characters before '@'`})

    //validate password, for length, characters min requirements etc
    const validPassword = db.validatePassword(password)
    if(!validPassword) return res.status(404).json({ message: `Password must be more than 6 characters long, must contain 1 capital letter, 1 lowercase letter and 1 special character '!@#$%^&' `})
    //test if user exists already
    const userExist = await db.getUserByUserEmail(email)
    if(userExist) return res.status(403).json({ message: "User with email already exist" })

    const created_at = new Date().toTimeString()
    const updated_at = new Date().toTimeString()
    
    //create hash pasword, salt gets appended to hash password
    const salt = await bcrypt.genSalt(10)
    console.log("salt ", salt);
    const hashPassword = await bcrypt.hash(password, salt)

    //create unique user id
    const userUID = uid(16)
    const newUser = {

        uid: userUID,
        email,
        password: hashPassword,
        name,
        created_at,
        updated_at

    }

    //create new user
    db.addUser(newUser)
    .then(user => {
        //201 ok created
        res.status(201).json(user)
    })
    .catch(error => {
        res.status(500).json({ message: "something went wrong ", error: error.message })
    })

    
})

server.get("/", (req,res) => {

    db.getAllUsers()
    .then(users => {
        res.status(200).json(users)
    }).catch(error => {
        res.status(500).json({ message: "something went wrong", error: error.message })
    })

})

server.get("/:email", async (req,res) => {

    const { email } = req.params

    const validEmail = await db.getUserByUserEmail(email)
    if(!validEmail) return res.status()

    db.getUserByUserEmail()
    .then(users => {
        res.status(200).json(users)
    }).catch(error => {
        res.status(500).json({ message: "something went wrong", error: error.message })
    })

})


server.delete("/:useremail", async (req,res) => {

    const { useremail } = req.params 
    const userEmailExists = await db.getUserByUserEmail(useremail)

    if(!userEmailExists) return res.status(404).json({ message: "User name does not exist" })
    
    db.deleteUserByUserEmail(useremail)
    .then( userDeleted =>{
        res.status(200).json(userDeleted)
    }).catch(error => {
        res.status(500).json({ message: "something went wrong", error: error.message })
    })

})


server.post("/login", async (req,res) => {

    const { email, password } = req.body
    if( !email || !password ) return res.status(404).json({ message: `Must have all fields entered ===> email and password` })

    //test if user exist
    const user = await db.getUserByUserEmail(email)
    if(!user) return res.status(404).json({ message: `User with email:${email} does not exist in the database` })
        
    //validate password, check if  password matches the password kept in bcrypt
    const validPassword = bcrypt.compare( password, user.password )
    if(!validPassword) return res.status(400).json({ message: "Invalid password" })

    //create and assign token, go to below website
     //https://jwt.io and paste token to see your data stored at jwt
    const token = jwt.sign({ uid: user.uid }, process.env.JWT_TOKEN_SECRET)
    //login sends token to header
    res.header("auth-token", token).send(token)
   
})

//gets all user and their todos
server.get("/:uid/todos", auth, async (req,res) => {

    const { uid } = req.params
    // console.log("uid in auth ", uid);
    const userUIDExist = await db.getUserByUID(uid)
    // console.log("user in auth exisit ", userUIDExist);
    if(!userUIDExist) return res.status(404).json({ message: `No User found with given UID: ${uid}` })

    db.getAllUserTodos(uid)
    .then(userTodos => {

        userTodos.map( todo => {
            todo.todos_completed = Boolean(todo.todos_completed)
            todo.todos_active = Boolean(todo.todos_active)
            todo.todos_priority = Boolean(todo.todos_priority)
        })
        // console.log("user todos ", userTodos);
        return res.status(200).json(userTodos)
    })
    .catch(error => {
        res.status(500).json({ message: "something went wrong", error: error.message })
    })

})


server.get("/:uid/todos/:todoId", auth, async (req,res) => {

    const { uid, todoId } = req.params
    // console.log("uid in auth ", uid);
    const userUIDExist = await db.getUserByUID(uid)
    // console.log("user in auth exisit ", userUIDExist);
    if(!userUIDExist) return res.status(404).json({ message: `No User found with given UID: ${uid}` })

    const todoExists = await db.getTodoById(todoId)
    if(!todoExists) return res.status(404).json({ message: `No todo with that id: ${todoId} found` })

    db.getTodoById(todoId)
    .then(todo => {
        todo.completed = Boolean(todo.completed)
        todo.active = Boolean(todo.active)
        todo.priority = Boolean(todo.priority)
        return res.status(200).json(todo)
    })
    .catch(error => {
        res.status(500).json({ message: "something went wrong", error: error.message })
    })

})

module.exports = server