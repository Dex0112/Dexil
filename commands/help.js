require("../main.js");

module.exports = {
    name: "help",
    description: "Displays all commands",
    execute(message, args) {
        var reply = "";
        
        for(command of Client.commands){
            if(command.name == this.name)
                continue;

            reply += `\n${commmand.name}: ${command.description}`;
        }

        reply.trim();

        message.reply(reply);
    }
}