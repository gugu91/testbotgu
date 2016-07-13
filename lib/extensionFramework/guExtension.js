'use strict';
var GuExtension = function (bot) {
    let self = this;
    self.bot = bot;
};

GuExtension.prototype.getFBProfile = function (bot, message, session, callback) {
    let self = this;
    bot.getProfile(id, (err, profile) => {
        if (err) console.log(err.message);
        if (callback && typeof(callback) === 'function'){
            if (profile)
                session.addOrReplace('customerName', profile.first_name + " " + profile.last_name);
            self.finalize(callback);
        }
    });
};

GuExtension.prototype.finalize = function (callback) {
    if (callback && typeof(callback === 'function')){
        callback();
    }
};

module.exports = GuExtension;