const helper = require("../helper.js");

module.exports = {
    triggers: [
        "What is Dexil's purpose?",
        "Dexil's purpose"
    ],
    responses: [
        "What is your purpose?",
        "To serve you.",
        "To serve your mom :rofl::rofl::rofl::rofl:",
        "Bot: what is my purpose \nRick: You pass butter. \nBot: Oh My God :frowning:"
    ],
    execute(message) {
        const reply = this.responses[Math.floor(Math.random() * this.responses.length)]
            .replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}