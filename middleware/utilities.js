var config = require('../config/routes');
const User = require('../models/User').userModel;
let localAuth = require('../passport/password');
module.exports.csrf = (req, res, next) => {
    res.locals.token = req.csrfToken();
    next();
};
//We will store whether or not someone is authenticated in the session.
module.exports.authenticated =(req, res, next) => {
  console.log('secound')
  if(!req.isAuthenticated()){
      console.log('count auth');
      req.session.isAuthenticated =false;
      req.session.user = {userName :""};  
  } 
    res.locals.isAuthenticated =req.session.isAuthenticated;
     res.locals.user = req.session.user;
     res.locals.url = req.url;
    //console.log(JSON.stringify(res.session));
    next();
};

//middleware to check to see if someone is authenticated
module.exports.requireAuthentication = (req,res,next) => {
  if (req.isAuthenticated || req.isAuthenticated())
  {
   next(); //If you are authenticated, run the next
  }else
  {
    res.redirect(config.routes.login);
  }
}

// exports.templateRoutes = (req, res, next) => {

//   next();
// };
