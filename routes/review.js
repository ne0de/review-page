var express = require('express');
var router = express.Router();
const controller = require("../controllers/review.controllers");

router.get('/', controller.findAll);

module.exports = router;
