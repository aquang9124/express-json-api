// modules
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 4500;

// make mongodb connection by requiring the mongoose configuration file
require('./config/mongoose');

// configure middleware //
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './../public')));

// set routes for app
var routes = require('./config/routes');
app.use('/', routes);

// start server
var server = http.createServer(app);
server.listen(port);

module.exports = app;