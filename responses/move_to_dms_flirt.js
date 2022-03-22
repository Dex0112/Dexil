const helper = require("../helper.js");
//const database = require('../database.js');

module.exports = {
    triggers: [
        "Dm me Dexil 😉",
        "Dm me Dexil",
        "Dexil, lets move this to dms"
    ],
    responses: [
        ":wink:",
        "Bet"
    ],
    execute(message) {
        const MIN_BASE_GAIN_LOVE = -1;
        const MAX_BASE_GAIN_LOVE = 3;

        const gainedLove = M
        ath.randomIntInRange(MIN_BASE_GAIN_LOVE, MAX_BASE_GAIN_LOVE);

        database.mutateData({id: message.author.id, love: gainedLove});

        const reply = this.responses.getRandomElement().replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);

        message.author.send("Hey bebe!");
    }
}