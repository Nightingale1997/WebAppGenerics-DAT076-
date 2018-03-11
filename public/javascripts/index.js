/**
 * Execute after DOM is ready.
 */
jQuery(document).ready(function(){

    jQuery('#bannerslider').skdslider({delay:5000, animationSpeed: 1000,'pauseOnHover': true, showNextPrev:true,showPlayButton:false, showNav: true, autoSlide:false,animationType:'sliding'});

});

/**
 * Function that receives the
 * products and a function that
 * execute the adding to cart
 * on button click.
 */
function loadProducts(){

    $.get("/products", function( data ) {
        $('#productlist').html(data);
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

    });
};
