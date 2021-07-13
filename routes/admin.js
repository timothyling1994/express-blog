var express = require('express');
var router = express.Router();

let Admin = require('../models/admin');


let adminController = require('../controllers/adminController');


router.get('/', (req, res, next) => {
  Admin.find({}).exec(function(err,adminArr){
  	if(err){return next(err);}

  	return res.json({
  		result:adminArr,
  	});
  });
});

router.post('/', adminController.create_admin);
 
router.put('/', (req, res) => {
  return res.send('PUT HTTP method on user resource');
});
 
router.delete('/', (req, res) => {
  return res.send('DELETE HTTP method on user resource');
});





module.exports = router; 