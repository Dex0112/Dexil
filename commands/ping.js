module.exports = {
    name: 'ping',
    description: 'Replies pong!',
    execute(message, args) {
        if(Math.random() < 0.01) return message.channel.send("You a bitch!");
        message.channel.send("pong!");
    }
}
