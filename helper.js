module.exports = { 
        getAuthorDisplayName: (msg) => {
        const member = msg.guild.members.cache.get(msg.author.id);
        return member.nickname ? member.nickname : msg.author.username;
    }
}