let express = require('express');
let router = express.Router();
let passport = require('passport');
const config = require('../config/routes');
const google   = require('passport-google-oauth').OAuth2Strategy;
const fbStrategy = require('passport-facebook').Strategy;
let localAuth = require('../passport/password');
const User = require('../models/User').userModel;
router.get('/',function(req,res){
    res.send('ok');
})
router.get('/google',
    passport.authenticate('google',{
        scope:['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']
    }),(req,res)=>{

});

router.get('/google/callback',passport.authenticate('google',{
      //  successRedirect: config.routes.chat, 
        failureRedirect: config.routes.login, 
        failureFlash: true
}),(req,res)=>{
    console.log('first');
    User.findOne({ "_id": req.session.passport.user }, (err, user) => {
     if (err) { return next(err); }
        req.session.isAuthenticated = true;
        req.session.user = {username: user.provider_name}; 
        res.locals.user = req.session.user;
        res.redirect(config.routes.chat);
    });
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook',
    {
        //successRedirect: config.routes.chat, 
        failureRedirect: config.routes.login, 
        failureFlash: true
    }),(req,res)=>{
    User.findOne({ "_id": req.session.passport.user }, (err, user) => {
     if (err) { return next(err); }
        req.session.isAuthenticated = true;
        req.session.user = {username: user.provider_name}; 
        res.render(config.routes.chat);
    });
});

router.get('/login',(req,res) => {
  res.render('login',{title: 'Login', message: req.flash('errorLogin')});
});

router.post('/login',(req,res) => {   
    let log = (req.method == "POST") ? req.body : req.query;
    User.findOne({email:log.email},function(err,user){
        console.log(' in ')
        if(err){
            req.flash('errorLogin', err.errmsg);
            return res.redirect(config.routes.login); 
        }
        localAuth.passwordCheck(log.password,user.password,user.salt,user.work,function(err,callback){
             if(err){
                req.flash('errorLogin', err.errmsg);
                return res.redirect(config.routes.login); 
            }
            if(callback){
                req.session.isAuthenticated = true;
                req.session.user = {username: user.provider_name}; 
                res.locals.user = req.session.user;
                res.redirect(config.routes.chat);
            }else{
                req.flash('errorLogin','Missing Credientials');
                return res.redirect(config.routes.login); 
            }
         });
    });
});

router.get('/logout',(req,res)=>{
    req.session.isAuthenticated = false;
    req.session.user = {userName :""};
  req.logout();
  res.redirect('/');
});
module.exports = router;
