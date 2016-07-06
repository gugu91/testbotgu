var GuSessionInstance = function (fbId, duration) {
    let self = this;
    self.expireTime = getExpireTime(new Date(), duration);

    self.id = id;
    self.context = {};
};

let getExpireTime = function (date) {
    var minutes = 5;
    return new Date(date.getTime() + minutes * 60000);
}

GuSessionInstance.prototype.isExpired = function () {
    let self = this;    
    return new Date().getDate() >= self.expireTime.getDate();
}

GuSessionInstance.prototype.getContext = function () {
    let self = this;    
    return self.context;
}

GuSessionInstance.prototype.addToContext = function (key, obj) {
    let self = this;    
    return self.context[key] = obj;
}

module.exports = GuSessionInstance;