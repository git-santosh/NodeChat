const passport = require('passport');
const config = require('../config/routes');
const User = require('../models/User');

//Passport needs to know how to serialize the user to go into the session and how to get it back out.
passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findOne({ "_id": id }, (err, user) => {
    if (err) { return done(err); }
    done(null, user);
  });
});

var routes = function routes(app){
    app.get(config.routes.facebookAuth, passport.authenticate('facebook'));
    app.get(config.routes.facebookAuthCallback, passport.authenticate('facebook',
    {
        successRedirect: config.routes.chat, 
        failureRedirect: config.routes.login, 
        failureFlash: true
    }));
};

exports.passport = passport;
exports.routes   = routes;