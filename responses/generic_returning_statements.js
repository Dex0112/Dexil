const helper = require("../helper.js");
const database = require('../database.js');

module.exports = {
    triggers: [
        "I'm back",
        "Just got back home",
        "back"
    ],
    responses: [
        "Glad to here it @",
        "Can you leave again @?",
        "y"
    ],
    execute(message) {
        const MIN_BASE_GAIN_LOVE = -1;
        const MAX_BASE_GAIN_LOVE = 3;

        const gainedLove = Math.randomIntInRange(MIN_BASE_GAIN_LOVE, MAX_BASE_GAIN_LOVE);

        database.mutateData({id: message.author.id, love: gainedLove});

        const reply = this.responses.getRandomElement().replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}