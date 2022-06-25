require('dotenv').config();

const { Temporal } = require('@js-temporal/polyfill');

const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });

module.exports.client = client;

const fs = require('fs');
const helper = require('./helper.js');
const database = require('./database');
const { off } = require('process');

client.commands = new Discord.Collection();
client.responses = new Discord.Collection();
client.profilePictures = fs.readdirSync('./profile_pictures/').shuffle();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const responseFiles = fs.readdirSync('./responses/').filter(file => file.endsWith('.js'));

const prefix = '-';

var offenders = {};

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
            if (!member.roles.cache.has('945164718186852412'))
                database.updateDatabase({ id: member.user.id });
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

        return;
    }

    const response = client.responses.get(message.content.toLowerCase());

    if (response != null) {
        response.execute(message);
        return;
    }

    validateMessage(message);

    //  if (message.channel != 945730937432444998)
    //     giveExp(message);
});

client.once('guildMemberAdd', member => {
    database.updateDatabase({ id: member.user.id, exp: 3, love: 0 });

    member.guild.channels.cache.get('939667236786937898').send(`Welcome to TB (not tuberculosis) ${member}`);
    member.user.send("GET OUT WHILE YOU STILL CAN!!!");
    setTimeout(() => {
        member.user.send("But, if you are going to stay, in the server, you can do -role to see a list of the available roles and -help to get a list of all the commands with descriptions of what they do. Enjoy the server!");
    }, 10000);
});

async function giveExp(message) {
    const MIN_GAINED_EXP = 0;
    const MAX_GAINED_EXP = 10;

    const MAX_EXP_PER_MESSAGE = 17;

    const MESSAGE_LENGTH_WEIGHT = .2;

    var gainedExp = Math.randomIntInRange(MIN_GAINED_EXP, MAX_GAINED_EXP);

    gainedExp += Math.floor(message.content.split(' ').length * MESSAGE_LENGTH_WEIGHT);

    gainedExp = Math.clamp(gainedExp, 0, MAX_EXP_PER_MESSAGE);

    const memberData = await database.getData(message.author.id);

    if(memberData == null)
        return;

    const expToNextLevel = helper.getExpToNextLevel(memberData.exp);

    if (expToNextLevel <= gainedExp) {
        message.reply(`\`\`${helper.getAuthorDisplayName(message)} has leveled up!\`\``);
    }

    database.mutateData({ id: message.author.id, exp: gainedExp, love: 0 });
}

async function validateMessage(message) {
    const minMessageLength = 2;

    const spamCheckRange = 5;
    const maxSpamCount = 2;

    const unregulatedChannels = ['945730937432444998'];

    if(unregulatedChannels.includes(message.channel.id))
        return;

    if(message.attachments.size != 0)
        return;

    if(message.content.length < minMessageLength && /^\d+$/.test(message.content) == false) {
        disciplineMember(message.member);
        return message.delete();
    }
    
    
    const messageCollection = await message.channel.messages.fetch({ limit: spamCheckRange });
    const messages = Array.from(messageCollection.values());

    for(var i = 1, spamCounter = 0; i < messages.length; i++) {
        if(messages[i].content.toLowerCase() == messages[0].content.toLowerCase())
            spamCounter++;
        
        if(spamCounter >= maxSpamCount) {
            disciplineMember(message.member);
            return message.delete();
        }
    }
}

function disciplineMember(member) {
    const maxOffenses = 3;
    const offenseLength = 3;
    const timeoutLength = 15;

    offenders[member.id] = offenders[member.id] + 1 || 1;

    if(offenders[member.id] >= maxOffenses) {
        member.timeout(timeoutLength * 60 * 1000).catch(err => {
            console.log(`Could not timeout ${member}!`);
        });

        console.log("here");

        client.guilds.cache.get('939667236786937896').roles.fetch('939667378948681730').then(role => {
            role.members.forEach(roleMember => {
                roleMember.send(`${roleMember} was timed out!`);
            })
        });
    }

    setInterval(() => {
        offenders[member.id] = offenders[member.id] - 1;
    }, offenseLength * 60 * 1000);
}

setInterval(async () => {
    const timeZone = 'America/New_York';
    const now = Temporal.Now.zonedDateTimeISO(timeZone);

    const realityCheckFrequency = 30;

    if(now.second == 0 && now.hour == 15 && now.minute == 4) {
        const compliments = ['Lookin good my dude!', 'Hey sexy!', 'You are great at video games!', 'You are very, very cool!'];

        const complimenteeRole = await client.guilds.cache.get('939667236786937896').roles.fetch('989003511968714812');

        const complimentees = Array.from(complimenteeRole.members.values());
    
        for(var i = 0; i < complimentees.length; i++) {
            complimentees[i].user.send(compliments.getRandomElement() + "\n(if you wish to stop receiving daily compliments from me, visit The Bois and do ``-role Complimentee``)");
        }
    }

    if (now.second == 0 && now.minute == 0) {
        try {
            const pfp = client.profilePictures.shift();
            client.profilePictures.push(pfp);

            client.user.setAvatar(`./profile_pictures/${pfp}`);
        } catch (error) {
            console.log("Problem occured while changing pfp!");
        }
    }

    if(now.second == 0 && now.minute % realityCheckFrequency == 0) {
        if(now.hour >= 6 && now.hour <= 24) {
            client.guilds.cache.get('939667236786937896').members.fetch().then(members => {
                members.forEach(member => {
                    if (member.roles.cache.some(role => role.name == 'Lucid Dreamer')) {
                        member.user.send("Reality check time!!!");
                        console.log("Sent");
                    }
                });
            });
        }
    }
}, 1000 * 1);

//MUST BE LAST LINE
client.login(process.env.BOT_TOKEN);