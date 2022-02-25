module.exports = {
    name: 'ping',
    description: 'Replies pong!',
    execute(message, args) {
        message.channel.send("pong!");
    }
}