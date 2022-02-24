require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const prefix = '-';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Dexil is online!');
});

client.on('messageCreate', message => {
    if(message.author.username == "AugustTheBot1")
        message.reply("👁️ 👄 👁️");

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ + /);

    const commandKey = args.shift().toLocaleLowerCase();

    const command = client.commands.get(commandKey);
    if(command != null)
        command.execute(message, args);
});


//Must be last line
client.login(process.env.BOT_TOKEN);