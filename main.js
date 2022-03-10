require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

module.exports.client = client;

const prefix = '-';

const fs = require('fs');

const helper = require('./helper.js');

client.commands = new Discord.Collection();
client.responses = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

const responseFiles = fs.readdirSync('./responses/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

for (const file of responseFiles) {
    const response = require(`./responses/${file}`);

    for(const trigger of response.triggers) {
        client.responses.set(trigger.toLowerCase(), response);
    }
}

client.once('ready', () => {
    console.log('Dexil is online!');
});

client.on('messageCreate', message => {
    if(message.author.bot) return;

    const response = client.responses.get(message.content.toLowerCase());

    if (response != null) {
        response.execute(message);
        return;
    }

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    const commandKey = args.shift().toLocaleLowerCase();

    const command = client.commands.get(commandKey);

    if (command != null)
        command.execute(message, args);
});

//Must be last line
client.login(process.env.BOT_TOKEN);