var express = require('express');
var router = express.Router();
const controller = require("../controllers/games.controllers");

router.post('/', controller.addGame); 

router.get('/all', controller.mostrarTodo) 

router.get('/insert', controller.showCreate); 

module.exports = router;
