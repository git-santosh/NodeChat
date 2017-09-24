module.exports.index = (req,res) => {
  res.cookie('indexCookie','set cookie');
  res.render('index',{cookie: JSON.stringify(req.cookies),session:JSON.stringify(req.session)});
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



