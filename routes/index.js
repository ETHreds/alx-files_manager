#!/usr/bin/node
const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController')

// GET /status
router.get('/status', AppController.getStatus);

// GET /stats
router.get('/stats', AppController.getStats);

// POST /users 
router.post('/users', UsersController.postNew)

module.exports = router;