module.exports = { 
    getAuthorDisplayName: (message) => {
        const member = message.guild.members.cache.get(message.author.id);
        return member.nickname ? member.nickname : message.author.username;
    }
}