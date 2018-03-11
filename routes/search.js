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
        var template = "{{#products}}<ul><li>Title: {{Name}}</li><li>Description: {{Description}}</li><li>Price: {{Price}}</li>" +
            "<li>Genre: {{Genre}}</li><button id ='{{ProductID}}' class='btn addToCart'>Shop Button</button></ul> <br> <br>{{/products}}"
        var html = Mustache.to_html(template, products);
        res.send(html);
    });


});

module.exports = router;