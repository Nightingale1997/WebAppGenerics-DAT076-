/*
module.exports = function ShoppingCart(oldCart) {
    this.items = oldCart.items || {};
    this.totQty = oldCart.totQty || 0;
    this.totPrice = oldCart.totPrice || 0;

    this.addProduct = function (item, id) {
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.item[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totQty++;
        this.totPrice += storedItem.item.price;
    };

    this.generateArray = function () {
        var arr = [];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;

    }
};
*/

// Constructor
class ShoppingCart {
    constructor() {
        this.products = [];
        this.totQty = 0;
        this.totPrice = 0;
    }

    addProduct(product) {

        this.totQty++;
        this.totPrice += product.price;

        var found = false;

        this.products.forEach(function (entry) {
            if (entry[0].productID == product.productID) {
                entry[1] += 1;
                found = true;
                return;
            }
        });

        if (!found) {
            product = [product, 1];
            this.products.push(product);
        }

    }
};

var shoppingCart = new ShoppingCart();

module.exports = shoppingCart;
