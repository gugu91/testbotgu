'use strict';

let Common = function() {

};

Common.stringBuild = function (str, element){
    for (var property in element) {
        if (element.hasOwnProperty(property)) {
             str = str.replace("{" + property + "}", element[property]);
        }
    }

    return str;
};

Common.getProfile = function (bot, id, callback) {
    bot.getProfile(id, (err, profile) => {
        if (err) console.log(err.message);
        if (callback && typeof(callback) === 'function')
            callback(profile);
    });
};

module.exports = Common;