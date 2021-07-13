var express = require('express');
var router = express.Router();
const passport = require('passport');

let User = require('../models/user');
let Post = require('../models/post');
let Comment = require('../models/comment');

let userController = require('../controllers/userController');
let adminController = require('../controllers/adminController');
//let postController = require('../controllers/postController');

//router.get('/post',postController);


module.exports = router; 