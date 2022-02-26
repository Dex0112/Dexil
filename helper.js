module.exports = { 
    getAuthorDisplayName: (message) => {
        const member = message.guild.members.cache.get(message.author.id);
        return module.exports.getDisplayName(member);
    },

    getDisplayName: (member)  => {
        if(!member)
            return null;

        return member.nickname ? member.nickname : member.user.username;
    }
}