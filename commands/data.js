const database = require("../database.js");
const helper = require("../helper.js");

module.exports = {
    name: "data",
    description: "Gets the data of a member! (Mods only)",
    async execute(message, args) {
        if(!message.member.roles.cache.has('939667378948681730'))
            return message.reply("You do not have permission to complete this command!");
        
        const member = message.mentions.members.first();
        
        if(member == null || member.roles.cache.has('945164718186852412'))
            return message.reply("Please insert a valid member!");

        const memberData = await database.getData(member.user.id.toString());

        message.reply(`${helper.getDisplayName(member)} is level ${helper.calculateLevel(memberData.exp)} and has ${memberData.love} love from Dexil!`);
    }
}