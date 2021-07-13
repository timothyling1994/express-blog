var express = require('express');
var router = express.Router();

let Admin = require('../models/admin');
let adminController = require('../controllers/adminController');


router.post('/post',adminController.create_post);

router.put('/post/:id',adminController.update_post);
 
router.delete('/post/:id',adminController.delete_post);

router.get('/users',adminController.all_users);

router.get('/', adminController.all_admin);

router.post('/', adminController.create_admin);
 



module.exports = router; 