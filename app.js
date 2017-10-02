var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
//var redisStore   = require('connect-redis')(session);
const MongoStore = require('connect-mongo')(session);
const mongoose   = require('mongoose');
const csrf       = require('csurf');
var bodyParser   = require('body-parser');
var partials     = require('express-partials');
var flash        = require('connect-flash');
//Defined Middleware
var util         = require('./middleware/utilities');
var errorHandlers= require('./middleware/errorhandlers');
var routes       = require('./routes');
var config       = require('./config/routes');
var passport     = require('./passport/index');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
require('dotenv').config({path:'.env'});

require('./passport/facebook');
/**
 * MongoDB connection code
 *  @param mongoURL
 */

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoURL).then(() => console.log('connected to DB'))
.catch(err => console.log(err));


//View engine set up

var app = express();
app.use(partials());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {
  defaultLayout: 'layout'
});
app.use(express.static(path.join(__dirname, 'public')));
// To parse every cookies and it must use before expressSession
app.use(cookieParser(process.env.secret));


app.use(session({
  secret: process.env.secret,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// app.use(session({
//   secret: 'santosh',
//   saveUninitialized: true,
//   resave: false,
//   store: new redisStore({
//     host:process.env.redisHost,
//     port:process.env.redisPort 
//   })
// }));
// configure the app to use bodyParser()
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(csrf());
app.use(util.csrf);
app.use(util.templateRoutes);
app.use(util.authenticated);

app.use(flash());

app.use(passport.passport.initialize());
app.use(passport.passport.session()); // always after express sesssion because Passport extends Express' session

app.locals.siteName = "Express site";

//routes define 
app.get('/', routes.index);
app.get(config.routes.login, routes.login);
app.post(config.routes.login, routes.loginProcess);
app.get(config.routes.logout, routes.logOut);
app.get(config.routes.chat, ensureLoggedIn('/login') , routes.chat);
app.get('/account/login', routes.login);
passport.routes(app);
// catch 404 and forward to error handler
app.use(errorHandlers.notFound);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.status = err.status;
  //res.locals.user = {username : ""};
  //res.locals.isAuthenticated = false;
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;