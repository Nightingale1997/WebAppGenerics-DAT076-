var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-validator');
var mustacheExpress = require('mustache-express');
var expressValidator = require('express-validator');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var index = require('./routes/index');
var users = require('./routes/users');
var db = require('./controllers/db');
var app = express();


// Make it possible to access a session object in Mustache templates
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

var routes =  require('./routes/index');
var users = require('./routes/users');


passport.use(new LocalStrategy(function(username, password, done){
    console.log('inserted username on login page:' +
        username);
    console.log('inserted password on login page:' +
        password);
    const sql = require('./database.js');
    sql.query('SELECT userID, password, admin FROM ACCOUNT where username = ?', [username], function(err, results, fields){
        if (err){
            {done(err)}
        };
        if (results.length === 0){
            done(null, false);
        } else {

            var hashbae = results[0].password.toString();
            console.log(hashbae);
            bcrypt.compare(password, hashbae, function (err, response) {
                if (response === true) {
                    console.log(results[0].userID.toString());
                    return done(null, {userID: results[0].userID});
                } else done(null, false);
            });
        }
      //  return done(null, {userID: 10});
    })

   // return done(null, false);
}));

//var mongo = require('sql');
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/loginapp');
//var db = mongoose.connection;






// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', mustacheExpress()) // Same as file extensions (*.html)
//app.set('view engine', 'jade');
app.set('view engine', 'html');

// Cookie parser
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Session Options
var options = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'webshop'
}
var sessionStore = new MySQLStore(options);


// Express Session
app.use(session({
    key: 'session_cookie_name',
    secret: 'secret',
    store: sessionStore,
    saveUninitialized: true,
    resave: true
}));

//Passport Init
app.use(passport.initialize());
app.use(passport.session());



// Connect Flash
//app.use(flash());

/*
// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
*/

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));
app.use(function(req, res, next){
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
})


app.use('/', routes);
//app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





// Set Port
app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+app.get('port'));
});

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
