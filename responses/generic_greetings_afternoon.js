const helper = require("../helper.js");
const database = require('../database.js');

module.exports = {
    triggers: [
        "Good afternoon Dexil",
        "Good afternoon",
        "Good evening Dexil",
        "Good evening"
    ],
    responses: [
        "Well it was good",
        "Good afternoon @",
        "Good evening @"
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