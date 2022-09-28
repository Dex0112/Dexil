require('dotenv').config();
require('./helper');

const { Temporal } = require('@js-temporal/polyfill');

const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", 'GUILD_VOICE_STATES'] });

module.exports.client = client;

const fs = require('fs');
const helper = require('./helper');

client.commands = new Discord.Collection();
client.responses = new Discord.Collection();
client.timeEvents = [];
client.profilePictures = fs.readdirSync('./profile_pictures/').shuffle();

client.offenders = {};

client.commandPrefix = '-';

module.exports.Permissions = class Permissions {
    static MANAGE_MESSAGES = new Permissions(
        "MANAGE_MESSAGES",
        ['946150969379532870']    
    );
    static MANAGE_USERS = new Permissions(
        "MANAGE_USERS",
        ['946150969379532870']    
    );

    constructor(name, roles) {
        this.name = name;
        this.roles = roles;
    }

    static hasPermission(member, permission) {
        for(const role of permission.roles) {
            if(member.roles.cache.has(role))
                return true;
        }
    
        return false;
    }
}

client.validateMessage = async (message) => {
    const minMessageLength = 0;

    const spamCheckRange = 5;
    const maxSpamCount = 2;
    
    const unregulatedChannels = ['945730937432444998'];

    if(message.content.toLowerCase().includes("landon") || message.content.toLowerCase().includes("landen")) {
        message.author.send("You dare speak my masters name!");
        try {
            message.member.timeout(30 * 60 * 1000);
            message.delete();
        } catch(err) {
            console.log(err);
        }
    }

    if(message.content.startsWith(client.commandPrefix))
        return;

    if(unregulatedChannels.includes(message.channel.id))
        return;

    if (message.attachments.size != 0)
        return;

    if (message.content.trim().length < minMessageLength && /^\d+$/.test(message.content) == false) {
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

    client.validateOffender(member);

    client.offenders[member.id].offenses += 1;

    if (client.offenders[member.id].offenses >= maxOffenses) {
        member.timeout(timeoutLength * 60 * 1000).then(() => {
            helper.getMembersInRole('939667378948681730').then(members => {
                for(const mbr of members) {
                    console.log(mbr != null);

                    mbr.user.send(`${member} was timed out!`);
                }
            });

            member.user.send(`You have been timed out for ${timeoutLength} minutes for spam!`)
        }).catch(err => {
            console.log(`Could not timeout ${member}!`);
        });
    } else
        return member.user.send("You message has been deleted for suspected spam!");

    setTimeout(() => {
        client.offenders[member.id].offenses = client.offenders[member.id].offenses - 1;
    }, offenseLength * 60 * 1000);
}

client.validateOffender = member => {
    if(client.offenders[member.id] != null)
        return;

    client.offenders[member.id] = { offenses: 0, flags: [] };
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