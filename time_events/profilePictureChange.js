const { client } = require('../main');

module.exports = {
    tryExecute(time) {
        console.log(time.minute);

        if(time.minute != null) {
            this.execute();
        }
    },
    execute() {
        const pfp = client.profilePictures.shift();
        client.user.setAvatar(`./profile_pictures/${pfp}`);
        client.profilePictures.push(pfp);
    }
}