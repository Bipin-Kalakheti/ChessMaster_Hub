var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');
let Tournament = require('../models/tournament');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Landing' });
});

/* GET Home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Landing' });
});





module.exports = router;
