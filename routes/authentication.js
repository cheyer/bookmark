module.exports = {

  isLoggedIn: function (req, res, next){
    if(req.isAuthenticated()){
      return next();
    }else{
      res.redirect('/login');
    }
  },
  isLoggedOut: function (req, res, next){
    if(!req.isAuthenticated()){
      return next();
    }else{
      res.redirect('/');
    }
  }

};
