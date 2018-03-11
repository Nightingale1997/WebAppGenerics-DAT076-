jQuery(document).ready(function () {

    $("#cartButton").click(function(){
        console.log(this.id);

        window.location.replace("../cart");
    });


    (function fillHeaderCart(){
        $.get("/headerCart/", function (data) {
            console.log("Cart fill attempted")
            $('#cart').html(data);
        });

    })();

});


function fillHeaderCart(){
    $.get("/headerCart/", function (data) {
        console.log("Cart fill attempted")
        $('#cart').html(data);
    });

};

$("#searchButton").click(function(){
    var input = document.getElementById("search-bar").value;

    if(input != null && input != ""){
        window.location.replace("../search?userInput="+input);
    }

});




        // var search = new Search($('#search-bar').val());
        //  document.getElementById("showSearch").value = document.getElementById("search-bar").value;
        /* $('#searchButton').on('click', function(){
             var search = new Search($('#search-bar').val());

         });
         */

/*
function findMovie() {

    var input, filter, ul, li, a,i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myMovielist");
    li = ul.getElementsByTagName('li');

    for(i = 0; i <li.length; i++){
        a = li[i].getElementsByTagName("a")[0];
        if(a.innerHTML.toUpperCase().indexOf(filter) > -1){

            li[i].style.display = "";
        }
        else {
            li[i].style.display = "none";
        }
    }
}

*/
