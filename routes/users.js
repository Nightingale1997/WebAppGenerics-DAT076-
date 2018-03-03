var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const mysql = require('../database.js');
var expressValidator = require('express-validator');
var bcrypt = require('bcryptjs');

//Reg
router.get('/register', function(req, res, next) {
  res.render('register');
});


//Login page
router.get('/login', authenticationMiddleware(),function(req, res, next) {
    res.render('profile');
});

//Login post
router.post('/login', passport.authenticate('local'),
    function(req,res){
        res.redirect('profile');
    }

);

/*
//Login succesful
router.get('/', function(req, res) {
    console.log('redirected from users.js');
    console.log(req.user);
    res.render('index', { title: 'Hola mr customer' });
    //next();
});
*/

//Profile-page
router.get('/profile', authenticationMiddleware(), function(req,res) {
    res.render('profile');
})

router.post('/register', function(req, res){
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    console.log(username);

    // Validation

    var errors = req.validationErrors();
    if(errors){
        console.log(errors);
        res.render('register', {title: 'u dun goofd', errors:errors
        });
    } else {
        console.log("no errors");
        bcrypt.hash(password, 10, function(err, hash)
        {
            mysql.query('INSERT INTO account (Username, Email, Password, Admin, Name, Address1, Address2, Phone) VALUES' +
                ' (?, ?, ?, 0, Name, Address1, Address2, 0)', [username, email, hash], function (error, results, fields) {
                if (error) {
                    res.render('register', {title: error});
                } else
                    mysql.query('SELECT LAST_INSERT_ID() as userID', function(error, results, fields){
                        if (error){
                            console.log('error #2')
                            throw error;
                        }
                        var userID = results[0];
                        console.log(results[0]);
                            req.login(userID, function(err){
                                res.redirect('/');
                            })
                    })
            });
        });
    }
})
/*
passport.use(new LocalStrategy(
    function(name, password, done) {
        User.getUserByUsername(name, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));
*/


passport.serializeUser(function(userID, done) {
    done(null, userID);
});

passport.deserializeUser(function(userID, done) {
        done(null, userID);
    });

function authenticationMiddleware () {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated()) return next();
        res.render('login')
    }
}


router.get('/logout', function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect('login');
});



module.exports = router;
