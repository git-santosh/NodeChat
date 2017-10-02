var util = require('../middleware/utilities');
var config = require('../config/routes');
const User = require('../models/User');

module.exports.index = (req,res) => {
  //res.cookie('indexCookie','set cookie');
  res.render('index');
}

module.exports.login = (req,res) => {
  res.render('login',{title: 'Login', message: req.flash('error')});
}
module.exports.loginProcess = (req,res) => {
  var isAuth = util.auth(req.body.username, req.body.password, req.session);
  if(isAuth){
    res.redirect('/chat');
  }else 
  {
    req.flash('error', 'Wrong Username or Password');
    res.redirect(config.routes.login); 
  }
}

module.exports.chat = (req,res) => {
  User.findOne({ "_id": req.session.passport.user }, (err, user) => {
    if (err) { return err; }
    res.locals.isAuthenticated = true;
      res.locals.user = {username: user.provider_name}; 
      return res.render('Chat');
  });
  
}

module.exports.logOut = (req,res) => {
  util.logOut(req.session);
  req.logout();
  res.redirect('/');
}