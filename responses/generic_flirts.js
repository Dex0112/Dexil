const helper = require("../helper.js");
const database = require('../database.js');

module.exports = {
    triggers: [
        "Love you Dexil",
        "Dexil, smokin",
        "Dexil be looking submissive and breedable",
        "Dexil ❤️",
        "Dexil is cute",
        "Dexil lookin fine",
        "😘",
        "Dexil, you're cute"
    ],
    responses: [
        ":heart::heart::heart:",
        "Not too bad yourself!",
        ":kissing:",
        "😘"
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