var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var ProductList = require('../models/ProductList');
var Mustache = require('mustache');
var ShoppingCart = require('../models/ShoppingCart');
const mysql = require('../database.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
    var productID = req.body.id;
    var cart = new ShoppingCart(req.body.cart ? req.body.cart : {items: {}});

    Product.findbyId(productID, function (err, product) {
        if (err) {
            return res.redirect('../views/index');
        }
        cart.addProduct(product, product.id);
        req.body.cart = cart;
        console.log(req.body.cart);
        res.redirect('/../views/index');
    });
*/

router.post("/", function(req, res, next){

    //router.get("../index.html", function(req, res, next){


    var productID = req.body.id;

    mysql.query('SELECT * FROM product WHERE ProductID = ?', [productID], function(error, results, fields){
        if (error){
            console.log('error #2');
            throw error;
        }

        var productToAdd = results[0];

        });

    productToAdd = new Product();
    ShoppingCart.addProduct(productToAdd);
    var shoppingCart = ShoppingCart.products;
    console.log('Cool');



    //Old, fix tomorrow
    /*
    var products = {products: products};
    var template = "{{#products}}<ul><li>Title: {{productName}}</li><li>Description: {{description}}</li><li>Price: {{price}}</li>" +
        "<li>Genre: {{genre}}</li><button class='btn'>Shop Button</button></ul> <br> <br>{{/products}}";
    var html = Mustache.to_html(template, products);
    console.log(html);
    res.send(html);
    */
});


router.get('/products', (req, res) => {
    var productList = new ProductList();
    productList.addProduct(new Product(1, "Super Mario", "Italian Plumber fights mushrooms", 10, "Platformer"));
    productList.addProduct(new Product(2, "Street Fighterrr", "People fight in the streets", 15, "Fighting"));
    productList.addProduct(new Product(3, "Tomb Raider", "Fight for survival", 25, "Survive"));

    var products = productList.products;
   /* var html = "";
    products.forEach(function(element) {
        html += "<ul><li>Title: "+ element.productName +"</li><li>Description: "+ element.description +"</li><li>Price: "+ element.price +" Euro</li><li>Genre: "+ element.genre +"</li></ul><br><br>";
    });*/


    var products = {products: products};
    var template = "{{#products}}<ul><li>Title: {{productName}}</li><li>Description: {{description}}</li><li>Price: {{price}}</li>" +
        "<li>Genre: {{genre}}</li><button id ='{{productID}}' class='btn addToCart'>Shop Button</button></ul> <br> <br>{{/products}}"
    var html = Mustache.to_html(template, products);
    res.send(html);
});

module.exports = router;
