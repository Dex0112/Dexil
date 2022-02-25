const { MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "clear",
    description: "clears a channel",
    execute(message, args) {
        if(!message.member.roles.cache.has('939667378948681730'))
            return message.reply("You do not have permission to complete this command!");

        if(!args[0]) 
            return message.reply("please enter the amount of messages that you want to clear!");
        if(isNaN(args[0]))
            return message.reply("please enter a real number!")

        if(args[0] > 100) return message.reply("You cannot delete more than 100 mesages!");
        if(args[0] < 1) return MessageSelectMenu.reply("You must delete at least one message!");

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            messages.channel.bulkDelete(messages);
        });
    }
}