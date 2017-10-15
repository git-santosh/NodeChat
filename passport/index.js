const passport = require('passport');
const config = require('../config/routes');
const User = require('../models/User').userModel;
let localAuth = require('../passport/password');

//Passport needs to know how to serialize the user to go into the session and how to get it back out.
passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
     console.log('deserializeUser');
    User.findOne({ "_id": id }, (err, user) => {
    if (err) { return done(err); }
    done(null, user);
  });
});
const local = require('passport-local').Strategy;

passport.use(new local({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true  // allows us to pass back the entire request to the callback

    },function(req,email ,password ,done){
    User.findOne({email:email},function(err,user){
        if(err){
           // req.flash('errorLogin', err.errmsg);
            return done(null ,err);
        }
        localAuth.passwordCheck(email,user.password,user.salt,user.work,function(err,callback){
             if(err){
                //req.flash('errorLogin', err.errmsg);
                return done(null,err);
            }
            if (!user) return done(null, false, req.flash('errorLogin', 'No user found.'));
            if(callback){
               // req.session.isAuthenticated = true;
                //req.session.user = {username: user.provider_name}; 
                //res.locals.user = req.session.user;
                return done(null, user);
            }else{
                //req.flash('errorLogin','Missing Credientials');
                return done(null, false, req.flash('errorLogin', 'Oops! Wrong password.'));
            }
         });
    });
}))
var routes = (app) => {
    // app.get(config.routes.facebookAuth, passport.authenticate('facebook'));
    // app.get(config.routes.facebookAuthCallback, passport.authenticate('facebook',
    // {
    //     successRedirect: config.routes.chat, 
    //     failureRedirect: config.routes.login, 
    //     failureFlash: true
    // }));
    //The scope tells Google what we want to access from the user.
    //Facebook also can use scope. If you do not specify a scope,Facebook will use a default scope
    // app.get(config.routes.googleAuth,passport.authenticate('google',{
    //     scope:['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']
    // }));
    // app.get(config.routes.googleAuthCallback,passport.authenticate('google',{
    //     successRedirect: config.routes.chat, 
    //     failureRedirect: config.routes.login, 
    //     failureFlash: true
    // }));
};

//exports.passport = passport;
//exports.routes   = routes;