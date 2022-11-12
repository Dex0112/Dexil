const { Permissions } = require('../main');

module.exports = {
    name: "message",
    description: "Sends message to user (``-message @user \"Message here!\"``). MODS ONLY",
    execute(message, args) {
        if(!Permissions.hasPermission(message.member, Permissions.MANAGE_USERS))
            return message.reply("You do not have the permission to use this command");
            
        const member = message.mentions.members.first();

        if(member == null) 
            return message.reply("Please enter a valid user!");

        const content = message.content.slice(
            message.content.indexOf('"') + 1,
            message.content.lastIndexOf('"')
        );

        try {
            member.user.send(content) 
            return message.reply("Message sent");
        } catch {
            return message.reply("There was an error while trying to send a user a message");
        }
    }
}