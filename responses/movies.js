module.exports = {
    triggers: [
      "Dexil, do you watch any shows?",
      "Dexil, what movies do you watch?",
      "What movies do you watch Dexil?",
      "What movies do you watch, Dexil?",
      "Watch any movies Dexil?",
      "Do you watch movies Dexil?",
      "Dexil, do you watch any movies?",
      "Do you watch any shows Dexil?",
      "Like any movies Dexil?",
      "Do you like any movies Dexil?",
      "Dexil, do you like any movies?",
      "Dexil do you like any movies?",
      "Dexil, like any movies?",
      "Dexil, watch any movies?",
    ],
    responses: [
      "I like many movies!  Star Wars being pretty high up there.",
      "Oh?  Movies are great!  Some can be quite long though.",
      "Why?  Do you recommend any?",
      "Not a movie, but I heard BlackKnight is pretty good",
      "Well @, is that an invitation to watch one?",
      "A Quiet Place is a really good movie.  I recommend watching that one!",
      "Not as mainstream, but I do like Train to Busan.",
      "Detective Pikachu!  I watched that a little bit after I got into Pokemon.",
      "Men In Black and Home Alone are both movies I have watched.  I were pretty good.  Very differing genres though...",
      "Lemme think some more~",
    ],
    execute(message) {
      const reply = this.responses[Math.floor(Math.random() * this.responses.length)]
              .replace("@", helper.getAuthorDisplayName(message));
  
      message.reply(reply);
    }
  }