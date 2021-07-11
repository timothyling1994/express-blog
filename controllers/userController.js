const { body,validationResult } = require('express-validator');
var User = require('../models/user');


exports.create_user = function (req,res,next){
	
	return res.send(req.body);
};