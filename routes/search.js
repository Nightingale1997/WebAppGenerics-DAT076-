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

router.post("/", function (req, res, next) {
    var productID = req.body.productID;
    //var productName = req.body.productName;
    var searchInput = '%' + req.body.userInput + '%';

    //$query = htmlspecialchars($query);
    //$query = mysql_real_escape_string($query);

    mysql.query('SELECT * FROM product WHERE Name LIKE ?', searchInput, function(error, results, fields){

    // result from the query above
    var searchQuery = mysql.query;
    var queryResult = mysql_num_rows(searchQuery);

    //loop through to get results
    if(queryResult > 0){
        while(row = mysql_fetch_assoc(searchQuery)){
            //fetch objects?
        }
    }
    else {
        //there are no matches
    }

    /*if(mysql_num_rows(searchQuery) != 0){
    var search_rs = mysql_fetch_assoc(searchQuery);
    }
    */




    });

    mysql.query('SELECT * FROM product WHERE ProductID = ?', [productID], function (error, results, fields) {
        if (error) {
            console.log('error #2');
            throw error;
        }

        var productToAdd = results[0];

        productToAdd = new Product(productToAdd.ProductID, productToAdd.Name, productToAdd.Description, productToAdd.Price, productToAdd.SalePrice);
        var ShoppingCart = require('../models/ShoppingCart');
        ShoppingCart.addProduct(productToAdd);

        var ShoppingCart = {ShoppingCart: ShoppingCart};
        var template = "<h1>Shopping Cart</h1>{{#ShoppingCart}}{{#products}}<ul><li>Title: {{0.productName}}</li><li>Description: {{0.description}}</li><li>Price: {{0.price}} each</li>" +
            "<li>Genre: {{0.genre}}</li><li>Quantitity {{1}}</li></ul>{{/products}}<li>Total Quantity: {{totQty}}</li><li>Total Price: {{totPrice}}</li><ul></ul> <br> <br>{{/ShoppingCart}}";
        var html = Mustache.to_html(template, ShoppingCart);
        console.log(html);
        res.send(html);

    });
});

module.exports = router;