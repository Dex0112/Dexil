module.exports = (Discord, client) => {
    console.log('Dexil is online! ^');
    client.guilds.cache.forEach(guild => {
        guild.members.fetch();
    });
}