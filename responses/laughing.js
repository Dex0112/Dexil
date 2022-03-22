const helper = require('../helper');
const database = require('../database.js');

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
        const MIN_BASE_GAIN_LOVE = -1;
        const MAX_BASE_GAIN_LOVE = 3;

        const gainedLove = Math.randomIntInRange(MIN_BASE_GAIN_LOVE, MAX_BASE_GAIN_LOVE);

        database.mutateData({id: message.author.id, exp: 0, love: gainedLove});

        const reply = this.responses.getRandomElement().replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}