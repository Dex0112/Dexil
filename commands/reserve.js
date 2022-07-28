const { Permissions } = require("discord.js");

module.exports = {
    name: "reserve",
    description: "Creates a voice channel for a specified role.",
    execute: (message, args) => {
        const CHANNEL_MIN_LIFE = 1;

        const category = message.guild.channels.cache.get('939667237244141650');

        const role = message.mentions.roles.first();

        if(!role)
            return message.reply("You must add a role as a parameter to reserve a voice channel!");

        if(!message.member.roles.cache.has(role.id))
            return message.reply("You must have the role you want to reserve a voice channel for!")

        try {
            message.guild.channels.create(role.name, {
                type: "GUILD_VOICE",
                parent: category,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: [Permissions.FLAGS.VIEW_CHANNEL],
                        deny: [Permissions.FLAGS.CONNECT]
                    },
                    {
                        id: role.id,
                        allow: [Permissions.FLAGS.CONNECT],
                    }
                ]
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