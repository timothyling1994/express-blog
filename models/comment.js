var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
	username: {type:String, required:true},
	commentContent: {type:String, required:true},
	time_posted: {type:Date, required:true},

});


module.exports = mongoose.model('Comment', CommentSchema);