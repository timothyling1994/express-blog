var Post = require('../models/post');

exports.all_posts = function (req,res,next){
	Post.find({}).exec(function(err,results){
		return res.json({
			results,
		});
	});
};
