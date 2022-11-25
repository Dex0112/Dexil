const helper = require('../helper');

module.exports = {
    name: "view",
    description: "View people in a role. ``-role @role``",
    execute(message, args) {
        const role = message.mentions.roles.first();

        if(role == null) 
            return message.reply("Please enter a valid role!");
        
        const roleMembers = helper.getMembersInRole(role.id).map(member => member.displayName);

        if(roleMembers.length == 0) 
            return message.reply("Nobody has this role!");

        var reply = roleMembers.join("\n");

        message.reply("```" + reply + "```");
    }
}