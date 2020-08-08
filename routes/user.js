var express = require('express');
var router = express.Router();

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
