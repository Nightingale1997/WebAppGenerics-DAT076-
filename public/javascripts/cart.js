jQuery(document).ready(function () {
    (function displayCart(){
        $.get("/cart/fillCart/", function (data) {

            $('#shoppingCartReview').html(data);



            $(".increaseButton").click(function(){
                console.log(this.id);

                $.post("/cart/increase/",
                    {
                        productID: this.id
                    },
                    function(data){
                        displayCart();
                        fillHeaderCart();

                    });
            });

            $(".reduceButton").click(function(){
                console.log(this.id);

                $.post("/cart/reduce/",
                    {
                        productID: this.id
                    },
                    function(data){
                        displayCart();
                        fillHeaderCart();
                    });
            });

            $(".deleteButton").click(function(){
                console.log(this.id);

                $.post("/cart/delete/",
                    {
                        productID: this.id
                    },
                    function(data){
                        displayCart();
                        fillHeaderCart();
                    });
            });



        });

    })();







});