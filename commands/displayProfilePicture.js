const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "pfp",
    description: "Displays the profile pic of a user (@ user or leave blank to display your own).",
    execute(message, args) {
        const target = message.mentions.users.first() || message.author;

        const response = new MessageEmbed().setImage(target.displayAvatarURL({dynamic: true}));

        message.reply({embeds: [response]});
    }
}