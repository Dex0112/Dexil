const { client } = require('../main'); 

module.exports = {
    name: "timeout",
    description: "Addes a flag to a user and if a user has enough flages they will be timedout. (For mods it will timeout user)",
    execute(message, args) {
        const timeoutLength = 30;
        const flagLength = 30;
        const maxFlags = 3;
        const member = message.mentions.members.first();

        if(member == null)
            return message.reply("Please enter a valid member!");
        
        if(message.member.roles.cache.has('939667378948681730')) {
            return member.timeout((Number.parseInt(args[1]) || timeoutLength) * 60 * 1000).catch(err => {
                message.reply(`${member} could not be timed out!`);
            }).then(() => {
                message.reply(`${member} has been timed out`);
            });
        }

        if(member.isCommunicationDisabled()) {
            return message.reply("This user is already timed out!");
        }

        client.validateOffender(member);

        if(!client.offenders[member.id].flags.includes(message.member.id))
            client.offenders[member.id].flags.push(message.member.id) && message.reply("You have flagged this user!");
        else
            return message.reply("You have already flagged this member. To flag this member again, try again later!");

        if(client.offenders[member.id].flags.length >= maxFlags) {
            client.offenders[member.id].flags = [];
            return member.timeout(timeoutLength * 60 * 1000);
        }

        setTimeout(() => {
            if(client.offenders[member.id].flags.count == 0)
                return;

            client.offenders[member.id].flags.shift();
        }, flagLength * 60 * 1000);
    }
}