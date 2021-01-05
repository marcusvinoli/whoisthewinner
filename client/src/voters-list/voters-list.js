const User = require('../user');

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
            if(voterOnList.username === voter.username) {
                result = true;
            }
        })
        return result;
    }
}

module.exports = VotersList;