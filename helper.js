module.exports = { 
    getAuthorDisplayName: (message) => {
        const member = message.guild.members.cache.get(message.author.id);
        return this.getDisplayName(member);
    },

    getDisplayName: (member)  => {
        if(!member)
            return null;

        return member.nickname ? member.nickname : member.user.username;
    }
}