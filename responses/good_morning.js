module.exports = {
    trigger: "Good morning Dexil",
    replies: [
        "Don't talk to me until I have my coffee",
        "Good morning @",
        "no",
    ],
    execute(message) {
        const reply = this.replies[Math.floor(Math.random * this.replies.length)];

        reply.replace("@", `${message.author.username}`)
    }
}