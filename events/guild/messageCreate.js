module.exports = (Discord, client, message) => {
    const prefix = client.commandPrefix;

    if(message.author.bot) return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(/ +/);

        const commandKey = args.shift().toLowerCase();

        const command = client.commands.get(commandKey);

        if(command)
            command.execute(message, args);
        else
            message.reply("This is not a command do ``-help`` to get a list of commands!");
        return;
    }

    client.validateMessage(message);

    if(message == null)
        return;

    const response = client.responses.get(message.content.toLowerCase());

    if(response) {
        response.execute(message);

        return;
    }
}