const helper = require('../helper.js');
const database = require('../database.js');

module.exports = {
    name: 'leaderboard',
    description: 'Displays leaderboard for server (exp/love).',
    async execute(message, args) {
        const leaderboards = [
            'exp',
            'love'
        ]

        const leaderboardKey = args[0];

        if(!leaderboards.includes(leaderboardKey))
            return message.reply("Please input a valid leaderboard to view!");

        const orderedMemberDatas = await database.getValuesOrdered(leaderboardKey, 'DESC');

        const leaderboardLength = 3;

        var reply = "```\n";

        for(var i = 0; i < orderedMemberDatas.length && i < leaderboardLength; i++) {
            try {
                const memberData = orderedMemberDatas[i];

                const member = await message.guild.members.cache.get(memberData.id);
                
                reply += `${i + 1}. `;
                
                if(i == 0)
                    reply += '❤️';

                reply += `${helper.getDisplayName(member)}`;

                if(i == 0)
                    reply += '❤️';

                reply += `: ${memberData[leaderboardKey]}`;

                reply += '\n';
            } catch(error) {
                console.log("COULDN'T FIND USER!");
            }
        }

        reply += "```";

        message.reply(reply);
    }
}