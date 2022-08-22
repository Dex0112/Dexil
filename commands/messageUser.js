const { execute } = require("./about");

module.exports = {
    name: "message",
    description: "Sends message to user (``-message @user \"Message here!\"``). MODS ONLY",
    execute(message, args) {
        if(!message.member.roles.cache.has('939667378948681730'))
            return message.reply("You do not have the permission to use this command");
            
        const member = message.mentions.members.first();

        if(member == null) 
            return message.reply("Please enter a valid user!");

        const send = message.content.slice(
            message.content.indexOf('"') + 1,
            message.content.lastIndexOf('"')
        );

        try {
            member.user.send(send) 
            return message.reply("Message sent");
        } catch {
            return message.reply("There was an error while trying to send a user a message");
        }
    }
}