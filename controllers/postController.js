var Post = require('../models/post');

exports.all_posts = function (req,res,next){
	Post.find({}).exec(function(err,results){
		return res.json({
			results,
		});
	});
};

exports.post = function (req,res,next){
	Post.findById(req.params.id).exec(function(err,results){
		return res.json({
			results,
		});
	});
};
