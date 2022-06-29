
module.exports = (Discord, client) => {
    const database = require("./../../database");
    const guild = client.guilds.cache.get("939667236786937896");
    guild.members.fetch().then(members => {
        members.forEach(member => {
            if (!member.roles.cache.has('945164718186852412'))
                database.updateDatabase({ id: member.user.id });
        })

        console.log("Added everyone to database");
    });

    console.log('Dexil is online! ^');
}