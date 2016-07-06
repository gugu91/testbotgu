const GuSessionInstance = require('./guSessionInstance.js');

module.exports = function GuSession() {
  let self = this;
  self.sessions = [];
  return {
    getSession: function (fbId) {
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
  }
};