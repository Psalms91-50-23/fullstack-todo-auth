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

    //validate email
    const validateEmail =  db.validateEmail(email)
    if(!validateEmail) return res.status(404).json({ message: `Email is not a valid email`})
  
    //test length of password, must be 6 or higher
    if(password.length <= 5) return res.status(404).json({ message: `Pasword must be more than 6 characters long `})

    //test if user exists already
    const userExist = await db.getUserByUserEmail(email)
    if(userExist) return res.status(403).json({ message: "User with email already exist" })

    const created_at = new Date().toTimeString()
    const updated_at = new Date().toTimeString()
    
    //create hash pasword, salt gets appended to hash password
    const salt = await bcrypt.genSalt(10)
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
        res.status(200).json(user)
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

    //create an assign token
    // console.log("process.env ", process.env.JWT_TOKEN_SECRET);

    const token = jwt.sign({ uid: user.uid }, process.env.JWT_TOKEN_SECRET)
     //https://jwt.io and paste token to see your data stored at jwt
    // console.log(token);
    // return res.json(token)
    // return res.status(200).json({ message: `You are logged in `})
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