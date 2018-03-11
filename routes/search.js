var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const mysql = require('../database.js');
var expressValidator = require('express-validator');
var bcrypt = require('bcryptjs');
var Product = require('../models/Product');
var Mustache = require('mustache');

router.get('/', function (req, res, next) {
    res.render('search');
});

router.post('/searchresults', (req, res) => {

    var search =  req.body.userInput;

    mysql.query('SELECT * FROM Product WHERE Name LIKE ?', "%"+search+"%",function(error, results, fields){
        if (error){
            console.log('error #2');
            throw error;
        }

        var products = results;
        var products = {products: products};
        var template = "{{#products}}<article class='product'><div class='description'>{{Description}}</div><img class='productImage' src='/images/products/{{ProductID}}.png'><div class='productInfo'>{{Name}}<br> €{{Price}}</li>" +
            "<button id ='{{ProductID}}' class='btn addToCart'>Add to Cart</button></div></article>{{/products}}"
        var html = Mustache.to_html(template, products);
        res.send(html);
    });


});

module.exports = router;