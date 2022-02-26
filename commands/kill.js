const helper = require("../helper");

module.exports = {
    name: "kill",
    description: "Brutally slays another person (-kill @(person))",
    execute(message, args) {
        const member = message.guild.members.cache.get(message.mentions.members.first().id);

        if(!member)
            return message.reply("Please input a valid user to kill!");

        const recipient = helper.getDisplayName(member);

        message.reply(`${recipient} has been slain!`);
    }
}