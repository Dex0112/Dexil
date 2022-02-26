const helper = require("../helper.js");

module.exports = {
    triggers: [
        "Good afternoon Dexil",
        "Good afternoon",
        "Good evening Dexil",
        "Good evening"
    ],
    responses: [
        "Well it was good",
        "Good afternoon @",
        "Good evening @"
    ],
    execute(message) {
        const reply = this.responses[Math.floor(Math.random() * this.responses.length)]
            .replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}