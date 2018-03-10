var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const mysql = require('../database.js');
var expressValidator = require('express-validator');
var bcrypt = require('bcryptjs');
var path = require('path');
var fs = require('fs');
var os = require('os');
var express = require('express');
var app = express();
var multer = require('multer');

//Reg
router.get('/register', function(req, res, next) {
  res.render('register');
});


//Login page
router.get('/login', authenticationMiddleware(),function(req, res, next) {
    res.render('profile');
});


//Login post to handle Admin

router.post('/login', passport.authenticate('local'), function(req, res) {

    var sql = 'SELECT ProductID, Name, Description, Price, SalePrice from product';

    mysql.query(sql, function(err, rows, fields){
        if(err) throw err;
        res.render('product', { title: 'Products', rows: rows});
    });
        });

//register clicked on login page
router.get('/signup', function(req,res){
    res.render('register');
});


//Forgot password clicked on login page
router.get('/forgot', function(req,res){
    res.render('forgot');
});

router.post('/forgot', function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            const email = req.body.email;
            mysql.query('SELECT COUNT(*) AS EmailsCount FROM account WHERE Email=(?)', [email], function(err, res) {
                if (res[0].EmailsCount == 0) {
                }


               mysql.query('UPDATE account SET token=? WHERE Email=?', [token, email]);
                // Could also add exp. date

                var smtpTransport = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'GenericGamingShop@gmail.com',
                        pass: '123generic'
                    }
                });
                var mailOptions = {
                    to: req.body.email,
                    from: 'GenericGamingShop@gmail.com',
                    subject: 'Password Reset',
                    text: 'Here is a link to change your password ' +
                    'http://' + req.headers.host + '/users/reset/' + token + '\n\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                    done(err, 'done');
                });
            });
        },
        function(token, user, done) {
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/');
    });

});


router.get('/reset/:token', function(req, res) {
    mysql.query('SELECT COUNT(*) AS resetToken FROM account WHERE token=(?)', [req.params.token], function(err, res) {
        if(res[0].resetToken == 0){
            console.log("Nice try bud!");
            return;
        }
    });
    res.render('reset', {token: req.params.token});
});

router.post('/reset/:token', function(req, res) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {

        mysql.query('UPDATE account SET Password=? WHERE token=?', [hash, req.params.token], function (req, res) {
        });
    });

    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'GenericGamingShop@gmail.com',
            pass: '123generic'
        }
    });
    mysql.query('SELECT * FROM account WHERE token=?', [req.params.token], function(req, res) {
        var mailOptions = {
            to: res[0].Email,
            from: 'GenericGamingShop@gmail.com',
            subject: 'Your password has been changed',
            text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + res[0].Email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
        });
    });
});


//Login post
/*router.post('/login', passport.authenticate('local'),
    function(req,res){
        res.redirect('profile');
    }

);
*/
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






//Admin Page Handling
router.post('/deleteProduct', function(req,res){
    //var id = res[0].ProductID.toString();
    const id = req.body.ProductID;

    var filePath = __dirname+'/../public/images/products/'+id+'.png';
    fs.unlink(filePath);

    mysql.query('DELETE FROM PRODUCT WHERE ProductID=?',[id], function(err, results, fields){
        if (err){
            throw err;
        };
    })
    var sql = 'SELECT ProductID, Name, Description, Price, SalePrice from product';
    mysql.query(sql, function(err, rows, fields){
        if(err) throw err;

        res.render('product', { title: 'Products', rows: rows});
    });
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/../public/images/products/')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.ProductID + '.png')
    }
})

var upload = multer({ storage: storage })


router.post('/addProduct', upload.any(), function(req,res){


    const ProductID = req.body.ProductID;
    const Name = req.body.Name;
    const Description = req.body.Description;
    const Price = req.body.Price;
    const SalePrice = req.body.SalePrice;
    const Genre = req.body.Genre;

    mysql.query('insert into product (ProductID, Name, Description, Price, SalePrice, Genre) VALUES (?, ?, ?, ?, ?, ?)', [ProductID, Name, Description, Price, SalePrice, Genre]);
    var sql = 'SELECT * from product';
    mysql.query(sql, function(err, rows, fields){
        if(err) throw err;

        res.render('product', { title: 'Sales', rows: rows});
    });
});

router.post('/addSale', function(req,res){

    const ProductID = req.body.ProductID;
    const SalePrice = req.body.SalePrice;

    mysql.query('update product SET SalePrice=? WHERE ProductID=?', [SalePrice, ProductID]);
    var sql = 'SELECT * from product';
    mysql.query(sql, function(err, rows, fields){
        if(err) throw err;
        res.render('product', { title: 'Sales', rows: rows});
    });
});

router.post('/deleteSale', function(req,res){
    const ProductID = req.body.ProductID;

    mysql.query('UPDATE PRODUCT SET SalePrice=0 WHERE ProductID=?', [ProductID]);
    var sql = 'SELECT * from product';
    mysql.query(sql, function(err, rows, fields){
        if(err) throw err;
        res.render('product', { title: 'Sales', rows: rows});
    });
});




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
