var mongoose = require("mongoose")
// 	passportLocalMongoose = require("passport-local-mongoose");

// UserSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model("User", UserSchema);
	
let UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true});
let Person = mongoose.model("Person", UserSchema);

