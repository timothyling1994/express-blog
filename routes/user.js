var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const querystring = require('querystring');
const bcrypt = require('bcryptjs');

const {check,validationResult} = require('express-validator');

let User = require('../models/user');
let Post = require('../models/post');
let Comment = require('../models/comment');

let userController = require('../controllers/userController');




router.get('/', (req, res, next) => {
  User.find({}).exec(function(err,userArr){
  	if(err){return next(err);}

  	return res.json({
  		result:userArr,
  	});
  });
});

router.post('/', userController.create_user);
 
router.put('/', (req, res) => {
  return res.send('PUT HTTP method on user resource');
});
 
router.delete('/', (req, res) => {
  return res.send('DELETE HTTP method on user resource');
});





module.exports = router; 