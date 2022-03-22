const helper = require("../helper.js");
const database = require('../database.js');

module.exports = {
    triggers: [
        "Good morning Dexil"
    ],
    responses: [
        "Don't talk to me until I have my coffee",
        "Good morning @",
        "no",
    ],
    execute(message) {
        const MIN_BASE_GAIN_LOVE = -1;
        const MAX_BASE_GAIN_LOVE = 3;

        const gainedLove = Math.randomIntInRange(MIN_BASE_GAIN_LOVE, MAX_BASE_GAIN_LOVE);

        database.mutateData({id: message.author.id, love: gainedLove});

        var reply = this.responses.getRandomElement().replace("@", `${helper.getAuthorDisplayName(message)}`);

        message.reply(reply);
    }
}