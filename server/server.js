// modules
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

// set port
app.set('port', (process.env.PORT || 7777));

// make mongodb connection by requiring the mongoose configuration file
// If you're here you probably forgot to run `sudo mongod` again
require('./config/mongoose');

// configure middleware //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './../public')));
app.use('bower_components', express.static(path.join(__dirname, './../bower_components')));

// set routes for app
var routes = require('./config/routes');
app.use('/', routes);

// start server
var server = http.createServer(app);
server.listen(app.get('port'), function() {
	console.log(`Server is listening on port ${app.get('port')}`);
});

module.exports = app;