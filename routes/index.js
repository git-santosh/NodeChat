var util = require('../middleware/utilities');
var config = require('../config/routes');
let express = require('express');
let router = express.Router();
let User = require('../models/User').userModel;

router.get('/',(req,res) => {
  //res.cookie('indexCookie','set cookie');
  res.render('index');
})

router.get(config.routes.register,(req,res) => {
 res.render('register',{ message: req.flash('error')});
});

router.post(config.routes.register, (req,res) => {
  let info = req.body;
  let userSchema = new User({
    provider_id : "",
    provider_name : info.name,
    provider : "local",
    email :info.email,
    gender : (Object.getOwnPropertyNames(info)[3] == "gender") ? info.gender : "NULL",
    password : info.password
  });
  userSchema.save().then((result)=>{
    res.redirect(config.routes.login);   
  }).catch(function(err){
    req.flash('error', err.errmsg);
    res.redirect(config.routes.register); 
  });
  
});

module.exports = router;