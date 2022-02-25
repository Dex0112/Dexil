module.exports = {
    name: 'ping',
    description: 'replies pong!',
    execute(message, args) {
        message.channel.send("pong!");
    }
}