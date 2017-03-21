var mongoose = require ("mongoose");

var userSchema = mongoose.Schema({
	name: {
		first: String,
		last: String
	},
	age : { type: Number, min:0 }
});