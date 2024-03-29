const helper = require("../helper");

module.exports = {
    name: "kill",
    description: "Brutally slays another person (-kill @(person))",
    execute(message, args) {
        const member = message.guild.members.cache.get(message.mentions.members.first().id);

        if(!member)
            return message.reply("Please input a valid user to kill!");

        if(member.user.username == message.author.username)
            return message.reply("No, don't do it!");
        
        if(member.roles.cache.some(role => role == '1100984821624356938'))
            return message.reply("Bots can't die dummy!");
        else if(member.roles.cache.some(role => role == '1100607380485582878'))
            return message.reply("They are too strong!");

        const recipient = helper.getDisplayName(member);

        message.reply(`${recipient} has been slain!`);
    }
}
