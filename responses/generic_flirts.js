const helper = require("../helper.js");

module.exports = {
    triggers: [
        "Love you Dexil",
        "Dexil, smokin",
        "Dexil be looking submissive and breedable",
        "Dexil ❤️",
        "Dexil is cute",
        "Dexil lookin fine",
        "😘",
        "Dexil, you're cute"
    ],
    responses: [
        ":heart::heart::heart:",
        "Not too bad yourself!",
        ":kissing:",
        "😘"
    ],
    execute(message) {
        const reply = this.responses.getRandomElement().replace("@", helper.getAuthorDisplayName(message));

        message.reply(reply);
    }
}