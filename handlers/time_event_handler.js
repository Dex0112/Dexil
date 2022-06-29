const fs = require('fs');

module.exports = (client, Discord) => {
    const time_event_files = fs.readdirSync(`./time_events/`).filter(file => file.endsWith('.js'));

    for(const file of time_event_files) {
        client.timeEvents.push(require(`../time_events/${file}`));
    }
}