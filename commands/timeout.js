const { client, Permissions } = require('../main'); 

module.exports = {
    name: "timeout",
    description: "Addes a flag to a user and if a user has enough flages they will be timedout. (For mods it will timeout user)",
    execute(message, args) {
        const timeoutLength = 30;
        const flagLength = 30;
        const maxFlags = 3;
        const member = message.mentions.members.first();

        const reason = message.content.indexOf('"') >= 0 ? message.content.slice(
            message.content.indexOf('"') + 1,
            message.content.lastIndexOf('"')
        ) : null;

        if(member == null)
            return message.reply("Please enter a valid member!");
        
        if(Permissions.hasPermission(message.member, Permissions.MANAGE_USERS))
            return client.timeoutMember(member, Number.parseInt(args[1]) || timeoutLength, reason, () => message.reply("User has successfully been timed out!"));

        if(member.isCommunicationDisabled())
            return message.reply("This user is already timed out!");

        client.validateOffender(member);

        if(!client.offenders[member.id].flags.includes(message.member.id))
            client.offenders[member.id].flags.push(message.member.id) && message.reply("You have flagged this user!");
        else
            return message.reply("You have already flagged this member. To flag this member again, try again later!");

        if(client.offenders[member.id].flags.length >= maxFlags) {
            client.offenders[member.id].flags = [];
            message.reply("This user has been timed out for " + timeoutLength + " minutes!");
            return client.timeoutMember(member, timeoutLength, "Community Timeout");
        }

        setTimeout(() => {
            if(client.offenders[member.id].flags.count == 0)
                return;

            client.offenders[member.id].flags.shift();
        }, flagLength * 60 * 1000);
    }
}