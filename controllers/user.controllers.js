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

exports.showProfile = async (req, res) => {
    const query = await User.findOne({
        where: { id: req.params.id }
    });
    if(query == null)
        res.status(403).send('No existe usuario registrado con esa id');
    else{
        const account = query.dataValues;
        res.render('user/profile', { account });
    }
}

exports.create = async (req, res) => {
    const newAccount = req.body;    

    //SELECT * FROM user WHERE nickname = newAccount.nickame OR email = newAccount.email LIMIT 1
    var exist = await User.findOne({
        limit: 1,
        where: { 
            [Op.or]: [
                { nickname: newAccount.nickname },
                { email: newAccount.email }
            ]
        }
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