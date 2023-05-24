const { Temporal } = require('@js-temporal/polyfill');

module.exports = (_Discord, client) => {
    client.startTime = Temporal.Now.instant();
    
    console.log('Dexil is online! ^');

    client.guilds.cache.forEach(guild => {
        guild.members.fetch();
    });
}
