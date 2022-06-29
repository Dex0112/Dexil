const { client } = require('./../../main')

module.exports = (Discord, client, message) => {
    const prefix = '-';

    if(message.author.bot) return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(/ +/);

        const commandKey = args.shift().toLowerCase();

        const command = client.commands.get(commandKey);

        if(command)
            command.execute(message, args);
    }

    const response = client.responses.get(message.content.toLowerCase());

    if(response) {
        response.execute(message);

        return;
    }

    client.validateMessage(message);

    if(message.channel.id != '945730937432444998')
        client.giveExp(message);
}