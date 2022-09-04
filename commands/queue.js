const { client } = require('../main');

const { QueryType } = require("discord-player");

const queue = [];

module.exports = {
    name: "queue", 
    description: "addes song to queue!",
    async execute(message, args) {
        const maxQueueSize = 5;

        if(!message.member.voice.channel)
            return message.reply("You must be in a voice chat to use this command");
        
        if(queue.length >= maxQueueSize)
            return message.reply("Max queue size has been reached!");

        const url = args[0];

        if(url == null)
            return message.reply("Please enter a valid url");
        
        const result = await client.player.search(url, {
            requestedBy: message.user,
            searchEngine: QueryType.YOUTUBE_VIDEO
        });
    }
}