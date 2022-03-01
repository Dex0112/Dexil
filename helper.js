module.exports = { 
    getAuthorDisplayName: (message) => {
        const member = message.guild.members.cache.get(message.author.id);
        return module.exports.getDisplayName(member);
    },

    getDisplayName: (member) => {
        if(!member)
            return null;

        return member.nickname ? member.nickname : member.user.username;
    }
}

Array.prototype.getRandomElement = function() {
    return this[Math.floor(Math.random() * this.length)];
}

Math.randomIntInRange = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}