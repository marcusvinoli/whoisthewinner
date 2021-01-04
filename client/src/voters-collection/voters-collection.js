function buildVoterCollection(userClass) {
    return class UsersVoters {
        UserClass = userClass;

        constructor(){
            if(!this.isInitilized) {
                this.votersCollection = [];
                this.optionsCollection = [];
                this.isInitilized = true;
            }
        };

        isInitilized;
        optionsCollection;
        votersCollection;

        add(optionObject) {
            //Check if Option Object already exists on OptionsCollections
            if(this.existsOnOptionsCollection(optionObject)) {
                return;
            } else {
                this.optionsCollection.push(optionObject);
            }

            //Create and insert new users on
            optionObject.voterList.forEach(voter => {
                if(!this.existsOnUserCollection(voter.username)) {
                    this.createNewVoter(voter);
                }
            })

            //Compute votes
            optionObject.voterList.forEach(voter => {
                for(var i = 0; i < this.votersCollection.length; i++) {
                    if(this.votersCollection[i].username === voter.username) {
                        this.computeAnswer(this.votersCollection[i], optionObject);
                        break;
                    }
                }
            })
            /*
            this.votersCollection.forEach(user => {
                optionObject.voterList.forEach(voter => {   
                    if(voter.username === user.username) {
                        this.computeAnswer(user, optionObject);
                    }
                })
            }) */
        };

        existsOnOptionsCollection(option) {
            var result = false;
            this.optionsCollection.forEach(collectedOption => {
                if (collectedOption === option) {
                    result = true;
                }
            })
            return result;
        }

        existsOnUserCollection(username) {
            var result = false;
            this.votersCollection.forEach(insertion => {
                if (insertion.username === username) {
                    result = true;
                }
            })
            return result;
        }

        createNewVoter(voter) {
            var newVoter = new this.UserClass(voter.username, voter.name);
            this.votersCollection.push(newVoter);
            return this.votersCollection.indexOf(newVoter);
        }

        getUserIndex(voter) {
            this.votersCollection.forEach(user => {
                if (user.username === voter.username){
                    return this.votersCollection.indexOf(user);
                }
            });
        }

        computeAnswer(user, option) {
            user.numberOfAnswers++;
            if(option.isCorrect) {
                user.correctAnswers.push(option.optionText);
                user.numberOfCorrectAnswers++;
            } else {
                user.wrongAnswers.push(option.optionText);
                user.numberOfWrongAnswers++;
            }
        }

        getUsersVotersList() {
            return this.usersVotersList;
        }
    }
}

module.exports = buildVoterCollection;