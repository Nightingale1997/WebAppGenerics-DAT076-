// Constructor

class ProductList{
    constructor() {
        this.fs = require("fs");
        this.products = [];
    }
addProduct(product){
   this.products.push(product);

}

};
module.exports = ProductList;
