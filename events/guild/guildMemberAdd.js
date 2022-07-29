module.exports = (Discord, client, member) => {
    const database = require("./../../database");
    
    database.updateDatabase({ id: member.user.id, exp: 3, love: 0 });

    member.roles.add('946977499647197245');
    member.roles.add('989003511968714812');

    member.guild.channels.cache.get('939667236786937898').send(`Welcome to TB (not tuberculosis) ${member}`);
    member.user.send("GET OUT WHILE YOU STILL CAN!!!");
    setTimeout(() => {
        member.user.send("But, if you are going to stay, in the server, you can do ``-role`` to see a list of the available roles and ``-help`` to get a list of all the commands with descriptions of what they do. Enjoy the server!");
    }, 10000);
}