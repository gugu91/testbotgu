'use strict'
var GuPostbackEngine = function () {
    let self = this;
};

function generic() {
    return {
        text: "Thank you for pressing the button! Your pressing is important to us"
    };
};

GuPostbackEngine.prototype.process = function (payload, callback) {
    callback(generic());
};

module.exports = GuPostbackEngine;

