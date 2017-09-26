var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var session = require('express-session');
//var redisStore = require('connect-redis')(session);
const MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var partials = require('express-partials');
const dbURL = "mongodb://localhost/nodechat";
mongoose.Promise = global.Promise;
mongoose.connect(dbURL).then(() => console.log('connected to DB'))
.catch(err => console.log(err));

var routes = require('./routes');
var app = express();
var errorHandlers = require('./middleware/errorhandlers');
app.use(partials());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {defaultLayout: 'layout'});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
//app.use(session({secret:'ZtCMzUAgPL',saveUninitialized:true,resave:true,store:new redisStore({url:'redis://localhost'})}));
app.use(session({
  secret: "ZtCMzUAgPL",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
// app.use(function(req, res, next){
//   if(req.session.pageCount)
//     req.session.pageCount++;
//   else
//     req.session.pageCount = 1;
//   next();
// });
app.use(express.static(path.join(__dirname, 'public')));
app.locals.siteName = "Express site";
app.get('/', routes.index);
app.get('/login',routes.login);
app.post('/login',routes.loginProcess);
app.get('/chat',routes.chat);
app.get('/account/login',routes.login);


// catch 404 and forward to error handler
app.use(errorHandlers.notFound);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.status = err.status;
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
