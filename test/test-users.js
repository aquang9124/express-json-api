var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-as-promised');
var User = mongoose.model('User');
var should = chai.should();

chai.use(chaiHttp);

describe('Users', function() {
	User.collection.drop();

	beforeEach(function(done) {
		bcrypt.hash('qqhappyfam', 10)
			.then(function(hashedPW) {
				var newUser = new User({
					username: 'aquang0',
					email: 'aquang0@gmail.com',
					password: hashedPW
				});
				newUser.save(function(err) {
					done();
				});
			});
	});

	afterEach(function(done) {
		User.collection.drop();
		done();
	});

	it('should securely retrieve a SINGLE user on /api/user POST', function(done) {
		bcrypt.hash('qqhappyfam1', 10)
			.then(function(hashedPW) {
				var newUser = new User({
					username: 'aquang0',
					email: 'aquang0@gmail.com',
					password: hashedPW
				});
				newUser.save(function(err, data) {
					chai.request(server)
						.post('/api/user')
						.send({email: data.email})
						.end(function(err, res) {
							res.should.have.status(200);
							res.should.be.json;
							done();
						});
				});
			})
			.catch(function(err) {
				console.log(new Error(err));
				done();
			});
	});

	it('should add a SINGLE user on /api/users POST', function(done) {
		chai.request(server)
			.post('/api/users')
			.send({username: 'aquang1', email: 'aquang1@gmail.com', password: 'qqhappyfam1'})
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('SUCCESS');
				res.body.SUCCESS.should.be.a('object');
				res.body.SUCCESS.should.have.property('username');
				res.body.SUCCESS.should.have.property('email');
				res.body.SUCCESS.should.have.property('password');
				res.body.SUCCESS.should.have.property('_id');
				done();
			});
	});
});