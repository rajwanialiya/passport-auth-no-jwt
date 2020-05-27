// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

mongoose.connect('mongodb://localhost:27017/beerlocker', { useMongoClient: true }); //REPLACE THIS

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());

// /api/users endpoint (GET and POST)
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

app.use('/api', router);

app.listen(3000);