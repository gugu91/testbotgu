const GuSessionInstance = require('./guSessionInstance.js');

var GuSession = function () {
    let self = this;
    self.sessions = [];
};

GuSession.prototype.getSession = function (fbId) {
    let self = this;

    var session = self.sessions[fbId]
    if (!session || session.isExpired()) {
        self.sessions[fbId] = session = new GuSessionInstance(fbId);
        console.log(`Created new session for ${payload.sender.id}`);
    } else {
        console.log(`Restored session for ${payload.sender.id}`);
    }

    return session;
}

module.exports = GuSession;