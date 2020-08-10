function registerNewAccount(){
    let newUser = {
        nickname: $("#InputNick").val(),
        password: $("#inputPassword").val()
    };

    $.ajax({
        url: 'http://localhost:3000/user/',
        type: 'POST',
        data: newUser,
        success: result => {
            window.location = '/user/login';
        }
    });
}

$(document).ready(function() {

    $('#crearCuenta').on('submit', event => {
        event.preventDefault();
        registerNewAccount();
    });
});