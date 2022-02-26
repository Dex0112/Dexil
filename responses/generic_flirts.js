const helper = require("../helper.js");

module.exports = {
    triggers: [
        "Love you Dexil",
        "Dexil, smokin",
        "Dexil be looking submissive and breedable",
        "Dexil ❤️",
        "Dexil is cute",
        "Dexil lookin fine"
    ],
    responses: [
        ":heart::heart::heart:",
        "Not to bad yourself!",
        ":kissing:"
    ],
    execute(message) {
        const reply = this.responses[Math.floor(Math.random() * this.responses.length)]
            .replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}