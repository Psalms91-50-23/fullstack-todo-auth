const express = require('express')
// const path = require('path')
const server = express()
const db = require("../db/db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { uid } = require('uid')
const { auth } = require("./authJwtVerify")
const priorityIndex = ["low","moderate","high","very high"]

server.post("/register", async (req,res) => {

    const { email, password, name } = req.body
    //test if all fields are there
    if(!email || !password || !name) return  res.status(400).json({ message: "Need all data fields ===> name, password and email" })
     //test if user exists already
     const userExist = await db.getUserByEmail(email)
     if(userExist) return  res.status(400).json({ message: "User with email already exist" })
    //validate email, and length, before '@' must contain 3 character length
    const validEmail =  db.validateEmail(email)
    if(!validEmail)  return res.status(404).json({ message: `Email is not a valid email, characters allowed 'a-z,A-Z,0-9,_' and must contain min 3 characters before '@'`})
    //validate password, for length, characters min requirements etc
    const validPassword = db.validatePassword(password)
    if(!validPassword) return res.status(404).json({ message: `Password must be more than 6 characters long, must contain 1 capital letter, 1 lowercase letter and 1 special character '!@#$%^&' `})
    const created_at = new Date()
    const updated_at = new Date()
    //create hash password, salt gets appended to hash password
    const salt = await bcrypt.genSalt(10)
    // console.log("salt ", salt);
    const hashPassword = await bcrypt.hash(password, salt)
    const emailLowerCase = email.toLowerCase()
    //create unique user id
    const userUID = uid(16)
    const newUser = {
        uid: userUID,
        email: emailLowerCase,
        password: hashPassword,
        name,
        created_at,
        updated_at
    }
    //create new user
    db.addUser(newUser)
    .then(user => {
        //201 ok created
        // console.log("user registerd ",user);
        user.created_at = new Date(user.created_at).toString()
        user.updated_at = new Date(user.updated_at).toString()
        res.status(201).json(user)
    })
    .catch(error => {
        res.status(500).json({ message: "something went wrong ", error: error.message })
    })  
})

server.get("/", (req,res) => {

    db.getAllUsers()
    .then(users => {
        users = users.map( user => {
            user.created_at = new Date(user.created_at).toString()
            user.updated_at = new Date(user.updated_at).toString()
            return user
        })
        res.status(200).json(users)
    }).catch(error => {
        res.status(500).json({ message: "something went wrong", error: error.message })
    })

})

server.get("/getuser/:uid", async (req,res) => {

    const { uid } = req.params
    const user = await db.getUserByUID(uid)
    if(!user) return res.status(403).json({ message: `User with email: ${email} does not exist` })

    db.getUserByUID(uid)
    .then(user => {
        res.status(200).json(user)
    }).catch(error => {
        res.status(500).json({ message: "something went wrong", error: error.message })
    })
})

server.get("/:email", async (req,res) => {

    const { email } = req.params
    const user = await db.getUserByEmail(email)
    // if(!user) return res.status(403).json({ message: `User with email: ${email} does not exist` })
    if(user){
        user.created_at = new Date(user.created_at).toString()
        user.updated_at = new Date(user.updated_at).toString()
        res.status(200).json(user)
    }else{
        res.json({ error: "Something went wrong, Email does not exist"})
    }

})


server.delete("/:email", async (req,res) => {

    const { email } = req.params 
    const userEmailExists = await db.getUserByEmail(email)
    if(!userEmailExists) return res.status(404).json({ message: "User name does not exist" })
    db.deleteUserByUserEmail(email)
    .then( userDeleted => {
        res.status(200).json(userDeleted)
    }).catch(error => {
        res.status(500).json({ message: "something went wrong", error: error.message })
    })

})


server.post("/login", async (req,res) => {

    const { email, password } = req.body
    if( !email || !password ) return res.status(404).json({ message: `Must have all fields entered ===> email and password` })
    //test if user does not exist exist
    const user = await db.getUserByEmail(email)
    if(!user) return res.status(404).json({ message: `User with email:${email} does not exist in the database` }) 
    //validate password, check if  password matches the password kept in bcrypt
    //user.password being kep is hashpassword
    // const validPassword = await bcrypt.compare( req.body.password, user.password ) //this works
    // if(!validPassword) return res.status(400).json({ message: "Invalid password" })// error handling if it does not match
     //create and assign token with our added JWT_TOKEN_SECRET to it, go to below website
     //https://jwt.io and paste token to see your data stored at jwt
     //const token = jwt.sign({ uid: user.uid }, process.env.JWT_TOKEN_SECRET, {expiresIn: '2h'})
     //login sends token in the header to the client side
     // console.log("token ", token);
     //res.header("auth-token", token).send(token)
    //bottom combines the 4 things from above compare() function error check and also create and send jwt token
    bcrypt.compare( password, user.password).then((result) => {

        if(!result){
            return res.status(400).json({ error_message: "Invalid password or password did not match database" })
        }
        else{
             //create and assign token with our added JWT_TOKEN_SECRET to it, go to below website
            //https://jwt.io and paste token to see your data stored at jwt
            const token = jwt.sign({ uid: user.uid }, process.env.JWT_TOKEN_SECRET, {expiresIn: '2h'})
            //login sends token in the header to the client side
            console.log("token in /login route ", token);
            res.header("auth-token", token).send(token)
        }
    })  
})

//gets all user and their todos
server.get("/:uid/todos", auth, async (req,res) => {

    const { uid } = req.params
    // console.log("uid in auth ", uid);
    const userUIDExist = await db.getUserByUID(uid)
    // console.log("user in auth exisit ", userUIDExist);
    if(!userUIDExist) return res.status(404).json({ message: `No User found with given UID: ${uid}` })
    db.getAllUserTodosByUID(uid)
    .then(userTodos => {
        userTodos = userTodos.map( todo => {
            todo.completed = Boolean(todo.completed)
            todo.active = Boolean(todo.active)
            todo.priority = priorityIndex[todo.priority]
            todo.created_at = new Date( todo.created_at).toString()
            todo.updated_at = new Date(todo.updated_at).toString()
            return todo
        })
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
        todo.priority = priorityIndex[todo.priority]
        todo.created_at = new Date( todo.created_at).toString()
        todo.updated_at = new Date(todo.updated_at).toString()
        return res.status(200).json(todo)

    })
    .catch(error => {
        res.status(500).json({ message: "something went wrong", error: error.message })
    })

})


server.post("/logout", (req,res) => {

    var authToken = req.header('auth-token')
    authToken = ""
    return  res.header("auth-token", authToken).send(authToken)

})

module.exports = server