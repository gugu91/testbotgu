'use strict';
let GuInterviewEngine = require('./guInterviewEngine'),
    Util = require('util');

function GuMessageEngine() {
    let self = this;
    GuMessageEngine.super_.call(self);
}

Util.inherits(GuMessageEngine, GuInterviewEngine);

GuMessageEngine.prototype.reply = function (payload, session, callback) { 
    let self = this;     
    GuMessageEngine.super_.prototype.reply.call(self, payload.message.text, session, callback);
};

module.exports = GuMessageEngine;

