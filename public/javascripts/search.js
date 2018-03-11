jQuery(document).ready(function(){




    (function displaySearch(){
        $.post("/search/searchresults/",
                {
                    userInput: $.urlParam('userInput')
                },
                function(data){
                    $('#productSearch').html(data);
                });




            $(".addToCart").click(function(){
                console.log(this.id);

                $.post("/",
                    {
                        productID: this.id
                    },
                    function(data){
                        $('#cart').html(data);
                    });
            });

        })();
    });



$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return decodeURI(results[1]) || 0;
    }
}
