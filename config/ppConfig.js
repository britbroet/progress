var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

//Passport has 3 functions we need to implement - serializeUser, deserializeUser, and use
//serializeuser takes user object and returns id (gets id from user object)
passport.serializeUser(function(user, cb){ // <-- this user is one from model
	cb(null, user.id);
});

// Deserialize takes the id and looks up the user in the database (opposite of serialize)
passport.deserializeUser(function(id, cb){
	db.user.findById(id).then(function(user){
		cb(null, user);
	});
});

//use:
passport.use(new LocalStrategy({
	usernameField: "email", // <-- email defined by us (column in model), usernameField from LocalStrategy?
	passwordField: "password"
}, 
function(email, password, cb){
	db.user.find({
		where: { email: email }
	}).then(function(user){
		if(!user || !user.validPassword(password)){ // <-- validPassword from that instance method
			cb(null, false); //<-- false here means no user/no login
		}
		else {
			cb(null, user);
		}
	}).catch(cb);
}));

module.exports = passport; // (this stuff needed in index.js)