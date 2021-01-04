class User {
    constructor(username, name){
        this.username = username;
        this.name = name;
        this.isWinner = false;
        this.wrongAnswers = [];
        this.correctAnswers = [];
        this.numberOfAnswers = 0;
        this.numberOfCorrectAnswers = 0;
        this.numberOfWrongAnswers = 0;
    };

    username;
    name;
    isWinner;
    correctAnswers;
    wrongAnswers;
    numberOfCorrectAnswers;
    numberOfWrongAnswers;
    numberOfAnswers;
}

module.exports = User;