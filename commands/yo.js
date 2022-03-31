module.exports = {
    name: "yo",
    description: "Yo! (only accessable in bot-spam)",
    execute(message, args) {
        if(message.channel != 945730937432444998) {
            message.reply("Must be in bot-spam for this command!");
            return;
        }

        for(var i = 0; i <= 15; i++) {
            message.channel.send("YO");
        }

        message.channel.send("Bow down to your AI overlord!");
    }
}