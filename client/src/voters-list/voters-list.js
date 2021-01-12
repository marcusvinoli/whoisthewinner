const User = require('../user');
var stringSimilarity = require('string-similarity'); 

class VotersList {
    constructor() {
        this.voters = [];
    }

    addFromTestOption(testOption) {
        testOption.voterList.forEach(voter => {
            if(!this.existsOnVotersList(voter)) {
                this.createNewVoter(voter);
            }
        })
    }

    createNewVoter(voter) {
        var newVoter = new User(voter.username, voter.name);
        this.voters.push(newVoter);
    }

    existsOnVotersList(voter) {
        var result = false;
        this.voters.forEach(voterOnList => {
            if((stringSimilarity.compareTwoStrings(voterOnList.username, voter.username) > 0.80) || 
                    ((stringSimilarity.compareTwoStrings(voterOnList.name, voter.name) > 0.80) && (voter.name !== ''))) {
            //if((voterOnList.username === voter.username) || (voterOnList.name === voter.name)) {
                result = true;
            }
        })
        return result;
    }
}

module.exports = VotersList;