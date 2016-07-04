var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server');
var mongoose = require('mongoose');
var User = require('../server/models/userSchema');
var should = chai.should();

chai.use(chaiHttp);

describe('Users', function() {

});