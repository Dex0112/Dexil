const { Permissions } = require('../main');

module.exports = {
    name: "message",
    description: "Sends message to channel",
    execute(message, args) {
        const channel = message.mentions.channels.first();

        if(channel == null) return message.reply("Please enter a valid channel!");

        if(!Permissions.hasPermission(message.member, Permissions.MANAGE_USERS))
            return message.reply("You do not have the permission to use this command");

        const content = message.content.indexOf('"') >= 0 ? message.content.slice(
            message.content.indexOf('"') + 1,
            message.content.lastIndexOf('"')
        ) : null;
    

        channel.send(content);
    }
}