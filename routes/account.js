var express = require('express');
var router = express.Router();
var accounts = []

/* Get login page */
router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'Acceder'
  });
});

/* Get accounts */
router.get("/", function (req, res, next) {
  res.send({
    response: accounts
  })
});

/* Post new account */
router.post("/", function (req, res, next) {
  var newAccount = req.body;
  accounts.push(newAccount);
  res.send({
    status: true
  });
});

/* Get register page */
router.get("/register", function (req, res, next) {
  res.render("register", {
    title: 'Registro'
  });
});



module.exports = router;
