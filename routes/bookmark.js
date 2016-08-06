var express = require('express');
var router = express.Router();
var auth = require('./authentication');
var mongoose = require('mongoose');
var Bookmark = mongoose.model('Bookmark');

/* add bookmark */
router.post('/add', auth.isLoggedIn, function(req, res, next) {

  var item = {
    "url" : req.body.URL,
    "name" : req.body.name,
    "tags" : req.body.tags,
    "user_id" : req.user._id
  };

  var bookmark = new Bookmark(item);
  bookmark.save(function (err, bookmark) {
    if (err) {
      return next(err);
    }
    res.json({ "success": true, "bookmark":bookmark });
  });
});


/* get all bookmarks */
router.get('/get', auth.isLoggedIn, function(req, res, next) {

  Bookmark.find({ "user_id" : req.user._id }, function (err, docs) {
    if (err) {
      return next(err);
    }
    res.json({ "success": true, "bookmarks":docs });
  });
});

/* get bookmark by id */
router.get('/get/:id', function(req, res, next) {
  Bookmark.findById(req.params.id, function (err, doc){
    if (err) {
      return next(err);
    }
    if(doc.user_id != req.user._id){
      res.json({ "success": false, "bookmark":null });
    }else{
      res.json({ "success": true, "bookmark":doc });
    }
  });
});

/* delete bookmark by id */
//TODO: replace get with delete
router.get('/delete/:id', function(req, res, next) {
  Bookmark.findById(req.params.id, function (err, doc){
    if (err) {
      return next(err);
    }
    if(doc.user_id != req.user._id){
      // hier nicht löschen, da bookmark von jemand anderen
      res.json({ "success": false, "msg" : "no such bookmark id"});
    }else{
      // hier darf man löschen
      Bookmark.remove({ _id: req.params.id }, function(err) {
        if (!err) {
          res.json({ "success": true, "msg" : "bookmark deleted"});
        }
        else {
          res.json({ "success": false, "msg" : "db error"});
        }
      });
    }
  });
});


module.exports = router;
