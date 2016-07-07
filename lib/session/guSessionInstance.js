'use strict'
var GuSessionInstance = function (fbId, duration) {
    let self = this;
    self.expireTime = getExpireTime(new Date(), duration);

    self.id = fbId;
    self.context = {};
};

function getExpireTime(date) {
    var minutes = 5;
    return new Date(date.getTime() + minutes * 60000);
}

GuSessionInstance.prototype.isExpired = function () {
    return new Date().getDate() >= self.expireTime.getDate();
}

GuSessionInstance.prototype.getContext = function () {  
    return self.context;
}

GuSessionInstance.prototype.addToContext = function (key, obj) {   
    return self.context[key] = obj;
}

module.exports = GuSessionInstance;