var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var ProductList = require('../models/ProductList');
var Mustache = require('mustache');
var Cart = require('../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* add to cart */

// $.get("/index.html", function (req, res, next) router.get(function (req, res, next)

 /*$(".btn").click(function() {
    function updateCart(){

        $.post("/index.html", function(data) {
            $('#cart').html(data.id);
        });

    };
});
*/

router.get("../index.html", function(req, res, next){
    var productId = req.id;
    var cart = new Cart(req.cart ? req.cart : {items: {}});

    Product.findbyId(productId, function (err, product) {
        if (err) {
            return res.redirect('../views/index');
        }
        cart.add(product, product.id);
        req.cart = cart;
        console.log(req.cart);
        res.redirect('/../views/index');
    });
});

    /*
    $('.btn').on('click', function(req, res, next){
        var productId = req.id;
        var cart = new Cart(req.cart ? req.cart : {items: {}});

        Product.findbyId(productId, function (err, product) {
            if (err) {
                return res.redirect('../views/index');
            }
            cart.add(product, product.id);
            req.cart = cart;
            console.log(req.cart);
            res.redirect('/../views/index');
        });
    });
    */

router.get('/index.html', (req, res, next) => {
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
        "<li>Genre: {{genre}}</li><button class='btn'>Shop Button</button></ul> <br> <br>{{/products}}"
    var html = Mustache.to_html(template, products);
    console.log(html);
    res.send(html);
});

module.exports = router;
