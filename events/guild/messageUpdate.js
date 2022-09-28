module.exports = (Discord, client, message) => {
    if(message.author.bot) return;
    
    client.validateMessage(message);
}