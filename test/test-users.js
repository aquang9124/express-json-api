var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var should = chai.should();

chai.use(chaiHttp);

describe('Users', function() {
	User.collection.drop();

	beforeEach(function(done) {
		var newUser = new User({
			username: 'aquang0',
			email: 'aquang0@gmail.com',
			password: 'qqhappyfam'
		});
		newUser.save(function(err) {
			done();
		});
	});

	afterEach(function(done) {
		User.collection.drop();
		done();
	});

	it('should add a SINGLE user on /api/users POST', function(done) {
		chai.request(server)
			.post('/api/users')
			.send({username: 'aquang1', email: 'aquang1@gmail.com', password: 'qqhappyfam1'})
			.end(function(err, res) {
				console.log(res.body);
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('SUCCESS');
				done();
			});
	});
});