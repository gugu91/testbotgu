'use strict';
const GuSessionInstance = require('./guSessionInstance.js');

var GuSession = function () {
    let self = this;
    self.sessions = [];
};

GuSession.prototype.getSession = function (fbId) {
    let self = this;

    var session = self.sessions[fbId];
    if (!session || session.isExpired()) {
        self.sessions[fbId] = session = new GuSessionInstance(fbId);
        console.log(`Created new session for ${fbId}`);
    } else {
        console.log(`Restored session for ${fbId}`);
    }

    return session;
};

module.exports = GuSession;