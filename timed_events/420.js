const { client } = require('../main.js');

module.exports = {
    name: "420",
    runtime: {
        hour: 4,
        minute: 20
    },
    async execute() {
        return;
        const guild = await client.guilds.fetch('939667236786937896');
        guild.channels.cache.get('939667236786937898').send("Nice");
    }
}