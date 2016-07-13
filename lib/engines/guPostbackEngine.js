'use strict';
let GuInterviewEngine = require('./guInterviewEngine'),
    Util = require('util');

function GuPostBackEngine(bot) {
    let self = this;
    GuPostBackEngine.super_.call(self, bot);
}

Util.inherits(GuPostBackEngine, GuInterviewEngine);

GuPostBackEngine.prototype.reply = function (payload, session, callback) {
    let self = this;
    GuPostBackEngine.super_.prototype.reply.call(self, payload.postback.payload, session, callback);
};

module.exports = GuPostBackEngine;

