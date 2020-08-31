$(document).ready(function(){

    $(".text-area").attr("maxlength", 500)
    $("#tittle").attr("maxlength", 24)

    $('.text-area').bind('input propertychange', function() {
        $('#maxChars').text($(this).val().length + '/500');
        if($(this).val().length == 500)
            $('#maxChars').append('<a class = "font-italic text-danger"> Llegaste al máximo de carácteres! </a>'); 
    });

    $('#botonJuego').find('a').click(function(e){
        e.preventDefault();
        $('#btnGameSelected').text($(this).text());
    });

    /* send data */
    $('#send').click(function(e){
        e.preventDefault();
        $.ajax({
            url: '/review',
            type: 'POST',
            error: result => {
                console.log(result);
            },
            data: {
                title: $('#tittle').val(),
                gameId: $('#btnGameSelected').text().match(/\d/g).join(""),
                review: $('.text-area').val()
            },
            success: result => {
                alert(result);
                window.location = '/review/all';
            },
        });
    })
});

