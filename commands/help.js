require('dotenv').config();
const main = require("../main");

module.exports = {
    name: "help",
    description: "Helps you with commands",
    execute(message, args) {
        if(Math.randomIntInRange(0, 1000) == 0)
            return message.reply(process.env.SECRET);

        var reply = "";

        const commands = Array.from(main.client.commands.values());
        
        //foreach loop no work here ;(
        for(var i = 0; i < commands.length; i++) {
            const command = commands[i];

            if(command.name == this.name) {
                continue;
            }

            reply += `\n-${command.name}: ${command.description}`;
        }

        if(reply == "")
            return message.reply("There are no commands!");

        message.reply(`\`\`\`${reply}\`\`\``);
    }
}