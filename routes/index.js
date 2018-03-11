var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var Mustache = require('mustache');
const mysql = require('../database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.isAuthenticated()){
        res.render('index', {loggedIn: true});
        return;
}
    res.render('index', {loggedIn: false});
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
    mysql.query('SELECT * FROM Product WHERE ProductID = ?', [productID], function(error, results, fields){
        if (error){
            console.log('error #2');
            throw error;
        }

        var productToAdd = results[0];

        productToAdd = new Product(productToAdd.ProductID, productToAdd.Name, productToAdd.Description, productToAdd.Price, productToAdd.Genre, productToAdd.SalePrice);
        var ShoppingCart = require('../models/ShoppingCart');
        ShoppingCart.addProduct(productToAdd);

        console.log('Cool');


        var ShoppingCart = {ShoppingCart: ShoppingCart};
        var template = "{{#ShoppingCart}}<article class='headerProduct'>{{#products}}<ul><li><img class='headerProductImage' src='/images/products/{{0.productID}}.png'></li><li>{{0.productName}}</li><li class='headerQty'>x{{1}}</li></ul><hr>{{/products}}</article>{{/ShoppingCart}}"

        var html = Mustache.to_html(template, ShoppingCart);
        console.log(html);
        res.send(html);

        });

    //Old, fix tomorrow
    /*

    */
});


router.get('/products', (req, res) => {


    mysql.query('SELECT * FROM Product', function(error, results, fields){
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


   /* var html = "";
    products.forEach(function(element) {
        html += "<ul><li>Title: "+ element.productName +"</li><li>Description: "+ element.description +"</li><li>Price: "+ element.price +" Euro</li><li>Genre: "+ element.genre +"</li></ul><br><br>";
    });*/



});

router.get('/headerCart', (req, res) => {


    var ShoppingCart = require('../models/ShoppingCart');

    var ShoppingCart = {ShoppingCart: ShoppingCart};
    var template = "{{#ShoppingCart}}<article class='headerProduct'>{{#products}}<ul><li><img class='headerProductImage' src='/images/products/{{0.productID}}.png'></li><li>{{0.productName}}</li><li class='headerQty'>x{{1}}</li></ul><hr>{{/products}}</article>{{/ShoppingCart}}"

    var html = Mustache.to_html(template, ShoppingCart);
    console.log(html);
    res.send(html);






});

module.exports = router;
