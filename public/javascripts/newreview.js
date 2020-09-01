$(document).ready(function(){

    $(".text-area").attr("maxlength", 500)
    $("#titleArea").attr("maxlength", 24)

    $('.text-area').bind('input propertychange', function() {
        $('#maxChars').text($(this).val().length + '/500');
        if($(this).val().length == 500)
            $('#maxChars').append('<a class = "font-italic text-danger"> Llegaste al máximo de carácteres! </a>'); 
    });

    $('#listaJuegos').find('a').click(function(e){
        e.preventDefault();
        console.log($(this).text())
        $('#gameName').val($(this).text());
    });

    $("#send").on("submit", function(e){
        console.log("hola");
        //e.preventDefault();
        //$('#main').empty();
    });
});

