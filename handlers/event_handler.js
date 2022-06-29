const fs = require('fs');

module.exports = (client, Discord) => {
    const load_dir = (dir) => {
        const event_files = fs.readdirSync(`./events/${dir}`).filter(file => file.endsWith('.js'));

        for(const file of event_files) {
            const event = require(`../events/${dir}/${file}`);
            const eventName = file.split('.')[0];

            client.on(eventName, event.bind(null, Discord, client));
        }
    }

    ['client', 'guild'].forEach(eventType => load_dir(eventType));
}