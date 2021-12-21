const express = require('express')
const path = require('path')
const server = express()

const authRoutes = require("./routes/auth")
const todoRoutes = require("./routes/todos")

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

//routes middle ware
server.use("/api/user", authRoutes)
server.use("/api/todos", todoRoutes)

module.exports = server