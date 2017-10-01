var util = require('../middleware/utilities');

module.exports.index = (req,res) => {
  //res.cookie('indexCookie','set cookie');
  res.render('index');
}

module.exports.login = (req,res) => {
  res.render('login');
}
module.exports.loginProcess = (req,res) => {
  var isAuth = util.auth(req.body.username, req.body.password, req.session);
  (isAuth != undefined)? res.redirect('/chat') :res.redirect('/login'); 
}

module.exports.chat = (req,res) => {
  res.render('Chat');
}

module.exports.logOut = (req,res) => {
  util.logOut(req.session);
  res.redirect('/');
}