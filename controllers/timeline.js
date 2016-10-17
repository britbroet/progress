var express = require('express');
var router = express.Router();
var db = require("../models");
var passport = require("../config/ppConfig");
//var flash = require("connect-flash");

router.get('/', function(req, res) {
  res.render('timeline/new');
});

router.get('/new', function(req, res) {
  res.render('timeline/new');
});


// POST NEW TIMELINE (create new timeline)
router.post("/new", function(req, res){
	console.log(req.body);
	//res.send("Testing my post route, yay it worked");

	db.timeline.create({
		user_id: req.body.user,
		title: req.body.timelineName,
		description: req.body.timelineDesc
	}).then(function(timeline){ //<-- returning new timeline created
		res.redirect("/timeline/" + timeline.id);
		//res.send("success!");
	});
});

// SHOW SINGLE TIMELINE

router.get("/:id", function(req, res){
	console.log('redirected to show single timeline - req.params.id = ' + req.params.id);
	db.timeline.findOne({
		where: {id: req.params.id}
	}).then(function(timeline){
		res.render("timeline/single", {timeline: timeline});
	});
});


module.exports = router;
