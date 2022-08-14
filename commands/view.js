const helper = require('../helper');

module.exports = {
    name: "view",
    description: "View people in a role. ``-role @role``",
    async execute(message, args) {
        const role = message.mentions.roles.first();

        if(role == null) 
            return message.reply("Please enter a valid role!");
        
        const roleMembers = await helper.getMembersInRole(role.id);

        var reply = "";

        for(const member of roleMembers) {
            const displayName = helper.getDisplayName(member);

            reply += displayName + '\n';
        }

        message.reply("```" + reply.trim() + "```");
    }
}