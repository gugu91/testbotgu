'use strict';
var GuSessionInstance = function (fbId) {
    let self = this;
    self.expireTime = getExpireTime();
    self.id = fbId;
    self.context = {};
};

function getExpireTime() {
    let minutes = 5;
    return new Date(new Date().getTime() + minutes * 60000);
}

GuSessionInstance.prototype.isExpired = function () {
    let self = this;
    return new Date() >= self.expireTime;
};

GuSessionInstance.prototype.contains = function (key) {  
    let self = this;
    return self.context[key] !== undefined && self.context[key] !== null;
};

GuSessionInstance.prototype.get = function (key) {  
    let self = this;
    return self.context[key];
};

GuSessionInstance.prototype.saveAndClear = function () {
    let self = this;
    self.context = {};
};

GuSessionInstance.prototype.addOrReplace = function (key, obj) {
    let self = this;   
    self.expireTime = getExpireTime();
    return self.context[key] = obj;
};

module.exports = GuSessionInstance;