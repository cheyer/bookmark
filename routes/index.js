//var express = require('express');
//var router = express.Router();
var auth = require('./authentication');
module.exports = function(app, passport) {

/* GET home page. */
app.get('/', auth.isLoggedIn, function(req, res, next) {
  res.render('index', {
    title: 'Node Passport Authentication',
    user : req.user
  });
});

/* GET login page */
app.get('/login', auth.isLoggedOut, function(req, res) {
  res.render('login', {message: req.flash('loginMessage')});
});

/* POST login form */
app.post('/login', passport.authenticate('local-login',{
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

/* GET signup page */
app.get('/signup', auth.isLoggedOut, function(req, res) {
  res.render('signup', {message: req.flash('signupMessage')});
});

/* POST signup form */
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

/* GET logout */
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});
};



//module.exports = router;
