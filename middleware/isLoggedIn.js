module.exports = function(req, res, next){
	if(!req.user){ //if logged in, go on
		res.redirect("/auth/login");
	}
	else { //user not logged in - redirect back out
		next();
	}
}