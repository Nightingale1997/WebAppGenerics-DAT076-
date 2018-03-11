var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const mysql = require('../database.js');
var expressValidator = require('express-validator');
var bcrypt = require('bcryptjs');
var Product = require('../models/Product');
var Mustache = require('mustache');

function loggedIn(req, res, next){
    if(req.user)
        next();
    else
        res.render('login');
}

router.get('/', loggedIn, function (req, res) {
    res.render('payment');
});

router.post('/payment', function(req, res){
    /*
   const name = req.body.name;
   const Address = req.body.address;

   console.log(address);
   */

});




module.exports = router;
