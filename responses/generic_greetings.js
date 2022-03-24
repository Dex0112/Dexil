const helper = require("../helper.js");
const database = require('../database.js');

module.exports = {
    triggers: [
        "Hello Dexil",
        "Hey Dexil",
        "Hi Dexil",
        "Hola Dexil",
        "Dexil, I'm here",
        "I'm here, Dexil",
        "Hola Dexil"
    ],
    responses: [
        "Hola @",
        "Hey @",
        "Hello @",
        "y"
    ],
    execute(message) {
        const MIN_BASE_GAIN_LOVE = -1;
        const MAX_BASE_GAIN_LOVE = 3;

        const gainedLove = Math.randomIntInRange(MIN_BASE_GAIN_LOVE, MAX_BASE_GAIN_LOVE);

        database.mutateData({id: message.author.id, exp: 0, love: gainedLove});

        const reply = this.responses.getRandomElement().replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}