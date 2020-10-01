var express = require('express');
var router = express.Router();

const userController = require("../controllers/user.controllers");
const controller = require("../controllers/review.controllers");

router.get('/all', controller.showAll);

router.get('/popular', controller.showPopular);

router.get('/create', userController.isAuthenticated, controller.showCreate);

router.get('/view/:id', controller.showSolo);

router.get('/like/:id',userController.isAuthenticated, controller.addLike);

router.get('/dislike/:id',userController.isAuthenticated, controller.addDislike);

router.post('/', userController.isAuthenticated, controller.createReview);

module.exports = router;
