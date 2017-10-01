module.exports.index = (req,res) => {
  res.cookie('indexCookie','set cookie');
  res.render('index',{cookie: JSON.stringify(req.cookies),session:JSON.stringify(req.session),
    signedCookie: JSON.stringify(req.signedCookies)});
}

module.exports.login = (req,res) => {
  res.render('login');
}
module.exports.loginProcess = (req,res) => {
  console.log(req.body);
  res.send(req.body.username+' '+req.body.password);
}

module.exports.chat = (req,res) => {
  res.render('Chat');
}
