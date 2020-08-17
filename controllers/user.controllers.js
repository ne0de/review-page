const db = require("../models");
const app = require("../app");
const User = db.User;
const Op = db.Sequelize.Op;

/* Routes */

exports.showRegister = (req, res) => {
    res.render('user/register');
};

exports.showLogin = (req, res) => {
    res.render('user/login');
};

exports.showProfile = async (req, res) => {
    const account = req.user;
    res.render('user/profile', { account });
}

exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated())
        return next();
    res.redirect('/');
}

/* Database */

exports.findAccountById = async (id) => {
    return await User.findOne({ where: 
        { id : id } 
    });
}

exports.findAccountByNick = async (nickname) => {
    return await User.findOne({ where: 
        { nickname : nickname } 
    });
}

exports.createAccount = async (values) => {
    return newUser = await User.create({ 
        name: values.name,
        surname: values.surname,
        nickname: values.nickname,
        password: values.password,
        email: values.email
    });
}

exports.existAccount = async (account) => {
    return await User.findOne({
        limit: 1,
        where: { 
            [Op.or]: [
                { nickname: account.nickname },
                { email: account.email }
            ]
        }
    });
};
