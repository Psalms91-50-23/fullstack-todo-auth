const express = require('express')
const path = require('path')
const server = express()
const cors = require('cors')

const authRoutes = require("./routes/auth")
const todoRoutes = require("./routes/todos")

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

// var whitelist = ['http://localhost:3000/*']
// var corsOptions = {
//   origin: function (origin, callback, next) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//       next()
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// server.use(cors(corsOptions))
//routes middle ware
server.use("/api/user", authRoutes)
server.use("/api/todos", todoRoutes)

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })

module.exports = server