const server = require('./server')
const PORT = process.env.PORT || 3000
require('dotenv').config() //you can grab this even though dotevn-webpack is installed as a dependency, its in node_mdule package dotenv

server.listen(PORT, () => {
  console.log('Listening on port', PORT)
})