var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
//var index = require('./routes/index');
//var users = require('./routes/users');

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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.siteName = "Express site";
app.get('/', routes.index);
app.get('/login',routes.login);
app.post('/login',routes.loginProcess);
app.get('/chat',routes.chat);
app.get('/account/login',routes.login);

//app.use('/users', users);

// catch 404 and forward to error handler
app.use(errorHandlers.notFound);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
