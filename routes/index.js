var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var ProductList = require('../models/ProductList');
var Mustache = require('mustache');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index.html', (req, res, next) => {
    var productList = new ProductList();
    productList.addProduct(new Product(1, "Super Mario", "Italian Plumber fights mushrooms", 10, "Platformer"));
    productList.addProduct(new Product(2, "Street Fighter", "People fight in the streets", 15, "Fighting"));

    var products = productList.products;
    var html = "";
    products.forEach(function(element) {
        html += "<ul><li>Title: "+ element.productName +"</li><li>Description: "+ element.description +"</li><li>Price: "+ element.price +" Euro</li><li>Genre: "+ element.genre +"</li></ul><br><br>";
    });

    res.send(html);
});

module.exports = router;
