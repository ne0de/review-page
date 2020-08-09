var express = require('express');
var router = express.Router();
const controller = require("../controllers/user.controllers");
const db = require("../models");
const User = db.User;


router.get('/', controller.findAll);

router.post('/', controller.create);

router.get('/login', controller.showLogin);

router.get('/register', controller.showRegister);

module.exports = router;
