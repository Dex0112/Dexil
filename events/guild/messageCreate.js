module.exports = (Discord, client, message) => {
    const prefix = client.commandPrefix;

    if(message.author.bot) return;

    if(message.content.toLowerCase().includes("landon")) {
        message.author.send("You dare speak my masters name!");
        try {
            message.member.timeout(30 * 60 * 1000);
            message.delete();
        } catch(err) {
            console.log(err);
        }
    }

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(/ +/);

        const commandKey = args.shift().toLowerCase();

        const command = client.commands.get(commandKey);

        if(command)
            command.execute(message, args);
        else
            message.reply("This is not a command do ``-help`` to get a list of commands!");
    }

    const response = client.responses.get(message.content.toLowerCase());

    if(response) {
        response.execute(message);

        return;
    }

    client.validateMessage(message);
}