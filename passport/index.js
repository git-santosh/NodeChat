const passport = require('passport');
const config = require('../config/routes');
const User = require('../models/User').userModel;

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