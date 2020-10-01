var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { 
  res.render('home');
});

router.get('/faq', function(req, res, next) {
  res.render('faq');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/term', function(req, res, next) {
  res.render('term');
});



module.exports = router;