var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
	email: {type:String, required:true},
	display_name: {type:String, required: true},
	title: {type:String, required:true},
	description: {type:String,required:true},
	time_posted: {type:Date, required:true},
	isPublished: {type:Boolean, required:true},
	comments: [{ type: Schema.Types.ObjectId, ref: 'User' }],

});


module.exports = mongoose.model('Post',PostSchema);