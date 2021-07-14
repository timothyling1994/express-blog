const { body,validationResult } = require('express-validator');
var Admin = require('../models/admin');
var User = require('../models/user');
var Post = require('../models/post');
const bcrypt = require('bcryptjs');
const { DateTime } = require('luxon');

exports.all_users = function (req,res,next) {
	User.find({}).exec(function(err,userArr){
	    if(err){return next(err);}

	    return res.json({
	      result:userArr,
	    });
  	});
};	

exports.all_admin = function (req,res,next) {
	Admin.find({}).exec(function(err,adminArr){
	  	if(err){return next(err);}

	  	return res.json({
	  		result:adminArr,
	  	});
	});
};	

exports.create_admin = [
	body('email',"Must be an email address").isEmail().trim().escape().normalizeEmail(),
	body('display_name',"Must be an email address").trim().escape(),
	body('password').isLength({min:8}).withMessage('Password must be at least 8 characters long.')
	.matches('[0-9]').withMessage('Password Must Contain a Number')
	.matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
	.trim().escape(),

	(req,res,next) => {
		const errors = validationResult(req);

		if(!errors.isEmpty()){
			res.status(422).json({
				errors: errors.array()
			});
			return;
		}

		else
		{
			bcrypt.hash(req.body.password,10,(err,hashedPassword)=>{
				if(err){return next(err)};

				const admin = new Admin({
					email:req.body.email,
					display_name: req.body.display_name,
					password:hashedPassword
				}).save(err=>{
					if(err){
						return next(err);
					}

					console.log("admin saved!");

					return res.json({
						email: req.body.email,
						password: hashedPassword,
						display_name: req.body.display_name,
					});
				});
			});
		}
	}
];

exports.create_post = [
	body('title',"Must include a title").escape(),
	body('description',"Must include a description").escape(),
	

	(req,res,next) => {
		const errors = validationResult(req);

		if(!errors.isEmpty()){
			res.status(422).json({
				errors: errors.array()
			});
			return;
		}

		else
		{
			
			const post = new Post({
		
					email: req.body.email,
					display_name: req.body.display_name,
					title: req.body.title,
					description: req.body.description,
					time_posted: DateTime.now().toFormat('MM-dd-yyyy'),
					isPublished: req.body.isPublished,
					comments: [],

				}).save(err=>{
					
					if(err){
						return next(err);
					}

					console.log("post saved!");

					return res.json({
						email: req.body.email,
						display_name: req.body.display_name,
						title: req.body.title,
						description: req.body.description,
						time_posted: DateTime.now().toFormat('MM-dd-yyyy'),
						isPublished: req.body.isPublished,
						comments: [],
					});
			});
		}
	}
];

exports.update_post = function(req,res,next){
	Post.findById(req.params.id).exec(function(err,results){
		if(err){return next(err);}

		if(results == null)
		{
			res.json({
				"msg":"Post not found. Cannot update.",
				"id":req.params.id
			});
		}
		else
		{
			let updated_post = new Post({
				_id: req.params.id,
				email: req.body.email,
				display_name: req.body.display_name,
				title: req.body.title,
				description: req.body.description,
				time_posted: results.time_posted,
				isPublished: req.body.isPublished,
				comments: results.comments,
			});

			Post.findByIdAndUpdate(req.params.id,updated_post, {}, function (err, thepost){
				if(err){return next(err);}
				res.json({
					"msg":"Post updated",
					"id":req.params.id
				});
			});
		}
	});
};

exports.delete_post = function(req,res,next){
	
	Post.findById(req.params.id).exec(function(err,results){
		if(err){return next(err);}

		if(results == null)
		{
			res.json({
				"msg":"Post not found. Cannot delete.",
				"id":req.params.id
			});
		}
		else
		{
			Post.findByIdAndRemove(req.params.id,function deletePost(err){
				if(err){return next(err);}
				res.json({
					"msg":"Post deleted",
					"id":req.params.id
				});
			});
		}
	});

};
