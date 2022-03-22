const helper = require("../helper");
const database = require('../database.js');

module.exports = {
    triggers: [
        "Goodnight",
        "Night",
        "Goodnight Dexil",
    ],
    responses: [
        "Goodnight @",
        "Night <3",
        "Don't come back :)",
        "Imagine sleeping. I just recharge my batteries"
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