const server = require('./server')
const PORT = process.env.PORT || 3000
// require('dotenv').config() //you can grab this even though dotenv-webpack is installed as a dependency, its in node_module package dotenv

if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  const envConfig = require('dotenv').config()
  if(envConfig.error) throw envConfig.error
}

server.listen(PORT, () => {
  console.log('Listening on port', PORT)
})