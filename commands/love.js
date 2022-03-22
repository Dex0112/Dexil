const helper = require('../helper.js');
const database = require('../database.js');

module.exports = {
    name: 'love',
    description: 'Displays current server love.',
    async execute(message, args) {
        const data = await database.getData(`${message.author.id}`);

        message.reply(`${helper.getAuthorDisplayName(message)} has ${data.love} love from Dexil!`);
    }
}