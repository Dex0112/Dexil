const helper = require("../helper.js");

module.exports = {
    trigger: "Hello Dexil",
    async execute(message) {
        console.log(lib);

        message.reply(`Hello ${helper.getAuthorDisplayName(message)}`);
    }
}