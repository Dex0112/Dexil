const { client, Permissions } = require("../main.js");

module.exports = {
    name: "clear",
    description: "Clears messages a channel (requires moderator)",
    async execute(message, args) {
        if(!Permissions.hasPermission(message.member, Permissions.MANAGE_MESSAGES))
            return message.reply("You do not have permission to complete this command!");

        if(!args[0]) args[0] = 1;
        if(isNaN(args[0])) return message.reply("Please enter a real number!")
        if(args[0] > 99) return message.reply("You cannot delete more than 99 mesages!");
        if(args[0] < 1) return message.reply("You must delete at least one message!");

        const reason = message.content.indexOf('"') >= 0 ? message.content.slice(
            message.content.indexOf('"') + 1,
            message.content.lastIndexOf('"')
        ) : null;

        await message.channel.messages.fetch({ limit: parseInt(args[0]) + 1 }).then(messages => {
            message.channel.bulkDelete(messages, true);

            console.log(messages);

            var updateMessage = `Bulk delete of ${[...messages].length - 1} messages in ${message.channel}`;
            if(reason) updateMessage += ` for '${reason}'`;
            client.updateLog(updateMessage);
        });
    }
}