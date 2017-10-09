const passport = require('passport');
const fbStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const config = require('../config/routes');

passport.use(new fbStrategy({
    clientID :process.env.facebookAppID,
    clientSecret:process.env.facebookAppSecret,
    callbackURL: config.host + config.routes.facebookAuthCallback
},(accessToken, refreshToken, profile, done) => {
    User.findOne({provider_id : profile.id}, (err,user) =>{
        if(err){
            return done(err);
        }
        if(user){
            return done(null,user);
        }
        const newUser = new User({
             provider_id: profile.id,
             provider_name: profile.displayName,
             provider : profile.provider
        });
        newUser.save((err)=>{
            if(err){
                return done(err);
            }
            done(null,newUser);
        })
    })
}));
