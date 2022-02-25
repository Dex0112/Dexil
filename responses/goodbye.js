const helper = require("../helper.js");

module.exports = {
    trigger: "Goodbye Dexil",
    execute(message) {
        message.reply(`Goodbye ${helper.getAuthorDisplayName(message)}:cry::cry::cry:`)
    }
}