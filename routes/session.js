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

router.get('/',(req,res)=>{
	return res.send(req.currentUser);
});	
 


 module.exports = router; 