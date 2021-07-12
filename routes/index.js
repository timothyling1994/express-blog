var express = require('express');
var router = express.Router();

const {check,validationResult} = require('express-validator');

const session = require('./session');
const user = require('./user');
const comment = require('./comment');
const post = require('./post');
 
module.exports = {
  session,
  user,
  comment,
  post
}; 