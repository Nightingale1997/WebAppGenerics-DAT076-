// Constructor
class ShoppingCart{
    constructor() {
        this.products = [];
        this.totQty = 0;
        this.totPrice = 0;
    }

    addProduct(product){

        this.totQty++;

        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.item[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totQty++;
        this.totPrice += storedItem.item.price;


        if(!this.products.includes(product)){
            this.products.push(product);
        }

        this.totPrice += product.price;
    }

};

module.exports = ShoppingCart;
