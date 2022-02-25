module.exports = {
    name: "yo",
    description: "yo!",
    execute(message, args) {
        if(message.channel != 945730937432444998)
            return;
        else
            message.reply("Must be in bot-spam for this command!");

        for(var i = 0; i < 20; i++) {
            message.channel.send("YO");
        }

        message.channel.send("Bow down to your AI overlord!");
    }
}