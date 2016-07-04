'use strict';
// require bcrypt
const bcrypt = require('bcrypt-as-promised');

// load models
let mongoose = require('mongoose');
let User = mongoose.model('User');

// set up express router
const express = require('express');
let router = express.Router();

// implement route handlers
let users = {
	index(req, res) {
		let userArr = [
			{name: 'Alex', specialty: 'programming'},
			{name: 'The Rock', specialty: 'acting'}
		];
		res.json(userArr[req.params.id]);
	},
	add(req, res) {
		bcrypt.hash(req.body.password, 10)
			.then(function(hashedPW) {
				let newUser = new User({
					username: req.body.username,
					email: req.body.email,
					password: hashedPW
				});

				newUser.save(function(err) {
					if (err) {
						res.json({ERROR: new Error(err)});
					}
					else {
						res.json({SUCCESS: newUser});
					}
				});
			})
			.catch(function(err) {
				res.json({ERROR: new Error(err)});
			});
	}
};

// API routes
router.get('/api/user/:id', users.index);
router.post('/api/users', users.add);

module.exports = router;