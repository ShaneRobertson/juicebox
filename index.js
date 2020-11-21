const PORT = 3000;
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
server.use(bodyParser.json())

const apiRouter = require('./api')
server.use('/api', apiRouter)

const morgan = require('morgan')
server.use(morgan('dev'))

const {client} = require('./db')
client.connect()

server.listen(PORT, () => {
    console.log("Server is listening!")
})