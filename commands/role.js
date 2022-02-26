module.exports = {
    name: "role",
    description: "Gives requested roles (limited)",
    execute(message, args) {
        if(args[0] == null)
            return message.reply("Please insert a valid role");
        
        const role = message.guild.roles.cache.find(r => r.name === args[0].replace("_", " "));

        if(role == null)
            return message.reply("Role does not exist!");

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