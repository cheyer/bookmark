var mongoose = require('mongoose');
var db = require('../config/database');

var bookmarkSchema = mongoose.Schema({
    url: String,
    name: String,
    tags: String,
    user_id: String
}, { collection: db.bookmarkCollection });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
