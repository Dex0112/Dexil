const helper = require("../helper.js");

module.exports = {
    triggers: [
        "How's the weather",
        "How's the weather Dexil?",
        "Dexil, how is it looking outside?",
        "How is it looking outside Dexil?",
        "☁️"
    ],
    responses: [
        "Wouldn't you like to know",
        "Not to bad. Bit vibes in the cloud"
    ],
    execute(message) {
        const reply = this.responses.getRandomElement().replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}