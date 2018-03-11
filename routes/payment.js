var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const mysql = require('../database.js');
var expressValidator = require('express-validator');
var bcrypt = require('bcryptjs');
var Product = require('../models/Product');
var Mustache = require('mustache');
var ShoppingCart = require('../models/ShoppingCart');


function loggedIn(req, res, next){
    if(req.user)
        next();
    else
        res.render('login');
}

router.get('/', loggedIn, function (req, res) {
    res.render('payment');
});

router.post('/', function(req, res){
   const name = req.body.name;
   const address = req.body.address;
   const cardNo = req.body.cardNo;
   const expMo = req.body.expMo;
   const expYear = req.body.expYear;
   const cvc = req.body.cvc;
   var cartID;
   const usr = req.user.userID;

   var quantity = ShoppingCart.totQty;
   var price = ShoppingCart.totPrice;

   mysql.query('INSERT INTO shoppingcart ( AccountID, Quantity, TotalPrice) VALUES (?, ?, ?)',
       [req.user.userID, quantity, price], function(req,res){
    });

   mysql.query('SELECT MAX(ShoppingCartID) AS latestCart FROM shoppingcart', function(req,res){
       cartID = res[0].latestCart;
       mysql.query('INSERT INTO purchase (AccountID, ShoppingCartID, Address, CustomerName) VALUES(?, ?, ?, ?)',
           [usr, cartID, address, name], function(req, res){
           });
    });

   res.render('index');
});

module.exports = router;
