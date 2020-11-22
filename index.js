require('dotenv').config();
const PORT = 3000;
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const apiRouter = require('./api')
const morgan = require('morgan')
const {client} = require('./db')
client.connect()


server.use(bodyParser.json())

server.use('/api', apiRouter)

server.use(morgan('dev'))


server.listen(PORT, () => {
    console.log("Server is listening!")
})