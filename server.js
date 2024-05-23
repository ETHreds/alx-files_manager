#!/usr/bin/node
const http = require('http')
const express = require('express');
const Routes = require('./routes');
const app = express();


const server = http.createServer(app)

app.use('/', Routes);


const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});