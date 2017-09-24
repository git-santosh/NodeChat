module.exports.index = (req,res) => {
  res.render('index',{url:req});
}

module.exports.login = (req,res) => {
  res.render('login');
}
module.exports.loginProcess = (req,res) => {
  res.redirect('/');
}

module.exports.chat = (req,res) => {
  res.render('Chat');
}



