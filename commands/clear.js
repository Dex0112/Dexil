module.exports = {
    name: "clear",
    description: "Clears messages a channel (requires moderator)",
    async execute(message, args) {
        if(!message.member.roles.cache.has('939667378948681730'))
            return message.reply("You do not have permission to complete this command!");

        if(!args[0]) 
            args[0] = 1;
        if(isNaN(args[0]))
            return message.reply("Please enter a real number!")

        if(args[0] > 99) return message.reply("You cannot delete more than 99 mesages!");
        if(args[0] < 1) return message.reply("You must delete at least one message!");

        await message.channel.messages.fetch({ limit: parseInt(args[0]) + 1 }).then(messages => {
            message.channel.bulkDelete(messages, true);
        });
    }
}