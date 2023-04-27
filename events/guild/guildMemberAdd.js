module.exports = (Discord, client, member) => {
    member.roles.add('1101010432438841397');

    member.guild.channels.cache.get('1100606978755145761').send(`Welcome to TB (not tuberculosis) ${member}`);
    member.user.send("GET OUT WHILE YOU STILL CAN!!!");
    setTimeout(() => {
        member.user.send("But, if you are going to stay, in the server, you can do ``-role`` to see a list of the available roles and ``-help`` to get a list of all the commands with descriptions of what they do. Enjoy the server!");
    }, 10000);
}
