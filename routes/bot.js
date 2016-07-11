'use strict';
const Bot = require('messenger-bot');
const GuMessageEngine = require('../lib/engines/guMessageEngine.js');
const GuPostbackEngine = require('../lib/engines/guPostbackEngine.js');
const GuSessionManager = require('../lib/session/guSession.js');
const botConfig = require('../config/botStaging.json');
const express = require('express');

let router = express.Router();
let messageEngine = new GuMessageEngine();
let postbackEngine = new GuPostbackEngine();
let sessionManager = new GuSessionManager();

let bot = new Bot(botConfig);

bot.on('error', (err) => {
    console.log(err.message);
});

bot.on('message', (payload, reply) => {
    console.log(`Received message from ${payload.sender.id}`);
    messageEngine.reply(
        payload, 
        sessionManager.getSession(payload.sender.id),
        (response) => {
            reply(response, (err) => {
                if (err) console.log(err.message);
        });
    });

    //   bot.getProfile(payload.sender.id, (err, profile) => {
    //     if (err) throw err

    //     reply(responseEngine.generic(), (err) => {
    //       if (err) throw err

    //       console.log(`Received message from ${profile.first_name} ${profile.last_name}:`)
    //     });
    //   });
});

bot.on('postback', (payload, reply) => {
    console.log(`Received postback from ${payload.sender.id}`);

    postbackEngine.reply(
        payload, 
        sessionManager.getSession(payload.sender.id),
        (response) => {
            reply(response, (err) => {
                if (err) console.log(err.message);
        });
    });
});

router.get('/', (req, res) => {
    return bot._verify(req, res);
});

router.post('/', (req, res) => {
    bot._handleMessage(req.body);
    res.end(JSON.stringify({ status: 'ok' }));
});

module.exports = router;