const helper = require("../helper.js");
const database = require('../database.js');

module.exports = {
    triggers: [
        "Goodbye Dexil",
        "Bye Dexil",
        "Adios Dexil",
        "Later Dexil",
        "Dexil, I must go"
    ],
    responses: [
        "Goodbye @ :cry::cry::cry:",
        "Adios @",
        "Farewell, @",
        "Good!",
        "Imagine telling a bot because real people don't care.",
        ":sob:don't leave plz:sob:",
        "Until we meet again"
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