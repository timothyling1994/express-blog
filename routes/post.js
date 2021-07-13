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

//need to protect this 
router.post('/post', (req, res) => {
  return res.send('POST HTTP method on post resource');
});

//need to protect this
router.put('/post', (req, res) => {
  return res.send('PUT HTTP method on post resource');
});
 
//need to protect this
router.delete('/post', (req, res) => {
  return res.send('DELETE HTTP method on post resource');
});

module.exports = router; 