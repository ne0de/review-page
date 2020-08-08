var express = require('express');
var router = express.Router();
const db = require("../models");
const User = db.User;

router.get('/', async function(req, res, next) {
  let result = await User.findAll();
  res.send({
    response : result
  });
});

/* Post new account */
router.post("/", function (req, res, next) {
  var newAccount = req.body;
   //res.status(500).send();
  res.send('Piola');
});

router.get('/login', function(req, res, next) {
  res.render('user/login');
});

router.get("/register", function (req, res, next) {
  res.render('user/register');
});

module.exports = router;
