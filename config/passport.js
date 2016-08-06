var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport){

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


  // =========================================================================
  // LOCAL SIGNUP =============================================================
  // =========================================================================
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done){
    process.nextTick(function(){
      User.findOne({'email':email},function(err,user){
        if(err){
          return done(err);
        }
        if(user){
          return done(null, false, req.flash('signupMessage','That email is already taken.'));
        }else{
          var newUser = new User();
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.name = req.body.name;
          newUser.surname = req.body.surname;

          newUser.save(function(err){
            if(err){
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done){
    User.findOne({'email':email}, function(err,user){
      if(err){
        return done(err);
      }
      if(!user){
        return done(null, false, req.flash('loginMessage','User not found!'));
      }
      if(!user.validPassword(password)){
        return done(null, false, req.flash('loginMessage','Wrong password!'));
      }
      return done(null, user);
    });

  }));
};
