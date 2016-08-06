var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var db = require('../config/database');

var userSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    surname: String
}, { collection: db.userCollection });

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
