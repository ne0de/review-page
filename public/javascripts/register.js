function registerNewAccount(){
    let newUser = {
        name: $("#inputNombre").val(),
        surname: $("#inputApellido").val(),
        password: $("#inputPassword").val(),
        nick: $("#InputNick").val(),
        email: $("#inputEmail").val()
    };

    $.ajax({
        url: 'http://localhost:3000/user',
        type: 'POST',
        data: newUser,
        success: resultado => {
            alert("Te has registrado correctamente")
            location.reload();
        },
        error: error => {
            alert("Ya existe la cuenta");
        }
    });
}

$(document).ready(function() {


    $('#crearCuenta').on('submit', event => {
        event.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/user',
            type: 'GET',
            success: resultado =>{
                console.log(resultado);
            }
        });

        //registerNewAccount();
    });
});