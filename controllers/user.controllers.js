const db = require("../models");
const app = require("../app");
const userReviewsDb = require("../models/userReviews.db");
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
    
    var exist = await User.findOne({
        where: { nickname: newAccount.nickname }
    });

    if(exist == null){
        await User.create(newAccount);
        res.send("Cuenta registrada con exito")
    }else
        res.status(403).send("Ya existe un usuario con ese nick");
  };

exports.findAll = async (req, res) => {
    let result = await User.findAll();
    res.send(result);
    //res.sendStatus(200);
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