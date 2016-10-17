var express = require('express');
var router = express.Router();
var db = require("../models");
var passport = require("../config/ppConfig");
//var flash = require("connect-flash");

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post("/signup", function(req,res){
	db.user.findOrCreate({
		where: { email: req.body.email },
		defaults: {
			name: req.body.name,
			phone: req.body.phone,
			password: req.body.password
		}
	}).spread(function(user, wasCreated){ //gives us both the user, and T/F whether user was created (vs found)
		if(wasCreated) {
			passport.authenticate("local", {
				successRedirect: "/",
				successFlash: "account created and logged in" // this is how we pass to passport (vs directly below in error)
			})(req, res); // <-- calling as iffy (immediately invoked function)

		}
		else {
			//req.flash("error", "Email exists already");
			console.log('error - email exists already');
			res.redirect("/auth/signup");
		} // end if/else about whether or not user was created
	}).catch(function(err){
		console.log('an error occured ' + err);
		//req.flash("error", "An error occurred: " + err.message); //how we pass flash directly
		res.redirect("/auth/signup");
	}); //end spread 
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/auth/login", //back to get route
	failureFlash: "Invalid creds",
	successFlash: "You have successfully logged in"
}));

//way to log out
router.get("/logout", function(req, res){
	req.logout(); //built in passport functoin
	req.flash("success", "logged out");
	res.redirect("/");
});

module.exports = router;
