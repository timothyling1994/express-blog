const { body,validationResult } = require('express-validator');
const { DateTime } = require('luxon');
var User = require('../models/user');
var Admin = require('../models/admin');
var Comment = require('../models/comment');
var Post = require('../models/post');

exports.comments = function (req,res,next) {
	
	Post.findById(req.params.id).populate('comments').exec(function(err,result){
		if(err){return next(err);}

		return res.json({
			results: result,
		});
	});
};

exports.create_comment = function (req,res,next) {
	Post.findById(req.params.id).exec(function(err,result){
		if(err){return next(err);}

		let new_comment = new Comment({
			user: req.body.userId,
			comment_content: req.body.comment_content,
			time_posted: DateTime.now().toFormat('MM-dd-yyyy'),
		});	

		new_comment.save(function(err){
			if(err){console.log('error saving new comment:'+error);}
			else
			{
				console.log("new comment saved!");
			}
		})

		let tempArr = [...result.comments];
		tempArr.push(new_comment);

		result.comments = tempArr;

		result.save(function(err){
			if(err){console.log('error creating comment');}
			else
			{
				return res.json({
					'msg':'Comment created!',
					'comment_content': new_comment.comment_content,
					'user': new_comment.userId,
					'time_posted': new_comment.time_posted
				});
			}
		})

	});
};

exports.update_comment = function (req,res,next) {
	console.log(req.params.id);
};

exports.delete_comment = function (req,res,next) {
	console.log(req.params.id);
};