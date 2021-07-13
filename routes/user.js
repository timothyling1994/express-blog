var express = require('express');
var router = express.Router();

let User = require('../models/user');


let userController = require('../controllers/userController');


router.post('/', userController.create_user);

/* 
router.put('/', (req, res) => {
  return res.send('PUT HTTP method on user resource');
});
 
router.delete('/', (req, res) => {
  return res.send('DELETE HTTP method on user resource');
});*/





module.exports = router; 