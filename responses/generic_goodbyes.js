const helper = require("../helper.js");

module.exports = {
    triggers: [
        "Goodbye Dexil",
        "Bye Dexil",
        "Adios Dexil",
        "Later Dexil",
        "Dexil, I must go"
    ],
    responses: [
        "Goodbye @ :cry::cry::cry:",
        "Adios @",
        "Farewell, @",
        "Good!",
        "Imagine telling a bot because real people don't care.",
        ":sob:don't leave plz:sob:",
        "Until we meet again"
    ],
    execute(message) {
        const reply = this.responses.getRandomElement().replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}