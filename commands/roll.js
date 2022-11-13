module.exports = {
    name: "roll",
    description: "Rolles an nth sided die. Ex: -role 20",
    execute(message, args) {
        if(args[0] == null || isNaN(args[0])) return message.reply("Please input the size of the die.");
        
        const dieSize = Number.parseInt(args[0]);

        const roll = Math.randomIntInRange(1, dieSize + 1);

        message.reply(`${message.member} rolled at ${roll}!`);
    }
}