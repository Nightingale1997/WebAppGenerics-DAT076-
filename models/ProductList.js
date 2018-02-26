// Constructor

class ProductList{
    constructor() {
        this.fs = require("fs");
        this.products = [];
    }
addProduct(product){
   this.products.push(product);
   this.saveList();
}

saveList() {
    this.fs.writeFile("./productlist.json", JSON.stringify({ 'products': this.products }, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("Wrote to file succesfully");

    });
}
};
module.exports = ProductList;
