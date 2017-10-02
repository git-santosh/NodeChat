var util = require('../middleware/utilities');
var config = require('../config/routes');
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
  res.render('Chat');
}

module.exports.logOut = (req,res) => {
  util.logOut(req.session);
  req.logout();
  res.redirect('/');
}