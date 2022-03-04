const helper = require('../helper');

module.exports = {
    triggers: [
        'lmao',
        'lol'
    ],
    responses: [
        'How is that funny?',
        'lol',
        'lmao',
        'U think thats funny @?'
    ],
    execute(message, args) {
        const reply = this.responses.getRandomElement().replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}