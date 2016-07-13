'use strict';
const GuBotFactory = require('../lib/guBotFactory');
const botConfig = require('../config/bot_' + process.env.BOT_CONFIG + '.json');
const express = require('express');

let router = express.Router();

let guBotFactory = new GuBotFactory();
let guBot = guBotFactory.create(botConfig);

router.get('/', (req, res) => {
    return guBot._verify(req, res);
});

router.post('/', (req, res) => {
    guBot._handleMessage(req.body);
    res.end(JSON.stringify({ status: 'ok' }));
});

module.exports = router;