// Constructor

class ShoppingCart{
    constructor() {
        this.products = [];
        this.totQty = 0;
        this.totPrice = 0;
    }

    addProduct(product){

        this.totQty++;


        if(!this.products.includes(product)){
            this.products.push(product);
        }

        this.totPrice += product.price;
    }

};

module.exports = ShoppingCart;
