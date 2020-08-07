var accounts = [];

function getAccounts() {
    $.get("http://localhost:3000/account", data => {
        accounts = data.response;
    });
}

function existAccount(nick, email) {
    return accounts.filter(account => {
        if (account.nickname == nick || account.email == email)
            return 1;
    });
}