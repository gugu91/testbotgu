'use strict';
let express = require('express');
let router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express', doctype:'html' });
});

module.exports = router;