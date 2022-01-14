const express = require('express');
const cors = require('cors')
const projectsRouter = require('./projects/projects-router')
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

function logger(req, res, next) {
    const method = req.method;
    const url = req.originalUrl;
    const timestamp = new Date()
    console.log(`Time: [${timestamp}], Method: ${method}, URL: ${url}`) 
    next()
  }

server.use(cors())
server.use(express.json())
server.use(logger)
server.use('/api/projects', projectsRouter)


module.exports = server;
