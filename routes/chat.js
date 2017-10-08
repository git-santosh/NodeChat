let express = require('express');
let router = express.Router();
const User = require('../models/User').userModel;

router.get('/',(req,res) => {
    // User.findOne({ "_id": req.session.passport.user }, (err, user) => {
    //  if (err) { return next(err); }
    //     req.session.isAuthenticated = true;
    //     req.session.user = {username: user.provider_name}; 
    //     res.render('Chat');
    // });
  res.render('Chat');
});

module.exports = router;