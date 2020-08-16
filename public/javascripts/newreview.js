$(document).ready(function(){

    $(".text-area").attr("maxlength", 500)

    $('.text-area').bind('input propertychange', function() {
        chars = $(this).val().length;
        opinion = $(this).val();
        $('#maxChars').text(chars + '/500');
        if(chars == 500)
            $('#maxChars').append('<a class = "font-italic text-danger"> Llegaste al máximo de carácteres! </a>'); 
    });

    $('#botonJuego').find('a').click(function(e){
        e.preventDefault();
        nameGame = $(this).text();
        $('#btnGameSelected').text(nameGame);
        gameSelected = games.filter(function(game){
            return game.nombre == nameGame;
        });
    })
});

