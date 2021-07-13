var express = require('express');
var router = express.Router();

let User = require('../models/user');


let userController = require('../controllers/userController');


router.post('/', userController.create_user);


module.exports = router; 