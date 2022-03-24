const helper = require("../helper.js");
const database = require('../database.js');

module.exports = {
    triggers: [
        "Your trash Dexil",
        "Dexil is a bot",
        "Dexil is stupid",
        "Dexil bad gamer",
        "Dexil = trash",
        "Dexil is mistake"
    ],
    responses: [
        "U r mom",
        "Ur mom",
        "-ban @",
        "@ = trash",
        "@ the real bot here",
        "Can't even beat muck on easy mode :rofl::rofl::rofl::rofl:",
        "Get some bitches-https://www.farmersonly.com/"
    ],
    execute(message) {
        const MIN_BASE_GAIN_LOVE = -3;
        const MAX_BASE_GAIN_LOVE = 1;

        const gainedLove = Math.randomIntInRange(MIN_BASE_GAIN_LOVE, MAX_BASE_GAIN_LOVE);

        database.mutateData({id: message.author.id, exp: 0, love: gainedLove});

        const reply = this.responses.getRandomElement().replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}