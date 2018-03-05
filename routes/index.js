var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var ProductList = require('../models/ProductList');
var Mustache = require('mustache');
var ShoppingCart = require('../models/ShoppingCart');

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

router.post("/", function(req, res){

    console.log('hshshs');

    var productId = req.id;

    function equals(product) {
        return product.id == productId;
    }

    var productToAdd = ProductList.products.find(equals);
    var shoppingCart = ShoppingCart.products;




    //Old, fix tomorrow
    var products = {products: products};
    var template = "{{#products}}<ul><li>Title: {{productName}}</li><li>Description: {{description}}</li><li>Price: {{price}}</li>" +
        "<li>Genre: {{genre}}</li><button class='btn'>Shop Button</button></ul> <br> <br>{{/products}}"
    var html = Mustache.to_html(template, products);
    console.log(html);
    res.send(html);
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
