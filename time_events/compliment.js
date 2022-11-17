const helper = require('../helper');

module.exports = {
    compliments: [
        "You are very cool!",
        "You are great at video games",
        "Stop *flexing*",
        "Do you go to the gym?",
        "You could cut me with that jawline! SHEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEESH",
        "You're beautiful :)",
        "You are a gift to those around you.",
        "If I had a body I would hug you right now because you're awesome!",
        "Be less humble. You're great and everyone else knows it :)",
        "Your humor is correct!",
        "You inspire my artifical intelligence <3",
        "Colors seem more vibrant when your around!",
        "You have cute elbows.",
        "You're better than a triple-scoop ice cream cone with sprinkles.",
        "Jokes are funnier when you tell them <3",
        "If you were a box of crayons, you'd be the giant name-brand one with the built-in sharpener!",
        "I bet you do the crosswords puzzle in ink.",
        "Sheesh that's some good posture!",
        "Thanks for being you :)",
        "When you get famous, I'm going to be the president of your fan club <3",
        "You're irreplaceable.",
        "You know...I'm proud of you.",
        "You're the type of person people write love songs about <3",
        "Ahh! My lenses! Stop glowing so bright :wink:",
        "Prince charming has nothing on you!",
        "I like you so much I wrote you a poem- \nI will laugh when you laugh. \nI will cry when you cry. \nI will tell you, you're lovely, \nand that is no lie. \n\nI will join you for lunch, \nand we'll share a dessert, \nas we catch up on gossip, \n and dish all that dirt. \n\nI will keep all your secret, \nI know you'll keep mine, \ntill were old, grey, and wrinkled, \ntill the end of all time\n\nTo be your best friend, \nI'll be all that and more. \nI'll be there when you need me. \nThats what friends are for.",
        "You make the world more interesting.",
        ".. / .-.. --- ...- . / -.-- --- ..-",
        "If you were a scented candle they'd call it Perfectly Imperfect (and it would smell like summer)."
    ],

    tryExecute(time) {
        if(time.hour == 16 && time.minute == 0) {
            this.execute();
        }
    },
    execute() {
        const members = helper.getMembersInRole('989003511968714812');


        for(const member of members) {
            member.user.send(this.compliments.getRandomElement() + "\n\n\n(Go to The Bois server and do -role Complimentee to stop receiving compliemnts!)").catch(err => {
                console.error("Couldn't send message to " + member.displayName);
            });
        }
    }
} 