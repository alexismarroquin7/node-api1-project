// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();

server.use(express.json());

const User = require('./users/model.js');

module.exports = server; // EXPORT YOUR SERVER instead of {}
