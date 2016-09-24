var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var orm = require('orm');
var session = require('express-session');

const CONFIG = {session_key: 'kevin'};


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//mysql
app.use(orm.express("mysql://root:@localhost/kevinaskin", {
    define: function (db, models, next) {
        models.user = db.define('user', {
            username: String,
            password: String,
            state: String
        });
        models.msgwall = db.define('msgwall', {
            text: String,
            username: String,
            time:String
        });
        models.article = db.define('article',{
            title:String,
            text:String,
            tags:Number
        });
        next();
    }
}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//session
app.use(session({
    secret: CONFIG.session_key,
    resave: false,
    saveUninitialized: true
}));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', require('./routes/login'));
app.use('/admin', require('./routes/admin'));
app.use('/about', require('./routes/about'));
app.use('/article',require('./routes/article'));
app.use('/api',require('./routes/api'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
