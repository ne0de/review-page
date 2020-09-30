var express = require('express');
var router = express.Router();

const userController = require("../controllers/user.controllers");
const controller = require("../controllers/review.controllers");
const { Router } = require('express');

router.get('/all', controller.showAll);

router.get('/create', userController.isAuthenticated, controller.showCreate);

router.get('/view/:id', controller.showSolo);

router.get('/like/:idreview',userController.isAuthenticated, controller.addLike);

router.post('/', userController.isAuthenticated, controller.createReview);

module.exports = router;
