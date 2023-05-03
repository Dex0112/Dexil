module.exports = {
    name: "yo",
    description: "Yo! (only accessable in bot-spam)",
    execute(message, args) {
        if(message.channel != "1100612668378841159") {
            message.reply(`You must be in a spam channel to do this command!`);
            return;
        }

        for(var i = 0; i <= 15; i++) {
            message.channel.send("YO");
        }

        message.channel.send("Bow down to your AI overlord!");
    }
}
