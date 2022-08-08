const { Permissions } = require("discord.js");

module.exports = {
    name: "reserve",
    description: "Creates a voice channel for a specified role. (-reserve @(role) (Spectators True/False). Ex: -reserve @Dev true (makes vc for devs and allows spectators))",
    execute: (message, args) => {
        const CHANNEL_MIN_LIFE = 1;

        const category = message.guild.channels.cache.get('939667237244141650');

        const role = message.mentions.roles.first();

        const spectators = args[1]?.toLowerCase() == 'true' || false;

        if(!role)
            return message.reply("You must add a valid role as a parameter to reserve a voice channel!");
        
        if(!message.member.roles.cache.has(role.id) && !message.member.roles.cache.has('939667378948681730'))
            return message.reply("You must have the role you want to reserve a voice channel for!")
        
        const permissionOverwrites = [
            {
                id: role.id,
                allow: [Permissions.FLAGS.CONNECT]
            }
        ];

        if(spectators) {
            permissionOverwrites.push({
                id: message.guild.id,
                deny: [Permissions.FLAGS.SPEAK]
            });
        } else {
            permissionOverwrites.push({
                id: message.guild.id,
                deny: [Permissions.FLAGS.CONNECT]
            })
        }

        try {
            message.guild.channels.create(role.name, {
                type: "GUILD_VOICE",
                parent: category,
                permissionOverwrites: permissionOverwrites
            }).then(channel => {
                message.reply(`You have ${CHANNEL_MIN_LIFE} minutes to join ${channel}!`);

                var intervalID = setInterval(() => {
                    if(channel.members.size <= 0) {
                        channel.delete();

                        clearInterval(intervalID);

                        return console.log("Done");
                    }

                    console.log("Not quite");
                }, CHANNEL_MIN_LIFE * 60 * 1000);
            });
        } catch(err) {
            message.reply("There was an unexpected error while creating the voice channel!");
        }
    }
}