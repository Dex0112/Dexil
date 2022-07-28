module.exports = {
    name: 'ping',
    description: 'Replies pong!',
    execute(message, args) {
        message.channel.send("pong!");

        console.log(message.guild.roles.cache.get('939667236786937896').name);
    }
}