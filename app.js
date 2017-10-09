var express          = require('express');
var path             = require('path');
var favicon          = require('serve-favicon');
var logger           = require('morgan');
var cookieParser     = require('cookie-parser');
var session          = require('express-session');
//var redisStore       = require('connect-redis')(session);
const MongoStore     = require('connect-mongo')(session);
const mongoose       = require('mongoose');
const csrf           = require('csurf');
var bodyParser       = require('body-parser');
var partials         = require('express-partials');
var flash            = require('connect-flash');
var expressValidator = require('express-validator');
var compression = require('compression');
var helmet = require('helmet');

//Defined Middleware
var util             = require('./middleware/utilities');
var errorHandlers    = require('./middleware/errorhandlers');
var index            = require('./routes');
var auth             = require('./routes/auth'); 
var chat             = require('./routes/chat'); 
var config           = require('./config/routes');
var passport         = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

require('dotenv').config({path:'.env'});

require('./passport/index');
require('./passport/google');
require('./passport/facebook');

/**
 * MongoDB connection code
 *  @param mongoURL
 */

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoURL, { useMongoClient: true }).then(() => console.log('connected to DB'))
.catch(err => console.log(err));


//View engine set up

var app = express();
app.use(partials());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {
  defaultLayout: 'layout'
});
app.use(compression()); //Compress all routes
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
// To parse every cookies and it must use before expressSession
app.use(cookieParser(process.env.secret));
app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false,
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


//app.use(util.setVariables);
//app.use(util.templateRoutes);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator()); // Add this after the bodyParser middlewares!
app.use(csrf());
app.use(util.csrf);
app.use(flash());


app.use(passport.initialize());
app.use(passport.session()); // always after express sesssion because Passport extends Express' session
app.locals.siteName = "Express site";
app.locals.routes = config.routes; 
app.use(util.authenticated);
//routes define 
app.use('/', index);
app.use('/auth',ensureLoggedOut(),auth);
app.use(config.routes.chat,ensureLoggedIn('/auth/login') , chat);
//passport.routes(app);
// catch 404 and forward to error handler
app.use(errorHandlers.notFound);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.status = err.status;
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;