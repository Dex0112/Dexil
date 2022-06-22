const database = require("../database.js");
const helper = require("../helper.js");

module.exports = {
    name: "data",
    description: "Displays data of user. (@user for mods)",
    async execute(message, args) {
        if(message.mentions.members.first()) {
            if(!message.member.roles.cache.has('939667378948681730'))
                return message.reply("You do not have permission to complete this command!");
        }

        const member = message.mentions.members.first() || message.member;

        const memberData = await database.getData(member.id.toString());

        if(memberData == null)
            return message.reply("Data currently unavailable.");

        message.reply(`${helper.getDisplayName(member)} is level ${helper.calculateLevel(memberData.exp)} (${memberData.exp}) and has ${memberData.love} love from Dexil!`);
    }
}