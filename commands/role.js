module.exports = {
    name: "role",
    description: "Gives or removes roll. Leave argument empy to see list of all eligible roles. (-role or -role @(role))",
    execute(message, args) {
        const seperator = message.guild.roles.cache.find(r => r.id === '989801024170627092').position;

        if(args[0] == null) {
            var reply = "Eligible roles:\n";

            message.guild.roles.cache.each(role => {
                if(!message.member.roles.cache.has(role.id) && role.position < seperator)
                    reply += `${role.name}\n`;
            });

            return message.reply("```" + reply + "```");
        }
        
        const role = message.mentions.roles.first();

        if(role == null)
            return message.reply("Role does not exist! Do ``-role`` with no arguments to get a list of eligible roles for you!");

        if(!message.member.roles.cache.has(role.id) && role.position < seperator) {
            message.member.roles.add(role).then(() => {
                message.reply(`You have been granted the ${role.name} role!`);
            }).catch(() => {
                message.reply(`The ${role.name} role is unavailable!`);
            });
        } else {
            message.member.roles.remove(role).then(() => {
                message.reply(`You no longer have the ${role.name} role!`);
            }).catch(() => {
                message.reply(`The ${role.name} role is unmanageable at this time!`);
            });
        }
    }
}