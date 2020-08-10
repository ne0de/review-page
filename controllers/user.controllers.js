const db = require("../models");
const app = require("../app");
const User = db.User;
const Op = db.Sequelize.Op;

exports.showRegister = (req, res) => {
    res.render('user/register');
};

exports.showLogin = (req, res) => {
    res.render('user/login');
};

exports.create = async (req, res) => {
    const newAccount = req.body;
    await User.create(newAccount);
    res.sendStatus(200);
  };

exports.findAll = async (req, res) => {
    let result = await User.findAll();
    res.sendStatus(200);
};

exports.findOne = (req, res) => {
  
};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};

exports.findAllPublished = (req, res) => {
  
};