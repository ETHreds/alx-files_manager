#!/usr/bin/node
const http = require('http')
const express = require('express');
const routes = require('./routes/index');
const app = express();


const server = http.createServer(app)
// Load routes from routes/index.js
app.use('/', routes);

// Define port
const PORT = process.env.PORT || 5000;

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});