const helper = require("../helper.js");

module.exports = {
    trigger: "Good morning Dexil",
    replies: [
        "Don't talk to me until I have my coffee",
        "Good morning @",
        "no",
    ],
    execute(message) {
        var reply = this.replies[Math.floor(Math.random() * this.replies.length)]
            .replace("@", `${helper.getAuthorDisplayName(message)}`);

        message.reply(reply);
    }
}