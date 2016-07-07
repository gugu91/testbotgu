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
    let self = this;
    return new Date() >= self.expireTime;
}

GuSessionInstance.prototype.contains = function (key) {  
    let self = this;
    return self.context[key];
}

GuSessionInstance.prototype.add = function (key, obj) {
    let self = this;   
    return self.context[key] = obj;
}

module.exports = GuSessionInstance;