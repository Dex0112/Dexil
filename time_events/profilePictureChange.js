const { client } = require('../main');

module.exports = {
    tryExecute(time) {
        if(time.minute == 0) {
            this.execute();
        }
    },
    execute() {
        const pfp = client.profilePictures.shift();
        client.profilePictures.push(pfp);
    }
}