module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totQty = oldCart.totQty || 0;
    this.totPrice = oldCart.totPrice || 0;
    
    this.add = function (item, id) {
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