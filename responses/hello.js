module.exports = {
    trigger: "Hello Dexil",
    execute(message) {
        message.reply(`Hello ${message.author.username}`);
    }
}