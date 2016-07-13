const Bot = require('messenger-bot');
const GuMessageEngine = require('./engines/guMessageEngine.js');
const GuPostbackEngine = require('./engines/guPostbackEngine.js');
const GuSessionManager = require('./session/guSession.js');

function GuBotFactory() {
}

GuBotFactory.prototype.create = function (botConfig) {
    console.log("BOT_CONF: " + JSON.stringify(botConfig));
    let bot = new Bot(botConfig);
    var messageEngine = new GuMessageEngine(bot);
	var postbackEngine = new GuPostbackEngine(bot);
    var sessionManager = new GuSessionManager();

    bot.on('error', (err) => {
        console.log(err.message);
    });

    bot.on('message', (payload, reply) => {
        console.log(`Received message from ${payload.sender.id}`);
        messageEngine.reply(
            payload,
            sessionManager.getSession(payload.sender.id),
            (response) => {
                reply(response, (err) => {
                    if (err) console.log(err.message);
                });
            });
    });

    bot.on('postback', (payload, reply) => {
        console.log(`Received postback from ${payload.sender.id}`);

        postbackEngine.reply(
            payload,
            sessionManager.getSession(payload.sender.id),
            (response) => {
                reply(response, (err) => {
                    if (err) console.log(err.message);
                });
            });
    });

    return bot;
};



module.exports = GuBotFactory;