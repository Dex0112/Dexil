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
        const reply = this.responses.getRandomElement().replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}