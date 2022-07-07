module.exports = {
    name: "role",
    description: "Gives or removes roll. Leave argument empy to see list of all eligible roles.",
    execute(message, args) {
        if(args[0] == null) {
            var reply = "Eligible roles:\n";

            const highestPosition = message.guild.roles.cache.find(r => r.id === '989801024170627092').position;

            message.guild.roles.cache.each(role => {
                if(!message.member.roles.cache.has(role.id) && role.position < highestPosition)
                    reply += `${role.name.replace(' ', '_')}\n`;
            });

            return message.reply("```" + reply + "```");
        }
        
        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === args[0].toLowerCase().replace("_", " "));

        if(role == null)
            return message.reply("Role does not exist! Do ``-role`` with no arguments to get a list of eligible roles for you!");

        if(!message.member.roles.cache.has(role.id)) {
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