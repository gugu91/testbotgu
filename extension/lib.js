'use strict';
let GuExtension = require('../lib/extensionFramework/guExtension'),
    Util = require('util');

function Lib(bot) {
    let self = this;
    Lib.super_.call(self, bot);
}

Lib.prototype.getCRMProfile = function (message, session, callback, args) {
    let self = this;
    session.addOrReplace('customerName', 'Guglielmo Porcellini');
    Lib.super_.prototype.finalize.call(self, callback);
};

Util.inherits(Lib, GuExtension);

module.exports = Lib;