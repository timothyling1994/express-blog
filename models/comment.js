var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({

	user: { type: Schema.Types.ObjectId, ref: 'User' },
	comment_content: {type:String, required:true},
	time_posted: {type:Date, required:true},

});


module.exports = mongoose.model('Comment', CommentSchema);