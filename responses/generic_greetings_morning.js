const helper = require("../helper.js");

module.exports = {
    triggers: [
        "Good morning Dexil"
    ],
    responses: [
        "Don't talk to me until I have my coffee",
        "Good morning @",
        "no",
    ],
    execute(message) {
        var reply = this.responses[Math.floor(Math.random() * this.responses.length)]
            .replace("@", `${helper.getAuthorDisplayName(message)}`);

        message.reply(reply);
    }
}