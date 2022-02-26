const helper = require("../helper.js");

module.exports = {
    triggers: [
        "Love you Dexil",
        "Dexil, smokin",
        "Dexil be looking submissive and breedable",
        "Dexil <3",
        "Dexil :heart:",
        "Dexil is cute",
        "Dexil lookin fine"
    ],
    responses: [
        ":heart::heart::heart:",
        "Not to bad yourself!",
        ":kissing:"
    ],
    execute(message) {
        const reply = this.replies[Math.floor(Math.random() * this.replies.length)]
            .replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}