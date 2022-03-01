const helper = require("../helper.js");

module.exports = {
    triggers: [
        "Dm me Dexil 😉",
        "Dexil, lets move this to dms"
    ],
    responses: [
        ":wink:",
        "Bet"
    ],
    execute(message) {
        const reply = this.responses.getRandomElement().replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);

        message.author.send("Hey bebe!");
    }
}