'use strict'
const Bot = require('messenger-bot');
const GuMessageEngine = require('../lib/engines/guMessageEngine.js');
const GuPostbackEngine = require('../lib/engines/guPostbackEngine.js');
const GuSessionManager = require('../lib/session/guSession.js');
const express = require('express');

let router = express.Router();
let messageEngine = new GuMessageEngine();
let postbackEngine = new GuPostbackEngine();
let sessionManager = new GuSessionManager();

let bot = new Bot({
    token: 'EAADtS47PWpoBAC068H525YNbvst47A8ewmeaB4kOrl1orZB3UfJQoa8aaZBZC5zSZB6T8YXjK87uYxVvsgJaGHNSV8WFVqmcDzgl4pCTUZB8LjD9zY9sUA8tpQQtNu8w94JNnawJBhtiZBqG1EYk43se6zQ98NrwrQlzKFvjj5EwZDZD',
    verify: 'VERIFY_TOKEN',
    app_secret: '536ee5ee81645557826fd89543c56886'
});

bot.on('error', (err) => {
    console.log(err.message)
})

bot.on('message', (payload, reply) => {
    console.log(`Received message from ${payload.sender.id}`);
    messageEngine.process(
        payload, 
        sessionManager.getSession(payload.sender.id),
        (response) => {
            reply(response, (err) => {
                if (err) throw err
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

    postbackEngine.process(payload, (response) => {
        reply(response, (err) => {
            if (err) throw err

        });
    });
});

router.get('/', (req, res) => {
    return bot._verify(req, res)
});

router.post('/', (req, res) => {
    bot._handleMessage(req.body)
    res.end(JSON.stringify({ status: 'ok' }))
});

module.exports = router;