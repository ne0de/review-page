function registerNewAccount(){
    const newUser = {
        nickname:  $("#InputNick").val(),
        password: $("#inputPassword").val()
    }

    if(!newUser.nickname)
        return alert('No pusiste un nick');
    
    $.ajax({
        url: 'http://localhost:3000/user/',
        type: 'POST',
        data: newUser,
        error: result => {
            alert(result.responseText);
        },
        success: result => {
            alert(result);
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