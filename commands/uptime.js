const { Temporal } = require('@js-temporal/polyfill');
const { client } = require('./../main.js');

module.exports = {
    name: "uptime",
    description: "See how long I have been online!",

    execute(message, _args) {
        const now = Temporal.Now.instant();
        const startTime = client.startTime;

        const duration = now.since(startTime);
        const totalSeconds = duration.total({ unit: 'seconds' });

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        message.reply("Uptime: " + formattedTime);
    }
}
