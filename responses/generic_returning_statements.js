const helper = require("../helper.js");

module.exports = {
    triggers: [
        "I'm back",
        "Just got back home",
        "back"
    ],
    responses: [
        "Glad to here it @",
        "Can you leave again @?",
        "y"
    ],
    execute(message) {
        const reply = this.responses[Math.floor(Math.random() * this.responses.length)]
            .replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}