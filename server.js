#!/usr/bin/node
const http = require('http')
const express = require('express');
const routes = require('./routes');
const app = express();


const server = http.createServer(app)

app.use('/', routes);


const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});