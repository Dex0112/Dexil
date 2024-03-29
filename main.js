require('dotenv').config();
require('./helper');

const { Temporal } = require('@js-temporal/polyfill');

const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", 'GUILD_VOICE_STATES'] });

module.exports.client = client;

const fs = require('fs');

client.commands = new Discord.Collection();
client.responses = new Discord.Collection();
client.timeEvents = [];
client.profilePictures = fs.readdirSync('./profile_pictures/').shuffle();

client.offenders = {};

client.commandPrefix = '-';

module.exports.Permissions = class Permissions {
    static MANAGE_MESSAGES = new Permissions(
        "MANAGE_MESSAGES",
        ['1100607380485582878']    
    );

    static MANAGE_USERS = new Permissions(
        "MANAGE_USERS",
        ['1100607380485582878']    
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
};

client.devMode = process.env.DEV_MODE;

client.validateMessage = async (message) => {
    const minMessageLength = 0;

    const spamCheckRange = 10;
    const maxSpamCount = 2;
    
    const unregulatedChannels = ['1100612668378841159'];

    const bannedKeywords = [
        "kys",
        "kill yourself",
        "fuck you"
    ];

    for(const keyword of bannedKeywords) {
        if(message.content.toLowerCase().includes(keyword)) client.deleteMessage(message, "Saying " + keyword, 3 * 60);
    }

    //Zero width character
    if(message.content.includes("​"))
        return client.deleteMessage(message, "Zero width character used");

    if(message.content.startsWith(client.commandPrefix))
        return;

    if(unregulatedChannels.includes(message.channel.id))
        return;

    if (message.attachments.size != 0)
        return;

    if (message.content.trim().length < minMessageLength && /^\d+$/.test(message.content) == false) {
        client.disciplineMember(message.member);
        return client.deleteMessage(message, "Minimum length of message not met");
    }


    const messageCollection = await message.channel.messages.fetch({ limit: spamCheckRange });
    const messages = Array.from(messageCollection.values());

    for (var i = 1, spamCounter = 0; i < messages.length; i++) {
        if (messages[i].content.toLowerCase() == messages[0].content.toLowerCase())
            spamCounter++;

        if (spamCounter >= maxSpamCount) {
            client.disciplineMember(message.member);
            return client.deleteMessage(message, "Spam");
        }
    }
};

client.disciplineMember = (member) => {
    const maxOffenses = 3;
    const offenseLength = 3;
    const timeoutLength = 15;

    client.validateOffender(member);

    client.offenders[member.id].offenses += 1;

    if (client.offenders[member.id].offenses >= maxOffenses) client.timeoutMember(member, timeoutLength, "Spam");

    setTimeout(() => {
        client.offenders[member.id].offenses = client.offenders[member.id].offenses - 1;
    }, offenseLength * 60 * 1000);
};

client.validateOffender = member => {
    if(client.offenders[member.id] != null)
        return;

    client.offenders[member.id] = { offenses: 0, flags: [] };
};

client.deleteMessage = (message, reason = null, timeoutLength = 0) => {
    client.updateLog(`Message, by ${message.member}, was deleted!\nContents: '${message.content}'\nLocation: ${message.channel}${reason ? `\nReason: ${reason}` : ""}`);
    
    reason ? message.member.send("Your message has been deleted for '" + reason + "'!") : message.user.send("You message has been deleted!");

    if(timeoutLength > 0) client.timeoutMember(message.member, timeoutLength, null);

    message.delete();
};

client.timeoutMember = (member, timeoutLength, reason, callback) => {
    if(timeoutLength == 0)
        return;
    
    member.timeout(timeoutLength * 1000 * 60).then(() => {
        var userMsg = `You have been timed out for ${timeoutLength} minutes.`

        if(reason) userMsg += " Reason: " + reason;
        
        member.send(userMsg);
        client.updateLog(`${member} has been timed out for ${timeoutLength} minutes${reason ? " for " + reason : ""}!`); 
        if(callback) callback();
    }).catch(err => {
        client.updateLog(`Failed to timeout ${member}${reason ? " for " + reason : ""}`);
    });
};

client.updateLog = (logMessage) => {
    const logChannelID = "1100992890936774697";
    const logChannel = client.guilds.cache.get("1100606978172133488").channels.cache.get(logChannelID);

    logChannel.send(logMessage);
};

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
