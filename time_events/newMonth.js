const client = require("../main.js");

module.exports = {
    tryExecute(now) {
        if(now.day == 1 && now.minute == 0 && now.hour == 0) {
            this.execute();
        }
    },
    execute() {
        client.guilds.cache.get("939667236786937896").channels.cache.get('939667236786937898').send("Happy first of the month!");
    }
}