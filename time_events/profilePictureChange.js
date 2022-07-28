const { client } = require('../main');

module.exports = {
    tryExecute(time) {
        if(time.minute == 0) {
            this.execute();
        }
    },
    execute() {
        const pfp = client.profilePictures.shift();
        client.user.setAvatar(`./profile_pictures/${pfp}`);
        client.profilePictures.push(pfp);
    }
}