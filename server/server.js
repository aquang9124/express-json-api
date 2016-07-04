// modules
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var port = process.env.PORT || 4500;
var app = express();

// make mongodb connection by requiring the mongoose configuration file
require('./config/mongoose.js');

// -- configure middleware -- //
app.use(express.static(path.join(__dirname, './../public')));

// set appropriate headers for server
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	next();
});

// start server
var server = http.createServer(app);
server.listen(port);

module.exports = app;