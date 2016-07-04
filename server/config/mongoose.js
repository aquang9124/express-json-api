var mongoose = require('mongoose');
// fs module for loading model files
var fs = require('fs');
// path modules helps with getting model file paths
var path = require('path');
// connect to mongoose!
mongoose.connect('mongodb://localhost/emberData');
// this is the path to the models directory
var models_path = path.join(__dirname, './../models');
// read all the files in the models_path and require all .js files
fs.readdirSync(models_path).forEach(function(file) {
	if (file.indexOf('.js') >= 0) {
		require(models_path + '/' + file);
	}
});