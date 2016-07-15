'use strict';
let express = require('express');
let router = express.Router();

/* GET home page. */

router.get('/interviews/index', function(req, res) {
  res.render('partial/interviews/index', { title: 'Interviews', doctype:'html' });
});

router.get('/messages/instance', function(req, res) {
  res.render('partial/messages/instance', { doctype:'html' });
});

module.exports = router;
