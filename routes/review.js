var express = require('express');
var router = express.Router();
const controller = require("../controllers/review.controllers");

router.get('/', controller.findAll);

router.get('/create', controller.showCreate);


module.exports = router;
