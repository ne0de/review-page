var express = require('express');
var router = express.Router();
const controller = require("../controllers/user.controllers");
const db = require("../models");

router.get('/', controller.findAll);

router.post('/', controller.create);

router.get('/login', controller.showLogin);

router.get('/register', controller.showRegister);

router.get('/profile/:id', controller.showProfile);

module.exports = router;
