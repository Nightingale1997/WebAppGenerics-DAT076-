var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var Mustache = require('mustache');
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



    var productID = req.body.productID;
    mysql.query('SELECT * FROM product WHERE ProductID = ?', [productID], function(error, results, fields){
        if (error){
            console.log('error #2');
            throw error;
        }

        var productToAdd = results[0];

        productToAdd = new Product(productToAdd.ProductID, productToAdd.Name, productToAdd.Description, productToAdd.Price, productToAdd.SalePrice);
        var ShoppingCart = require('../models/ShoppingCart');
        ShoppingCart.addProduct(productToAdd);

        console.log('Cool');


        var ShoppingCart = {ShoppingCart: ShoppingCart};
        var template = "<h1>Shopping Cart</h1>{{#ShoppingCart}}{{#products}}<ul><li>Title: {{0.productName}}</li><li>Description: {{0.description}}</li><li>Price: {{0.price}} each</li>" +
            "<li>Genre: {{0.genre}}</li><li>Quantitity {{1}}</li></ul>{{/products}}<li>Total Quantity: {{totQty}}</li><li>Total Price: {{totPrice}}</li><ul></ul> <br> <br>{{/ShoppingCart}}";
        var html = Mustache.to_html(template, ShoppingCart);
        console.log(html);
        res.send(html);

        });

    //Old, fix tomorrow
    /*

    */
});


router.get('/products', (req, res) => {


    mysql.query('SELECT * FROM product', function(error, results, fields){
        if (error){
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


   /* var html = "";
    products.forEach(function(element) {
        html += "<ul><li>Title: "+ element.productName +"</li><li>Description: "+ element.description +"</li><li>Price: "+ element.price +" Euro</li><li>Genre: "+ element.genre +"</li></ul><br><br>";
    });*/



});

module.exports = router;
