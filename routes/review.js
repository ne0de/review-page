var express = require('express');
var router = express.Router();
const userController = require("../controllers/user.controllers");
const controller = require("../controllers/review.controllers");


router.get('/all', controller.showAll);

router.post('/', userController.isAuthenticated, controller.newReview);

router.get('/create', userController.isAuthenticated, controller.showCreate);

module.exports = router;
