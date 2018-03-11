var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var Mustache = require('mustache');
const mysql = require('../database.js');

/**
 * Get the home page.
 */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/**
 * Post request function. Fetching the ID
 * for the product from the database. Adding
 * products to the shopping cart.
 */
router.post("/", function (req, res, next) {

    var productID = req.body.productID;
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

/**
 * Get request function. Fetching the products
 * from the database. Sending the
 * products to the html page
 */
router.get('/products', (req, res) => {


    mysql.query('SELECT * FROM product', function (error, results, fields) {
        if (error) {
            console.log('error #2');
            throw error;
        }

        var products = results;
        var products = {products: products};
        var template = "{{#products}}<ul><li>Title: {{Name}}</li><li>Description: {{Description}}</li><li>Price: {{Price}}</li>" +
            "<li>Genre: {{genre}}</li><button id ='{{ProductID}}' class='btn addToCart'>Shop Button</button></ul> <br> <br>{{/products}}"
        var html = Mustache.to_html(template, products);
        res.send(html);
    });

});

module.exports = router;
