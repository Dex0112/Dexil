const helper = require("../helper.js");

module.exports = {
    triggers: [
        "Hello Dexil",
        "Hey Dexil",
        "Hi Dexil",
        "Hola Dexil",
        "Dexil, I'm here",
        "I'm here, Dexil",
        "Hola Dexil"
    ],
    responses: [
        "Hola @",
        "Hey @",
        "Hello @",
        "y"
    ],
    execute(message) {
        const reply = this.responses[Math.floor(Math.random() * this.responses.length)]
            .replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}