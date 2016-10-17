var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var passport = require("./config/ppConfig");
var session = require("express-session");
var isLoggedIn = require("./middleware/isLoggedIn");
var flash = require("connect-flash");
require("dotenv").config();
var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
	secret: process.env.SESSION_SECRET_KEY,
	resave: false, //?
	saveUninitialized: true //save at beginning?
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash(); //passing things from requests (user logged in and flash alerts - putting them in res.local so they can be accessed by views)
	next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/account', isLoggedIn, function(req, res) {
  res.render('account');
});


app.use('/auth', require('./controllers/auth'));
app.use('/timeline', require('./controllers/timeline'));

var server = app.listen(process.env.PORT || 3000);