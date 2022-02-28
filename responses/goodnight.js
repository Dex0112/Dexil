const helper = require("../helper");

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
        const reply = this.responses[Math.floor(Math.random() * this.responses.length)]
            .replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}