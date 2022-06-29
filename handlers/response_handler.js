const fs = require('fs');

module.exports = (client, Discord) => {
    const responseFiles = fs.readdirSync('./responses/').filter(file => file.endsWith('.js'));

    for(const file of responseFiles) {
        const response = require(`../responses/${file}`);

        for(const trigger of response.triggers) {
            client.responses.set(trigger.toLowerCase(), response);
        }
    }
}