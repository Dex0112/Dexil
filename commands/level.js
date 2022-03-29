const helper = require('../helper.js');
const database = require('../database.js');

module.exports = {
    name: 'level',
    description: 'Displays current server level.',
    async execute(message, args) {
        const data = await database.getData(message.author.id.toString());

        const level = helper.calculateLevel(data.exp);

        message.reply(`${helper.getAuthorDisplayName(message)} is level ${level} (${data.exp})!`);
    }
}