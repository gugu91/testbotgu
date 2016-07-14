'use strict';
let express = require('express');
let router = express.Router();

/* GET home page. */

router.get('/interviews/index', function(req, res) {
  res.render('partial/interviews/index', { title: 'Interviews' });
});

module.exports = router;
