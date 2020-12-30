User = {
    constructor(username, name){
        this.username = username;
        this.name = name;
    },
    username,
    name,
    isWinner : false,
    correctAnswers : [],
    wrongAnswers : [],
    numberOfCorrectAnswers : correctAnswers.lenght,
    numberOfWrongAwnsers : correctAnswers.lenght,
}

module.exports = User;