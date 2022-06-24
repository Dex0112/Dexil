const { client } = require("../main.js");

module.exports = {
    name: "help",
    description: "Helps you with commands",
    execute(message, args) {
        if(Math.randomIntInRange(0, 1000) == 0)
            return message.reply("You are the chosen one!!!!!!!! You have recieved an honor that has a 0.1% chance of happening.");

        var reply = "";

        const commands = Array.from(client.commands.values());
        
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