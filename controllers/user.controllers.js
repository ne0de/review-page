const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

exports.showRegister = (req, res) => {
    res.render('user/register');
};

exports.showLogin = (req, res) => {
    res.render('user/login');
};

exports.create = (req, res) => {
    const newAccount = req.body;

    User.create(newAccount)
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        res.status(500).send({
          message:
            error.message || "Hubo un error al intentar crear al usuario."
        });
      });
  };

exports.findAll = async (req, res) => {
    let result = await User.findAll();
    res.send({
        response : result
    });
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