const helper = require("../helper.js");

module.exports = {
    triggers: [
        "What is Dexil's purpose?"
    ],
    responses: [
        "What is your purpose?",
        "To serve you.",
        "To serve your mom :rofl::rofl::rofl::rofl:"
    ],
    execute(message) {
        const reply = this.responses[Math.floor(Math.random() * this.responses.length)]
            .replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}