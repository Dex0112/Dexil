const helper = require("../helper.js");

module.exports = {
    triggers: [
        "Your trash Dexil",
        "Dexil is a bot",
        "Dexil is stupid",
        "Dexil bad gamber",
        "Dexil = trash",
        "Dexil is mistake"
    ],
    responses: [
        "U r mom",
        "Ur mom",
        "-ban @",
        "@ = trash",
        "@ the real bot here",
        "Can't even beat muck on easy mode :rofl::rofl::rofl::rofl:"
    ],
    execute(message) {
        const reply = this.responses[Math.floor(Math.random() * this.responses.length)]
            .replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}