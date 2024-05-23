#!/usr/bin/node

const express = require('express');
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');

const Router = express.Router();

Router.get('/status', AppController.getStatus);
Router.get('/stats', AppController.getStats);
Router.post('/users', UsersController.postNew);
Router.get('/connect', AuthController.getConnect);
Router.get('/disconnect', AuthController.getDisconnect);
Router.get('/users/me', AuthController.getMe);

module.exports = Router;