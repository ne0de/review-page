function registerNewAccount(){
    let newUser = {
        nickname: $("#InputNick").val(),
        password: $("#inputPassword").val()
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
        registerNewAccount();
    });
});