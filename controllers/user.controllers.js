const db = require("../models");
const reviewController = require('./review.controllers');

const User = db.User;
const Op = db.Sequelize.Op;

/* Routes */

exports.showRegister = (req, res) => {
    res.render('user/register');
};

exports.showLogin = (req, res) => {
    res.render('user/login');
};

exports.showProfileById = async (req, res) => {
    const accountId = req.params.id;
    const account = await this.findAccountById(accountId);
    const accountReviews = await reviewController.findAllUserReviews(accountId);
    var likeReviews = await reviewController.findAllUserRate(account.id, 'like');
    if (likeReviews[0].reviews_rate.id == null) 
        likeReviews = [];
    res.render('user/publicProfile', { account, accountReviews, likeReviews });
}


exports.showProfile = async (req, res) => {
    const account = req.user;
    const accountReviews = await reviewController.findAllUserReviews(account.id);
    var likeReviews = await reviewController.findAllUserRate(account.id, 'like');
    if (likeReviews[0].reviews_rate.id == null) 
        likeReviews = [];
    res.render('user/profile', { account, accountReviews, likeReviews });
}

exports.showEditProfile = async (req, res) => {
    const account = req.user;
    res.render('user/edit', { account });
}

exports.verifyProfile = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.id == req.params.id)
            res.redirect('/user/profile');
        else
            return next();
    } else
        return next();
}

exports.editProfile = async (req, res) => {
    const account = req.user;
    const newValues = req.body;

    if (!newValues.name)
        newValues.name = account.name;

    if (!newValues.surname)
        newValues.surname = account.surname;

    if (!newValues.description)
        newValues.description = account.description;

    if (!newValues.avatar)
        newValues.avatar = account.avatar;

    await User.update({
        name: newValues.name,
        surname: newValues.surname,
        description: newValues.description,
        avatar: newValues.avatar
    }, {
        where: { id: account.id }
    });

    res.sendStatus(200);
};

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

/* Database */

exports.createAccount = async (values) => {
    return newUser = await User.create({
        name: values.name,
        surname: values.surname,
        nickname: values.nickname,
        password: values.password,
        email: values.email,
        description: values.description
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

exports.findAccountById = async (_id) => {
    return await User.findOne({
        where: {
            id: _id
        },
        raw: true
    });
}

exports.findAccountByNick = async (_nickname) => {
    return await User.findOne({
        where:
            { nickname: _nickname }
    });
}
