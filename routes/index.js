var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Landing' });
});

/* GET Home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Landing' });
});

/* GET Database Page page. */
router.get('/tournaments', function(req, res, next) {
  res.render('index', { title: 'Tournaments' });
});

module.exports = router;
