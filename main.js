require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });

module.exports.client = client;

const prefix = '-';

const fs = require('fs');
const helper = require('./helper.js');
const database = require('./database');

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

    for (const trigger of response.triggers) {
        client.responses.set(trigger.toLowerCase(), response);
    }
}

client.once('ready', async () => {
    const guild = client.guilds.cache.get("939667236786937896");
    guild.members.fetch().then(members => {
        members.forEach(member => {
            if(!member.roles.cache.has('945164718186852412'))
                database.updateDatabase({id: member.user.id});
        })

        console.log("Added everyone to database");
    });

    console.log('Dexil is online!');
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix)) {

        const args = message.content.slice(prefix.length).split(/ +/);

        const commandKey = args.shift().toLocaleLowerCase();

        const command = client.commands.get(commandKey);

        if (command != null)
            command.execute(message, args);
    }

    const response = client.responses.get(message.content.toLowerCase());

    if (response != null) {
        response.execute(message);
        return;
    }

    if(message.channel != 945730937432444998) {
        const MIN_GAINED_EXP = 0;
        const MAX_GAINED_EXP = 10;

        const MESSAGE_LENGTH_WEIGHT = .1;

        var gainedExp = Math.randomIntInRange(MIN_GAINED_EXP, MAX_GAINED_EXP);

        gainedExp += Math.floor(message.content.split(' ').length * MESSAGE_LENGTH_WEIGHT);

        const memberData = await database.getData(message.author.id);

        const expToNextLevel = helper.getExpToNextLevel(memberData.exp);

        if(expToNextLevel <= gainedExp) {
            message.reply(`\`\`${helper.getAuthorDisplayName(message)} has leveled up!\`\``);
        }

        database.mutateData({id: message.author.id, exp: gainedExp, love: 0});
    }
});

client.once('guildMemberAdd', member => {
    database.updateDatabase({id: member.user.id});

    member.guild.channels.cache.get('939667236786937898').send(`Welcome to TB (not tuberculosis) ${member}`);
    member.user.send("GET OUT WHILE YOU STILL CAN!!!");
});

//MUST BE LAST LINE
client.login(process.env.BOT_TOKEN);