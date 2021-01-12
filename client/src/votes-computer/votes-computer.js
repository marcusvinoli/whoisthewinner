const User = require("../user");
var stringSimilarity = require('string-similarity');

class VotesComputer {
    async ComputeVotes(VotersList, TestOption) {
        await TestOption.voterList.forEach(voterOnOptionList => {
            for(var i = 0; i <= VotersList.voters.length-1; i++){
                if((stringSimilarity.compareTwoStrings(VotersList.voters[i].username, voterOnOptionList.username) > 0.80) || 
                    ((stringSimilarity.compareTwoStrings(VotersList.voters[i].name, voterOnOptionList.name) > 0.80) && (voterOnOptionList.name !== ''))) {
                //if((VotersList.voters[i].username === voterOnOptionList.username) || (VotersList.voters[i].name === voterOnOptionList.name)) {
                    this.AssignVote(VotersList.voters[i], TestOption);
                    break;
                }
            }
        })
    }

    AssignVote(User, TestOption){
        User.numberOfAnswers++;
        if(TestOption.isCorrect){
            User.numberOfCorrectAnswers++;
            User.correctAnswers.push(TestOption.optionText);
        } else {
            User.numberOfWrongAnswers++;
            User.wrongAnswers.push(TestOption.optionText);
        }
    }
}

module.exports = VotesComputer;