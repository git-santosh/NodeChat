module.exports.csrf = (req, res, next) => {
    res.locals.token = req.csrfToken();
    next();
};
//We will store whether or not someone is authenticated in the session.
module.exports.authenticated = ( req,res,next ) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  if (req.session.isAuthenticated) {
     res.locals.user = req.session.user;
  }
  next();
}
//middleware to check to see if someone is authenticated
module.exports.requireAuthentication =(req,res,next) => {
  if (req.session.isAuthenticated)
  {
    next(); //If you are authenticated, run the next
  }else
  {
    res.redirect('/login');
  }
}
module.exports.auth = (username, password, session) => {
  var isAuth = username === "santosh" || username === "suryawanshi";
    if(isAuth){
      session.isAuthenticated = true;
      session.user = {username: username};  
    }
    return isAuth;
}
module.exports.logOut = function logOut(session){
  session.isAuthenticated = false;
  delete session.user;
};