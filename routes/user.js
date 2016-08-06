var express = require('express');
var router = express.Router();
var auth = require('./authentication');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET profile page */
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', auth.isLoggedIn, function(req, res) {
  res.render('profile',{
    user : req.user
  });
});

module.exports = router;
