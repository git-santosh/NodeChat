const passport = require('passport');
const google   = require('passport-google-oauth').OAuth2Strategy;
const config   = require('../config/routes');
const User = require('../models/User');

passport.use(new google({
    clientID : process.env.googleClientID,
    clientSecret:process.env.googleClientSecret,
    callbackURL:config.routes.googleAuthCallback
},(accessToken, refreshToken, profile, done) => {
    //done(null, profile);
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick( () => {
        // try to find the user based on their google id
       User.findOne({provider_id : profile.id},(err,user) => {
            if(err){
                return done(err);   
            }
            if(user){
                return done(null,user);
            }
            let newUser = new User({
                provider_id  : profile.id,
                provider_name: profile.displayName,
                provider     : profile.provider,
                email        : profile.emails[0].value,
                photo        : profile.photos[0].value,
                gender       :profile.gender
            });
            newUser.save((err) =>{
                if(err){
                    return done(err);
                }
                done(null,user);
            });
       }) 
    });
}));
