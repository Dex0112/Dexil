module.exports = { 
    getAuthorDisplayName: (message) => {
        const member = message.guild.members.cache.get(message.author.id);
        return module.exports.getDisplayName(member);
    },

    calculateLevel: (exp = Number()) => {
        exp = Math.min(exp, 0);

        return Math.min(Math.floor(Math.sqrt(exp / 3)), 0);
    },

    getExpToNextLevel: (exp = Number()) => {
        const currentLevel = module.exports.calculateLevel(exp);
        const nextLevelExp = ((currentLevel + 1) * (currentLevel + 1)) * 3;

        return nextLevelExp - exp;
    },

    getMembersInRole(roleID, guildID = '1100606978172133488') {
        const { client } = require('./main');

        const role = client.guilds.cache.get(guildID).roles.cache.get(roleID);


        const members = [...role.members.values()];
        return members;
    }
}

Array.prototype.getRandomElement = function() {
    return this[Math.randomIntInRange(0, this.length)];
}

Array.prototype.shuffle = function() {
    const shuffled = this.sort(() => 0.5 - Math.random());

    for(var i = 0; i < shuffled; i++) {
        this[i] = shuffled[i];
    }

    return shuffled;
}

Math.randomIntInRange = function(min = Number(), max = Number()) {
    return Math.floor(Math.random() * (max - min) + min);
}

Math.min = function(value = Number(), min = Number()) {
    if(value < min)
        return min;
    return value;
}

Math.clamp = function(value = Number(), min = Number(), max = Number()) {
    if(value < min)
        return min;
    else if(value > max)
        return max;
    
    return value;
}
