require('dotenv').config();
require('./helper');

const { Temporal } = require('@js-temporal/polyfill');

const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", 'GUILD_VOICE_STATES'] });

module.exports.client = client;

const fs = require('fs');
const database = require('./database');
const helper = require('./helper');

client.commands = new Discord.Collection();
client.responses = new Discord.Collection();
client.timeEvents = [];
client.profilePictures = fs.readdirSync('./profile_pictures/').shuffle();

client.offenders = {};

client.commandPrefix = '-';

client.validateMessage = async (message) => {
    const minMessageLength = 0;

    const spamCheckRange = 5;
    const maxSpamCount = 2;

    const unregulatedChannels = [];//['945730937432444998', '939745999537176657'];

    if(message.content.startsWith(this.commandPrefix))
        return;

    if (unregulatedChannels.includes(message.channel.id))
        return;

    if (message.attachments.size != 0)
        return;

    if (message.content.length < minMessageLength && /^\d+$/.test(message.content) == false) {
        client.disciplineMember(message.member);
        return message.delete();
    }


    const messageCollection = await message.channel.messages.fetch({ limit: spamCheckRange });
    const messages = Array.from(messageCollection.values());

    for (var i = 1, spamCounter = 0; i < messages.length; i++) {
        if (messages[i].content.toLowerCase() == messages[0].content.toLowerCase())
            spamCounter++;

        if (spamCounter >= maxSpamCount) {
            client.disciplineMember(message.member);
            return message.delete();
        }
    }
}

client.disciplineMember = (member) => {
    const maxOffenses = 3;
    const offenseLength = 3;
    const timeoutLength = 15;

    client.offenders[member.id] = client.offenders[member.id] + 1 || 1;

    if (client.offenders[member.id] >= maxOffenses) {
        member.timeout(timeoutLength * 60 * 1000).then(() => {
            helper.getMembersInRole('939667378948681730').then(members => {
                for(const mbr of members) {
                    mbr.user.send(`${member} was timed out!`);
                }
            });
        }).catch(err => {
            console.log(`Could not timeout ${member}!`);
        });
    }

    setInterval(() => {
        client.offenders[member.id] = client.offenders[member.id] - 1;
    }, offenseLength * 60 * 1000);
}

client.giveExp = async (message) => {
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

['command_handler', 'response_handler', 'event_handler', 'time_event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

setInterval(() => {
    const timeZone = 'America/New_York';
    const now = Temporal.Now.zonedDateTimeISO(timeZone);
    for (const event of client.timeEvents) {
        event.tryExecute(now);
    }
}, 1000 * 60);

/*  MUST BE LAST LINE   */
client.login(process.env.BOT_TOKEN);