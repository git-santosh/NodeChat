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



// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//    res.render('index', { title: 'Express' });
// });

// module.exports = router;