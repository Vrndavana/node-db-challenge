const express = require('express');
const projectsRouter = require("./projects/router");
const resourcesRouter = require("./resources/router");
const tasksRouter = require("./tasks/router")
const server = express();

server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/resources', resourcesRouter);
server.use('/api/tasks', tasksRouter);
server.get('/',( req, res) => {
    res.status(200).json({Message: "Success"})
})


module.exports = server;