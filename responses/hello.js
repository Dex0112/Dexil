const helper = require("../helper.js");

module.exports = {
    trigger: "Hello Dexil",
    execute(message) {
        message.reply(`Hello ${helper.getAuthorDisplayName(message)}`);
    }
}