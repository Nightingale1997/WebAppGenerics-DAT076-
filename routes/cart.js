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
    res.render('cart');
});


router.get('/fillCart', (req, res) => {


    var ShoppingCart = require('../models/ShoppingCart');
if(ShoppingCart.products.length>0) {
    var ShoppingCart = {ShoppingCart: ShoppingCart};
    var template = "{{#ShoppingCart}}<article class='shoppingCart'><h1>Shopping Cart</h1><ul>{{#products}}<ul class='productList'><li><img class='cartImage' src='/images/products/{{0.productID}}.png' </li><li>{{0.productName}}</li><li>{{0.genre}}</li><li>€{{0.price}} each</li>" +
        "<li><button id='{{0.productID}}' class='coloredbutton increaseButton'>+</button></li><li>Quantitity {{1}}</li><li> <button id='{{0.productID}}' class='coloredbutton reduceButton'>-</button></li><li> <button id='{{0.productID}}' class='coloredbutton deleteButton'>Delete</button></li></ul><hr>{{/products}}</ul></article><article class='review'><li>Total Quantity: {{totQty}}</li><li>Total Price: {{totPrice}}</li><li><a href='../payment'><button class='coloredbutton'>Proceed to payment</button></a></li></article>{{/ShoppingCart}}";
}
else{
    var template = "<article class='shoppingCart'><h1>There are no items in your cart</h1><article style='float: right; 'class='review'><li>Total Quantity: 0</li><li>Total Price: 0</li><li><a href='#'><button disabled class='coloredbutton'>Proceed to payment</button></a></li></article>";
}


    var html = Mustache.to_html(template, ShoppingCart);
    console.log(html);
    res.send(html);






});


router.post("/increase", function(req, res, next){

    //router.get("../index.html", function(req, res, next){



        var productID = req.body.productID;

       var ShoppingCart = require('../models/ShoppingCart');
    ShoppingCart.products.forEach(function(entry) {
        if (entry[0].productID == productID){
            ShoppingCart.addProduct(entry[0]);
        }
         });




   res.send("success");


    //Old, fix tomorrow
    /*

    */
});

router.post("/reduce", function(req, res, next){

    //router.get("../index.html", function(req, res, next){



    var productID = req.body.productID;

    var ShoppingCart = require('../models/ShoppingCart');
    ShoppingCart.products.forEach(function(entry) {
        if (entry[0].productID == productID){
            ShoppingCart.removeProduct(entry[0]);
        }
    });
    res.send("success");
});

router.post("/delete", function(req, res, next){

    //router.get("../index.html", function(req, res, next){



    var productID = req.body.productID;

    var ShoppingCart = require('../models/ShoppingCart');
    ShoppingCart.products.forEach(function(entry) {
        if (entry[0].productID == productID){
            ShoppingCart.deleteProduct(entry[0]);
        }
    });
    res.send("success");
});



module.exports = router;