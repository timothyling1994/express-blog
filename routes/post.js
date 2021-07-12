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


router.get('/post', (req, res) => {
  return res.send('GET HTTP method on post resource');
});
 
router.post('/post', (req, res) => {
  return res.send('POST HTTP method on post resource');
});
 
router.put('/post', (req, res) => {
  return res.send('PUT HTTP method on post resource');
});
 
router.delete('/post', (req, res) => {
  return res.send('DELETE HTTP method on post resource');
});

module.exports = router; 